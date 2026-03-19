const Inventario = require("../models/inventario");
const { Op } = require("sequelize");

// R: READ - Obtener todos los inventarios
const obtenerInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.findAll({
            order: [['id_inventario', 'DESC']] // Más recientes primero
        });
        res.json(inventarios);
    } catch (err) {
        console.error("❌ Error al obtener inventarios:", err);
        res.status(500).json({ msg: "Error al consultar inventarios.", error: err.message });
    }
};

// R: READ - Obtener inventario por ID
const obtenerInventarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await Inventario.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ msg: "Inventario no encontrado." });
        }
        res.json(inventario);
    } catch (err) {
        console.error("❌ Error al obtener inventario por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};

// C: CREATE - Crear nuevo inventario
const crearInventario = async (req, res) => {
    try {
        const { id_personalizacion, stock, stock_minimo, precio_venta } = req.body;
        
        // Validar campos requeridos
        if (stock === undefined || isNaN(stock) || parseInt(stock) < 0) {
            return res.status(400).json({ msg: "El stock es requerido y debe ser un número positivo." });
        }

        if (stock_minimo === undefined || isNaN(stock_minimo) || parseInt(stock_minimo) < 0) {
            return res.status(400).json({ msg: "El stock mínimo es requerido y debe ser un número positivo." });
        }

        if (precio_venta === undefined || isNaN(precio_venta) || parseFloat(precio_venta) < 0) {
            return res.status(400).json({ msg: "El precio de venta es requerido y debe ser un número positivo." });
        }

        // Crear el inventario
        const nuevoInventario = await Inventario.create({ 
            id_personalizacion: id_personalizacion || null,
            stock: parseInt(stock),
            stock_minimo: parseInt(stock_minimo),
            precio_venta: parseFloat(precio_venta),
            fecha_actualizacion: new Date()
        });
        
        res.status(201).json({ 
            msg: "Inventario creado exitosamente", 
            inventario: nuevoInventario 
        });
    } catch (err) {
        console.error("❌ Error al crear inventario:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al crear inventario.", 
            error: err.message 
        });
    }
};

// U: UPDATE - Actualizar inventario
const actualizarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_personalizacion, stock, stock_minimo, precio_venta } = req.body;
        
        const inventario = await Inventario.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ msg: "Inventario no encontrado." });
        }

        // Validar campos si se proporcionan
        if (stock !== undefined && (isNaN(stock) || parseInt(stock) < 0)) {
            return res.status(400).json({ msg: "El stock debe ser un número positivo." });
        }

        if (stock_minimo !== undefined && (isNaN(stock_minimo) || parseInt(stock_minimo) < 0)) {
            return res.status(400).json({ msg: "El stock mínimo debe ser un número positivo." });
        }

        if (precio_venta !== undefined && (isNaN(precio_venta) || parseFloat(precio_venta) < 0)) {
            return res.status(400).json({ msg: "El precio de venta debe ser un número positivo." });
        }

        // Actualizar con datos limpios
        const datosLimpios = {
            fecha_actualizacion: new Date() // Siempre actualizar la fecha
        };

        if (id_personalizacion !== undefined) {
            datosLimpios.id_personalizacion = id_personalizacion;
        }
        if (stock !== undefined) {
            datosLimpios.stock = parseInt(stock);
        }
        if (stock_minimo !== undefined) {
            datosLimpios.stock_minimo = parseInt(stock_minimo);
        }
        if (precio_venta !== undefined) {
            datosLimpios.precio_venta = parseFloat(precio_venta);
        }

        await inventario.update(datosLimpios);
        res.json({ 
            msg: "Inventario actualizado exitosamente", 
            inventario 
        });
    } catch (err) {
        console.error("❌ Error al actualizar inventario:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar inventario.", 
            error: err.message 
        });
    }
};

// D: DELETE - Eliminar inventario
const eliminarInventario = async (req, res) => {
    try {
        const { id } = req.params;

        const inventario = await Inventario.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ msg: "Inventario no encontrado." });
        }

        // TODO: Verificar si el inventario está relacionado con pedidos/ventas
        // const pedidosRelacionados = await DetallePedido.findOne({ where: { id_personalizacion: inventario.id_personalizacion } });
        // if (pedidosRelacionados) {
        //     return res.status(400).json({ 
        //         msg: "No se puede eliminar el inventario porque tiene pedidos relacionados." 
        //     });
        // }

        await inventario.destroy();
        res.json({ msg: `Inventario con ID ${id} eliminado exitosamente.` });
    } catch (err) {
        console.error("❌ Error al eliminar inventario:", err);
        res.status(500).json({
            msg: "Error interno del servidor al eliminar inventario.",
            error: err.message,
        });
    }
};

// Funciones adicionales útiles para inventario

// Obtener productos con stock bajo
const obtenerStockBajo = async (req, res) => {
    try {
        const inventarios = await Inventario.findAll({
            where: {
                stock: {
                    [Op.lte]: sequelize.col('stock_minimo') // stock <= stock_minimo
                }
            },
            order: [['stock', 'ASC']]
        });
        
        res.json(inventarios);
    } catch (err) {
        console.error("❌ Error al obtener productos con stock bajo:", err);
        res.status(500).json({ 
            msg: "Error al consultar productos con stock bajo.", 
            error: err.message 
        });
    }
};

// Obtener inventarios por rango de fechas de actualización
const obtenerInventariosPorFecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        
        const whereCondition = {};
        if (fecha_inicio && fecha_fin) {
            whereCondition.fecha_actualizacion = {
                [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
            };
        }
        
        const inventarios = await Inventario.findAll({
            where: whereCondition,
            order: [['fecha_actualizacion', 'DESC']]
        });
        
        res.json(inventarios);
    } catch (err) {
        console.error("❌ Error al obtener inventarios por fecha:", err);
        res.status(500).json({ 
            msg: "Error al consultar inventarios por fecha.", 
            error: err.message 
        });
    }
};

module.exports = {
    obtenerInventarios,
    obtenerInventarioPorId,
    crearInventario,
    actualizarInventario,
    eliminarInventario,
    obtenerInventariosPorFecha,
    obtenerStockBajo
};