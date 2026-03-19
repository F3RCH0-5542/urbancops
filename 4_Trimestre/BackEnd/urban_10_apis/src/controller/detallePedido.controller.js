const DetallePedido = require("../models/DetallePedido");
const { Op } = require("sequelize");

// R: READ - Obtener todos los detalles de pedidos
const obtenerDetallesPedidos = async (req, res) => {
    try {
        const detalles = await DetallePedido.findAll({
            order: [['id_detalle', 'DESC']]
        });
        res.json(detalles);
    } catch (err) {
        console.error("❌ Error al obtener detalles de pedidos:", err);
        res.status(500).json({ msg: "Error al consultar detalles de pedidos.", error: err.message });
    }
};

// R: READ - Obtener detalle por ID
const obtenerDetallePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetallePedido.findByPk(id);
        if (!detalle) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado." });
        }
        res.json(detalle);
    } catch (err) {
        console.error("❌ Error al obtener detalle por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};

// R: READ - Obtener detalles por ID de pedido
const obtenerDetallesPorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const detalles = await DetallePedido.findAll({
            where: { id_pedido },
            order: [['id_detalle', 'ASC']]
        });
        res.json(detalles);
    } catch (err) {
        console.error("❌ Error al obtener detalles por pedido:", err);
        res.status(500).json({ msg: "Error al consultar detalles del pedido.", error: err.message });
    }
};

// C: CREATE - Crear nuevo detalle de pedido
const crearDetallePedido = async (req, res) => {
    try {
        const { id_pedido, id_personalizacion, cantidad, precio_unitario } = req.body;
        
        // Validar campos requeridos
        if (!id_pedido || isNaN(id_pedido)) {
            return res.status(400).json({ msg: "El ID del pedido es requerido y debe ser un número." });
        }

        if (!id_personalizacion || isNaN(id_personalizacion)) {
            return res.status(400).json({ msg: "El ID de personalización es requerido y debe ser un número." });
        }

        if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
            return res.status(400).json({ msg: "La cantidad es requerida y debe ser mayor a 0." });
        }

        if (!precio_unitario || isNaN(precio_unitario) || parseFloat(precio_unitario) < 0) {
            return res.status(400).json({ msg: "El precio unitario es requerido y debe ser un número positivo." });
        }

        // Calcular subtotal
        const subtotal = parseFloat(precio_unitario) * parseInt(cantidad);

        // Crear el detalle
        const nuevoDetalle = await DetallePedido.create({ 
            id_pedido: parseInt(id_pedido),
            id_personalizacion: parseInt(id_personalizacion),
            cantidad: parseInt(cantidad),
            precio_unitario: parseFloat(precio_unitario),
            subtotal: subtotal
        });
        
        res.status(201).json({ 
            msg: "Detalle de pedido creado exitosamente", 
            detalle: nuevoDetalle 
        });
    } catch (err) {
        console.error("❌ Error al crear detalle de pedido:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al crear detalle de pedido.", 
            error: err.message 
        });
    }
};

// U: UPDATE - Actualizar detalle de pedido
const actualizarDetallePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pedido, id_personalizacion, cantidad, precio_unitario } = req.body;
        
        const detalle = await DetallePedido.findByPk(id);
        if (!detalle) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado." });
        }

        // Validar campos si se proporcionan
        if (cantidad !== undefined && (isNaN(cantidad) || parseInt(cantidad) <= 0)) {
            return res.status(400).json({ msg: "La cantidad debe ser mayor a 0." });
        }

        if (precio_unitario !== undefined && (isNaN(precio_unitario) || parseFloat(precio_unitario) < 0)) {
            return res.status(400).json({ msg: "El precio unitario debe ser un número positivo." });
        }

        // Actualizar con datos limpios
        const datosLimpios = {};

        if (id_pedido !== undefined) {
            datosLimpios.id_pedido = parseInt(id_pedido);
        }
        if (id_personalizacion !== undefined) {
            datosLimpios.id_personalizacion = parseInt(id_personalizacion);
        }
        if (cantidad !== undefined) {
            datosLimpios.cantidad = parseInt(cantidad);
        }
        if (precio_unitario !== undefined) {
            datosLimpios.precio_unitario = parseFloat(precio_unitario);
        }

        // Recalcular subtotal si cambia cantidad o precio
        const cantidadFinal = cantidad !== undefined ? parseInt(cantidad) : detalle.cantidad;
        const precioFinal = precio_unitario !== undefined ? parseFloat(precio_unitario) : detalle.precio_unitario;
        datosLimpios.subtotal = cantidadFinal * precioFinal;

        await detalle.update(datosLimpios);
        res.json({ 
            msg: "Detalle de pedido actualizado exitosamente", 
            detalle 
        });
    } catch (err) {
        console.error("❌ Error al actualizar detalle de pedido:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar detalle de pedido.", 
            error: err.message 
        });
    }
};

// D: DELETE - Eliminar detalle de pedido
const eliminarDetallePedido = async (req, res) => {
    try {
        const { id } = req.params;

        const detalle = await DetallePedido.findByPk(id);
        if (!detalle) {
            return res.status(404).json({ msg: "Detalle de pedido no encontrado." });
        }

        await detalle.destroy();
        res.json({ msg: `Detalle de pedido con ID ${id} eliminado exitosamente.` });
    } catch (err) {
        console.error("❌ Error al eliminar detalle de pedido:", err);
        res.status(500).json({
            msg: "Error interno del servidor al eliminar detalle de pedido.",
            error: err.message,
        });
    }
};

module.exports = {
    obtenerDetallesPedidos,
    obtenerDetallePorId,
    obtenerDetallesPorPedido,
    crearDetallePedido,
    actualizarDetallePedido,
    eliminarDetallePedido
};