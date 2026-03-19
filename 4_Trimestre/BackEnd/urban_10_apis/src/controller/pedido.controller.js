const { Pedido, Usuario, Rol } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const JWT_SECRET = process.env.JWT_SECRET || "miclavesupersegura";

// R: READ - Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo'],
                include: [{
                    model: Rol,
                    attributes: ['nombre_rol']
                }]
            }],
            order: [['fecha_pedido', 'DESC']]
        });
        res.json(pedidos);
    } catch (err) {
        console.error("Error al obtener pedidos:", err);
        res.status(500).json({ msg: "Error al consultar pedidos.", error: err.message });
    }
};

// R: READ - Obtener pedido por ID
const obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id, {
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }]
        });
        if (!pedido) {
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }
        res.json(pedido);
    } catch (err) {
        console.error("Error al obtener pedido por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};

// R: READ - Obtener pedidos de un usuario específico
const obtenerPedidosPorUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }

        const pedidos = await Pedido.findAll({
            where: { id_usuario },
            include: [{
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo']
            }],
            order: [['fecha_pedido', 'DESC']]
        });
        
        res.json(pedidos);
    } catch (err) {
        console.error("Error al obtener pedidos por usuario:", err);
        res.status(500).json({ msg: "Error al consultar pedidos del usuario.", error: err.message });
    }
};

// C: CREATE - Crear nuevo pedido con verificación de stock y descuento automático
const crearPedido = async (req, res) => {
    const transaction = await db.transaction();
    
    try {
        const { productos, total, direccion, ciudad, telefono, metodo_pago } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        console.log('📦 [PEDIDO] Creando pedido con datos:', { 
            productos: productos?.length, 
            total, 
            direccion, 
            ciudad 
        });

        // ✅ 1. Validar que existe el token
        if (!token) {
            await transaction.rollback();
            return res.status(401).json({ 
                ok: false,
                msg: "No se proporcionó token de autenticación" 
            });
        }

        // ✅ 2. Decodificar el token para obtener id_usuario
        let id_usuario;
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            id_usuario = decoded.id;
            console.log('👤 [PEDIDO] Usuario autenticado:', id_usuario);
        } catch (err) {
            await transaction.rollback();
            return res.status(401).json({ 
                ok: false,
                msg: "Token inválido o expirado" 
            });
        }

        // ✅ 3. Validar que hay productos en el carrito
        if (!productos || productos.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ 
                ok: false,
                msg: "El carrito está vacío" 
            });
        }

        // ✅ 4. Validar el total
        if (!total || total <= 0) {
            await transaction.rollback();
            return res.status(400).json({ 
                ok: false,
                msg: "El total del pedido es inválido" 
            });
        }

        // ✅ 5. Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            await transaction.rollback();
            return res.status(400).json({ 
                ok: false,
                msg: "El usuario especificado no existe." 
            });
        }

        // ✅ 6. VERIFICAR STOCK DISPONIBLE ANTES DE CREAR EL PEDIDO
        console.log('🔍 [PEDIDO] Verificando stock...');
        for (const producto of productos) {
            const [result] = await db.query(
                `SELECT stock_disponible FROM productos WHERE id_producto = ? AND activo = 1`,
                { 
                    replacements: [producto.id_producto],
                    type: db.QueryTypes.SELECT,
                    transaction 
                }
            );

            if (!result) {
                await transaction.rollback();
                return res.status(404).json({
                    ok: false,
                    msg: `Producto "${producto.nombre}" no encontrado o no está disponible`
                });
            }

            const stockDisponible = result.stock_disponible;
            const cantidadSolicitada = producto.cantidad || 1;

            if (stockDisponible < cantidadSolicitada) {
                await transaction.rollback();
                return res.status(400).json({
                    ok: false,
                    msg: `Stock insuficiente para "${producto.nombre}". Disponible: ${stockDisponible}, Solicitado: ${cantidadSolicitada}`
                });
            }

            console.log(`✅ [PEDIDO] Stock OK - ${producto.nombre}: ${stockDisponible} unidades`);
        }

        // ✅ 7. Crear el pedido principal
        console.log('💾 [PEDIDO] Creando registro de pedido...');
        const [resultPedido] = await db.query(
            `INSERT INTO pedido (id_usuario, total, fecha_pedido, estado, metodo_pago) 
             VALUES (?, ?, NOW(), 'pendiente', ?)`,
            { 
                replacements: [id_usuario, total, metodo_pago || 'efectivo'],
                type: db.QueryTypes.INSERT,
                transaction 
            }
        );

        const id_pedido = resultPedido;
        console.log('✅ [PEDIDO] Pedido creado con ID:', id_pedido);

        // ✅ 8. Crear registros en detalle_pedido
        // El TRIGGER descontará automáticamente el stock
        console.log('📝 [PEDIDO] Creando detalles del pedido...');
        for (const producto of productos) {
            const cantidad = producto.cantidad || 1;
            const precio_unitario = producto.precio;
            const subtotal = precio_unitario * cantidad;

            await db.query(
                `INSERT INTO detalle_pedido 
                 (id_pedido, id_producto, nombre_producto, imagen, cantidad, precio_unitario, subtotal, id_personalizacion) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, NULL)`,
                { 
                    replacements: [
                        id_pedido,
                        producto.id_producto,
                        producto.nombre,
                        producto.imagen,
                        cantidad,
                        precio_unitario,
                        subtotal
                    ],
                    type: db.QueryTypes.INSERT,
                    transaction 
                }
            );

            console.log(`✅ [PEDIDO] Detalle agregado - ${producto.nombre} x${cantidad}`);
        }

        // ✅ 9. Crear registro de envío
        if (direccion && ciudad) {
            console.log('🚚 [PEDIDO] Creando registro de envío...');
            await db.query(
                `INSERT INTO envio (id_pedido, direccion, ciudad, telefono, estado_envio, fecha) 
                 VALUES (?, ?, ?, ?, 'pendiente', NOW())`,
                { 
                    replacements: [id_pedido, direccion, ciudad, telefono || ''],
                    type: db.QueryTypes.INSERT,
                    transaction 
                }
            );
        }

        // ✅ 10. Confirmar la transacción
        await transaction.commit();
        console.log('✅ [PEDIDO] Transacción completada exitosamente');

        // ✅ 11. Obtener el pedido completo creado
        const pedidoCompleto = await Pedido.findByPk(id_pedido, {
            include: [{
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo']
            }]
        });

        // ✅ 12. Responder con éxito
        res.status(201).json({
            ok: true,
            msg: "✅ Pedido creado exitosamente. El stock se ha actualizado automáticamente.",
            pedido: {
                id_pedido: pedidoCompleto.id_pedido,
                total: pedidoCompleto.total,
                fecha_pedido: pedidoCompleto.fecha_pedido,
                estado: pedidoCompleto.estado,
                metodo_pago: pedidoCompleto.metodo_pago,
                usuario: pedidoCompleto.Usuario,
                productos: productos
            }
        });

    } catch (err) {
        await transaction.rollback();
        console.error("❌ [PEDIDO] Error al crear pedido:", err);
        res.status(500).json({ 
            ok: false,
            msg: "Error interno del servidor al crear pedido",
            error: err.message 
        });
    }
};

