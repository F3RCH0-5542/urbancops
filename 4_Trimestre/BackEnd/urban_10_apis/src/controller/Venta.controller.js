const { Venta, Usuario } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

// R: READ - Obtener todas las ventas
const obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }],
            order: [['fecha', 'DESC']]
        });
        res.json(ventas);
    } catch (err) {
        console.error("Error al obtener ventas:", err);
        res.status(500).json({ msg: "Error al consultar ventas.", error: err.message });
    }
};

// R: READ - Obtener venta por ID
const obtenerVentaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await Venta.findByPk(id, {
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }]
        });
        if (!venta) {
            return res.status(404).json({ msg: "Venta no encontrada." });
        }
        res.json(venta);
    } catch (err) {
        console.error("Error al obtener venta por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};

// R: READ - Obtener ventas de un usuario específico
const obtenerVentasPorUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        
        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }

        const ventas = await Venta.findAll({
            where: { id_usuario },
            include: [{
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo']
            }],
            order: [['fecha', 'DESC']]
        });
        
        res.json(ventas);
    } catch (err) {
        console.error("Error al obtener ventas por usuario:", err);
        res.status(500).json({ msg: "Error al consultar ventas del usuario.", error: err.message });
    }
};

// C: CREATE - Crear nueva venta
const crearVenta = async (req, res) => {
    try {
        const { id_usuario, fecha } = req.body;
        
        // Validaciones
        if (!id_usuario) {
            return res.status(400).json({ msg: "id_usuario es requerido." });
        }

        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(400).json({ msg: "El usuario especificado no existe." });
        }

        const nuevaVenta = await Venta.create({
            id_usuario: parseInt(id_usuario),
            fecha: fecha ? new Date(fecha) : new Date()
        });

        // Obtener la venta creada con información del usuario
        const ventaCompleta = await Venta.findByPk(nuevaVenta.id_venta, {
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }]
        });

        res.status(201).json({ 
            msg: "Venta registrada exitosamente", 
            venta: ventaCompleta 
        });
    } catch (err) {
        console.error("Error al crear venta:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al registrar venta.", 
            error: err.message 
        });
    }
};

// U: UPDATE (PUT) - Actualizar venta completa
const actualizarVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, fecha } = req.body;
        
        const venta = await Venta.findByPk(id);
        if (!venta) {
            return res.status(404).json({ msg: "Venta no encontrada." });
        }

        // Validar usuario si se proporciona
        if (id_usuario) {
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return res.status(400).json({ msg: "El usuario especificado no existe." });
            }
        }

        const datosLimpios = {};
        if (id_usuario) datosLimpios.id_usuario = parseInt(id_usuario);
        if (fecha) datosLimpios.fecha = new Date(fecha);

        await venta.update(datosLimpios);
        
        // Obtener la venta actualizada con información del usuario
        const ventaActualizada = await Venta.findByPk(id, {
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }]
        });
        
        res.json({ 
            msg: "Venta actualizada exitosamente", 
            venta: ventaActualizada 
        });
    } catch (err) {
        console.error("Error al actualizar venta:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar venta.", 
            error: err.message 
        });
    }
};

// U: UPDATE (PATCH) - Actualización parcial
const actualizarVentaParcial = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const venta = await Venta.findByPk(id);
        if (!venta) {
            return res.status(404).json({ msg: "Venta no encontrada." });
        }

        // Validar usuario si se proporciona
        if (data.id_usuario) {
            const usuario = await Usuario.findByPk(data.id_usuario);
            if (!usuario) {
                return res.status(400).json({ msg: "El usuario especificado no existe." });
            }
        }

        // Limpiar y preparar datos
        const datosLimpios = {};
        if (data.id_usuario) datosLimpios.id_usuario = parseInt(data.id_usuario);
        if (data.fecha) datosLimpios.fecha = new Date(data.fecha);

        await venta.update(datosLimpios);

        // Obtener la venta actualizada con información del usuario
        const ventaActualizada = await Venta.findByPk(id, {
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }]
        });

        res.json({ 
            msg: "Venta actualizada parcialmente", 
            venta: ventaActualizada 
        });
    } catch (err) {
        console.error("Error al actualizar venta (PATCH):", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar venta parcialmente.", 
            error: err.message 
        });
    }
};

// D: DELETE - Eliminar venta
const eliminarVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const venta = await Venta.findByPk(id);
        if (!venta) {
            return res.status(404).json({ msg: "Venta no encontrada." });
        }

        await venta.destroy();
        res.json({ msg: `Venta con ID ${id} eliminada exitosamente.` });
    } catch (err) {
        console.error("Error al eliminar venta:", err);
        res.status(500).json({
            msg: "Error interno del servidor al eliminar venta.",
            error: err.message,
        });
    }
};

// Obtener ventas por rango de fechas
const obtenerVentasPorFecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        
        const whereCondition = {};
        if (fecha_inicio && fecha_fin) {
            whereCondition.fecha = {
                [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
            };
        }
        
        const ventas = await Venta.findAll({
            where: whereCondition,
            include: [{
                model: Usuario,
                attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
            }],
            order: [['fecha', 'DESC']]
        });
        
        res.json(ventas);
    } catch (err) {
        console.error("Error al obtener ventas por fecha:", err);
        res.status(500).json({ 
            msg: "Error al consultar ventas por fecha.", 
            error: err.message 
        });
    }
};

// Obtener estadísticas de ventas
const obtenerEstadisticasVentas = async (req, res) => {
    try {
        const estadisticas = await Venta.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id_venta')), 'total_ventas'],
                [sequelize.fn('DATE', sequelize.col('fecha')), 'fecha'],
            ],
            group: [sequelize.fn('DATE', sequelize.col('fecha'))],
            order: [[sequelize.fn('DATE', sequelize.col('fecha')), 'DESC']],
            limit: 30 // Últimos 30 días
        });
        
        res.json(estadisticas);
    } catch (err) {
        console.error("Error al obtener estadísticas de ventas:", err);
        res.status(500).json({ 
            msg: "Error al consultar estadísticas de ventas.", 
            error: err.message 
        });
    }
};

module.exports = {
    obtenerVentas,
    obtenerVentaPorId,
    obtenerVentasPorUsuario,
    crearVenta,
    actualizarVenta,
    actualizarVentaParcial,
    eliminarVenta,
    obtenerVentasPorFecha,
    obtenerEstadisticasVentas
};