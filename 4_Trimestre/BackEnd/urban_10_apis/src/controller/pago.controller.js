const { Pago, Pedido, Usuario } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

// Métodos de pago válidos
const METODOS_PAGO_VALIDOS = [
    'efectivo',
    'tarjeta_credito',
    'tarjeta_debito',
    'transferencia',
    'pse',
    'nequi',
    'daviplata',
    'paypal'
];

// R: READ - Obtener todos los pagos
const obtenerPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [{
                model: Pedido,
                attributes: ['id_pedido', 'fecha_pedido', 'total'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo']
                }]
            }],
            order: [['fecha_pago', 'DESC']]
        });
        res.json(pagos);
    } catch (err) {
        console.error("Error al obtener pagos:", err);
        res.status(500).json({ msg: "Error al consultar pagos.", error: err.message });
    }
};

// R: READ - Obtener pago por ID
const obtenerPagoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await Pago.findByPk(id, {
            include: [{
                model: Pedido,
                attributes: ['id_pedido', 'fecha_pedido', 'total'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo']
                }]
            }]
        });
        if (!pago) {
            return res.status(404).json({ msg: "Pago no encontrado." });
        }
        res.json(pago);
    } catch (err) {
        console.error("Error al obtener pago por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};

// R: READ - Obtener pagos de un pedido específico
const obtenerPagosPorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        
        // Verificar que el pedido existe
        const pedido = await Pedido.findByPk(id_pedido);
        if (!pedido) {
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }

        const pagos = await Pago.findAll({
            where: { id_pedido },
            include: [{
                model: Pedido,
                attributes: ['fecha_pedido', 'total']
            }],
            order: [['fecha_pago', 'DESC']]
        });
        
        res.json(pagos);
    } catch (err) {
        console.error("Error al obtener pagos por pedido:", err);
        res.status(500).json({ msg: "Error al consultar pagos del pedido.", error: err.message });
    }
};

// C: CREATE - Crear nuevo pago
const crearPago = async (req, res) => {
    try {
        const { id_pedido, metodo_pago, monto } = req.body;
        
        // Validaciones
        if (!id_pedido || !metodo_pago || !monto) {
            return res.status(400).json({ 
                msg: "id_pedido, metodo_pago y monto son requeridos." 
            });
        }

        // Validar monto
        if (isNaN(monto) || parseFloat(monto) <= 0) {
            return res.status(400).json({ msg: "El monto debe ser un número positivo." });
        }

        // Validar método de pago
        if (!METODOS_PAGO_VALIDOS.includes(metodo_pago.toLowerCase())) {
            return res.status(400).json({ 
                msg: "Método de pago no válido.",
                metodosValidos: METODOS_PAGO_VALIDOS
            });
        }

        // Verificar que el pedido existe
        const pedido = await Pedido.findByPk(id_pedido);
        if (!pedido) {
            return res.status(400).json({ msg: "El pedido especificado no existe." });
        }

        // Verificar que el monto no exceda el total del pedido
        if (parseFloat(monto) > parseFloat(pedido.total)) {
            return res.status(400).json({ 
                msg: `El monto del pago (${monto}) no puede ser mayor al total del pedido (${pedido.total}).` 
            });
        }

        const nuevoPago = await Pago.create({ 
            id_pedido: parseInt(id_pedido),
            metodo_pago: metodo_pago.toLowerCase(),
            monto: parseFloat(monto),
            fecha_pago: new Date()
        });
        
        // Obtener el pago creado con información del pedido
        const pagoCompleto = await Pago.findByPk(nuevoPago.id_pago, {
            include: [{
                model: Pedido,
                attributes: ['id_pedido', 'fecha_pedido', 'total'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo']
                }]
            }]
        });
        
        res.status(201).json({ 
            msg: "Pago registrado exitosamente", 
            pago: pagoCompleto 
        });
    } catch (err) {
        console.error("Error al crear pago:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al registrar pago.", 
            error: err.message 
        });
    }
};

