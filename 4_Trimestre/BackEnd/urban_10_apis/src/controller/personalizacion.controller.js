const { Personalizacion, Pedido, Usuario } = require("../models");
const { Op } = require("sequelize");

/* ======================================================
   R: READ - Obtener personalizaciones (ADMIN vs USUARIO)
   ====================================================== */
const obtenerPersonalizaciones = async (req, res) => {
    try {
        const { rolId, userId } = req;

        let where = {};

        // 🔒 Si NO es admin (rol 1) → solo sus pedidos
        if (rolId !== 1) {
            where = {
                "$Pedido.id_usuario$": userId
            };
        }

        const personalizaciones = await Personalizacion.findAll({
            where,
            include: [{
                model: Pedido,
                attributes: ["id_pedido", "fecha_pedido", "total", "id_usuario"],
                include: [{
                    model: Usuario,
                    attributes: ["nombre", "apellido", "correo"]
                }]
            }],
            order: [["id_personalizacion", "DESC"]]
        });

        res.json(personalizaciones);
    } catch (err) {
        console.error("Error al obtener personalizaciones:", err);
        res.status(500).json({ msg: "Error al consultar personalizaciones." });
    }
};

/* ======================================================
   R: READ - Obtener personalización por ID
   ====================================================== */
const obtenerPersonalizacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rolId, userId } = req;

        const personalizacion = await Personalizacion.findByPk(id, {
            include: [{
                model: Pedido,
                attributes: ["id_pedido", "fecha_pedido", "total", "id_usuario"],
                include: [{
                    model: Usuario,
                    attributes: ["nombre", "apellido", "correo"]
                }]
            }]
        });

        if (!personalizacion) {
            return res.status(404).json({ msg: "Personalización no encontrada." });
        }

        // 🔒 Usuario solo puede ver lo suyo
        if (rolId !== 1 && personalizacion.Pedido.id_usuario !== userId) {
            return res.status(403).json({ msg: "Acceso denegado." });
        }

        res.json(personalizacion);
    } catch (err) {
        console.error("Error al obtener personalización por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

/* ======================================================
   R: READ - Obtener personalizaciones por pedido
   ====================================================== */
const obtenerPersonalizacionesPorPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const { rolId, userId } = req;

        const pedido = await Pedido.findByPk(id_pedido);
        if (!pedido) {
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }

        // 🔒 Usuario solo puede ver sus pedidos
        if (rolId !== 1 && pedido.id_usuario !== userId) {
            return res.status(403).json({ msg: "Acceso denegado." });
        }

        const personalizaciones = await Personalizacion.findAll({
            where: { id_pedido },
            include: [{
                model: Pedido,
                attributes: ["fecha_pedido", "total"]
            }],
            order: [["id_personalizacion", "DESC"]]
        });

        res.json(personalizaciones);
    } catch (err) {
        console.error("Error al obtener personalizaciones por pedido:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

/* ======================================================
   C: CREATE - Crear personalización (usuario o admin)
   ====================================================== */
/* ======================================================
   C: CREATE - Crear personalización (usuario o admin)
   ====================================================== */
const crearPersonalizacion = async (req, res) => {
    try {
        const { tipo_personalizacion, descripcion, costo_adicional } = req.body;
        const { userId } = req;

        // Validaciones
        if (!tipo_personalizacion) {
            return res.status(400).json({ msg: "tipo_personalizacion es requerido." });
        }

        if (!descripcion) {
            return res.status(400).json({ msg: "descripcion es requerida." });
        }

        // 🎯 Crear automáticamente un pedido para este usuario
        const nuevoPedido = await Pedido.create({
            fecha_pedido: new Date(),
            total: costo_adicional || 0,
            id_usuario: userId
        });

        // Crear la personalización asociada al nuevo pedido
        const nuevaPersonalizacion = await Personalizacion.create({
            id_pedido: nuevoPedido.id_pedido,
            tipo_personalizacion: tipo_personalizacion.trim(),
            descripcion: descripcion.trim(),
            costo_adicional: costo_adicional || 0
        });

        res.status(201).json({
            msg: "Personalización creada correctamente",
            personalizacion: nuevaPersonalizacion,
            pedido: nuevoPedido
        });
    } catch (err) {
        console.error("Error al crear personalización:", err);
        res.status(500).json({ msg: "Error interno del servidor.", error: err.message });
    }
};
/* ======================================================
   U: UPDATE - Solo ADMIN
   ====================================================== */
const actualizarPersonalizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_personalizacion, descripcion, costo_adicional } = req.body;

        const personalizacion = await Personalizacion.findByPk(id);
        if (!personalizacion) {
            return res.status(404).json({ msg: "Personalización no encontrada." });
        }

        await personalizacion.update({
            tipo_personalizacion: tipo_personalizacion?.trim(),
            descripcion: descripcion?.trim(),
            costo_adicional: costo_adicional || personalizacion.costo_adicional
        });

        res.json({
            msg: "Personalización actualizada",
            personalizacion
        });
    } catch (err) {
        console.error("Error al actualizar personalización:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

/* ======================================================
   D: DELETE - Solo SUPERADMIN
   ====================================================== */
const eliminarPersonalizacion = async (req, res) => {
    try {
        const { id } = req.params;

        const personalizacion = await Personalizacion.findByPk(id);
        if (!personalizacion) {
            return res.status(404).json({ msg: "Personalización no encontrada." });
        }

        await personalizacion.destroy();
        res.json({ msg: "Personalización eliminada correctamente." });
    } catch (err) {
        console.error("Error al eliminar personalización:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

/* ======================================================
   BUSCAR - Solo ADMIN
   ====================================================== */
const buscarPersonalizacionesPorDescripcion = async (req, res) => {
    try {
        const { busqueda } = req.query;

        if (!busqueda) {
            return res.status(400).json({ msg: "Parámetro busqueda requerido." });
        }

        const personalizaciones = await Personalizacion.findAll({
            where: {
                [Op.or]: [
                    {
                        descripcion: {
                            [Op.like]: `%${busqueda}%`
                        }
                    },
                    {
                        tipo_personalizacion: {
                            [Op.like]: `%${busqueda}%`
                        }
                    }
                ]
            },
            include: [{
                model: Pedido,
                include: [Usuario]
            }]
        });

        res.json(personalizaciones);
    } catch (err) {
        console.error("Error al buscar personalizaciones:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

module.exports = {
    obtenerPersonalizaciones,
    obtenerPersonalizacionPorId,
    obtenerPersonalizacionesPorPedido,
    crearPersonalizacion,
    actualizarPersonalizacion,
    eliminarPersonalizacion,
    buscarPersonalizacionesPorDescripcion
};