// U: UPDATE - Actualizar pedido
const actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, total, fecha_pedido, estado, metodo_pago } = req.body;
        
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }

        if (id_usuario) {
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return res.status(400).json({ msg: "El usuario especificado no existe." });
            }
        }

        if (total !== undefined && (isNaN(total) || parseFloat(total) <= 0)) {
            return res.status(400).json({ msg: "El total debe ser un número positivo." });
        }

        const datosLimpios = {};
        if (id_usuario) datosLimpios.id_usuario = parseInt(id_usuario);
        if (total !== undefined) datosLimpios.total = parseFloat(total);
        if (fecha_pedido) datosLimpios.fecha_pedido = new Date(fecha_pedido);
        if (estado) datosLimpios.estado = estado;
        if (metodo_pago) datosLimpios.metodo_pago = metodo_pago;

        await pedido.update(datosLimpios);
        
        const pedidoActualizado = await Pedido.findByPk(id, {
            include: [{
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo']
            }]
        });
        
        res.json({ 
            msg: "Pedido actualizado exitosamente", 
            pedido: pedidoActualizado 
        });
    } catch (err) {
        console.error("Error al actualizar pedido:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar pedido.", 
            error: err.message 
        });
    }
};

// D: DELETE - Eliminar pedido (devuelve stock automáticamente con trigger)
const eliminarPedido = async (req, res) => {
    const transaction = await db.transaction();
    
    try {
        const { id } = req.params;

        // Primero eliminar los detalles (esto devolverá el stock automáticamente)
        await db.query(
            `DELETE FROM detalle_pedido WHERE id_pedido = ?`,
            { 
                replacements: [id],
                type: db.QueryTypes.DELETE,
                transaction 
            }
        );

        // Luego eliminar el envío si existe
        await db.query(
            `DELETE FROM envio WHERE id_pedido = ?`,
            { 
                replacements: [id],
                type: db.QueryTypes.DELETE,
                transaction 
            }
        );

        // Finalmente eliminar el pedido
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }

        await pedido.destroy({ transaction });
        await transaction.commit();

        res.json({ 
            msg: `Pedido con ID ${id} eliminado exitosamente. El stock ha sido devuelto automáticamente.` 
        });
    } catch (err) {
        await transaction.rollback();
        console.error("Error al eliminar pedido:", err);
        res.status(500).json({
            msg: "Error interno del servidor al eliminar pedido.",
            error: err.message,
        });
    }
};

// Obtener pedidos por rango de fechas
const obtenerPedidosPorFecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        
        const whereCondition = {};
        if (fecha_inicio && fecha_fin) {
            whereCondition.fecha_pedido = {
                [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
            };
        }
        
        const pedidos = await Pedido.findAll({
            where: whereCondition,
            include: [{
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo']
            }],
            order: [['fecha_pedido', 'DESC']]
        });
        
        res.json(pedidos);
    } catch (err) {
        console.error("Error al obtener pedidos por fecha:", err);
        res.status(500).json({ 
            msg: "Error al consultar pedidos por fecha.", 
            error: err.message 
        });
    }
};

module.exports = {
    obtenerPedidos,
    obtenerPedidoPorId,
    obtenerPedidosPorUsuario,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    obtenerPedidosPorFecha
};