// U: UPDATE - Actualizar pago
const actualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pedido, metodo_pago, monto, fecha_pago } = req.body;
        
        const pago = await Pago.findByPk(id);
        if (!pago) {
            return res.status(404).json({ msg: "Pago no encontrado." });
        }

        // Validar pedido si se proporciona
        if (id_pedido) {
            const pedido = await Pedido.findByPk(id_pedido);
            if (!pedido) {
                return res.status(400).json({ msg: "El pedido especificado no existe." });
            }
            
            // Verificar que el monto no exceda el total del nuevo pedido
            const montoActualizar = monto !== undefined ? parseFloat(monto) : parseFloat(pago.monto);
            if (montoActualizar > parseFloat(pedido.total)) {
                return res.status(400).json({ 
                    msg: `El monto del pago (${montoActualizar}) no puede ser mayor al total del pedido (${pedido.total}).` 
                });
            }
        }

        // Validar método de pago si se proporciona
        if (metodo_pago && !METODOS_PAGO_VALIDOS.includes(metodo_pago.toLowerCase())) {
            return res.status(400).json({ 
                msg: "Método de pago no válido.",
                metodosValidos: METODOS_PAGO_VALIDOS
            });
        }

        // Validar monto si se proporciona
        if (monto !== undefined && (isNaN(monto) || parseFloat(monto) <= 0)) {
            return res.status(400).json({ msg: "El monto debe ser un número positivo." });
        }

        const datosLimpios = {};
        if (id_pedido) datosLimpios.id_pedido = parseInt(id_pedido);
        if (metodo_pago) datosLimpios.metodo_pago = metodo_pago.toLowerCase();
        if (monto !== undefined) datosLimpios.monto = parseFloat(monto);
        if (fecha_pago) datosLimpios.fecha_pago = new Date(fecha_pago);

        await pago.update(datosLimpios);
        
        // Obtener el pago actualizado con información del pedido
        const pagoActualizado = await Pago.findByPk(id, {
            include: [{
                model: Pedido,
                attributes: ['id_pedido', 'fecha_pedido', 'total'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo']
                }]
            }]
        });
        
        res.json({ 
            msg: "Pago actualizado exitosamente", 
            pago: pagoActualizado 
        });
    } catch (err) {
        console.error("Error al actualizar pago:", err);
        res.status(500).json({ 
            msg: "Error interno del servidor al actualizar pago.", 
            error: err.message 
        });
    }
};

// D: DELETE - Eliminar pago
const eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;

        const pago = await Pago.findByPk(id);
        if (!pago) {
            return res.status(404).json({ msg: "Pago no encontrado." });
        }

        // Los pagos pueden eliminarse, pero normalmente se prefiere mantener el historial
        await pago.destroy();
        res.json({ msg: `Pago con ID ${id} eliminado exitosamente.` });
    } catch (err) {
        console.error("Error al eliminar pago:", err);
        res.status(500).json({
            msg: "Error interno del servidor al eliminar pago.",
            error: err.message,
        });
    }
};

// Obtener pagos por rango de fechas
const obtenerPagosPorFecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        
        const whereCondition = {};
        if (fecha_inicio && fecha_fin) {
            whereCondition.fecha_pago = {
                [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
            };
        }
        
        const pagos = await Pago.findAll({
            where: whereCondition,
            include: [{
                model: Pedido,
                attributes: ['id_pedido', 'fecha_pedido', 'total'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo']
                }]
            }],
            order: [['fecha_pago', 'DESC']]
        });
        
        res.json(pagos);
    } catch (err) {
        console.error("Error al obtener pagos por fecha:", err);
        res.status(500).json({ 
            msg: "Error al consultar pagos por fecha.", 
            error: err.message 
        });
    }
};

// Obtener resumen de pagos por método
const obtenerResumenPorMetodo = async (req, res) => {
    try {
        const resumen = await Pago.findAll({
            attributes: [
                'metodo_pago',
                [sequelize.fn('COUNT', sequelize.col('id_pago')), 'cantidad_pagos'],
                [sequelize.fn('SUM', sequelize.col('monto')), 'total_monto']
            ],
            group: ['metodo_pago'],
            order: [[sequelize.fn('SUM', sequelize.col('monto')), 'DESC']]
        });
        
        res.json(resumen);
    } catch (err) {
        console.error("Error al obtener resumen por método:", err);
        res.status(500).json({ 
            msg: "Error al consultar resumen de pagos.", 
            error: err.message 
        });
    }
};

module.exports = {
    obtenerPagos,
    obtenerPagoPorId,
    obtenerPagosPorPedido,
    crearPago,
    actualizarPago,
    eliminarPago,
    obtenerPagosPorFecha,
    obtenerResumenPorMetodo
};