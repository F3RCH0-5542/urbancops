const { Pqrs } = require("../models");

// Función para capitalizar
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Obtener todos los PQRS
const obtenerPqrs = async (req, res) => {
    try {
        console.log('📋 Obteniendo lista de PQRS...');
        const pqrs = await Pqrs.findAll({
            order: [['fecha_solicitud', 'DESC']]
        });
        console.log(`✅ Encontrados ${pqrs.length} PQRS`);
        res.json(pqrs);
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ msg: "Error al obtener PQRS", error: err.message });
    }
};

// Obtener PQRS por ID
const obtenerPqrsPorId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📋 Buscando PQRS ID: ${id}`);
        const pqrs = await Pqrs.findByPk(id);
        if (!pqrs) {
            return res.status(404).json({ msg: "PQRS no encontrado" });
        }
        res.json(pqrs);
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ msg: "Error al obtener PQRS", error: err.message });
    }
};

// Crear PQRS
const crearPqrs = async (req, res) => {
    try {
        console.log('=================================================');
        console.log('📥 CREANDO PQRS');
        console.log('Body recibido:', req.body);
        
        const { tipo_pqrs, descripcion, nombre, correo, estado, respuesta } = req.body;
        
        if (!nombre || !correo || !tipo_pqrs || !descripcion) {
            console.log('❌ Faltan campos obligatorios');
            return res.status(400).json({ 
                msg: "Campos obligatorios: nombre, correo, tipo_pqrs, descripcion" 
            });
        }

        const tipoCapitalizado = capitalize(tipo_pqrs);
        console.log('Tipo capitalizado:', tipoCapitalizado);

        const nuevoPqrs = await Pqrs.create({
            nombre: nombre.trim(),
            correo: correo.trim(),
            tipo_pqrs: tipoCapitalizado,
            descripcion: descripcion.trim(),
            estado: estado || 'Pendiente',
            respuesta: respuesta || ''
        });

        console.log('✅ PQRS creado con ID:', nuevoPqrs.id_pqrs);
        console.log('=================================================');

        res.status(201).json({ 
            msg: "PQRS creada exitosamente",
            id_pqrs: nuevoPqrs.id_pqrs,
            pqrs: nuevoPqrs
        });
    } catch (err) {
        console.log('=================================================');
        console.error("❌ ERROR AL CREAR PQRS");
        console.error("Mensaje:", err.message);
        console.error("Stack:", err.stack);
        console.log('=================================================');
        res.status(500).json({ 
            msg: "Error al crear PQRS", 
            error: err.message
        });
    }
};

// Actualizar PQRS
const actualizarPqrs = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_pqrs, descripcion, estado, respuesta, nombre, correo } = req.body;
        
        console.log(`📝 Actualizando PQRS ID: ${id}`);
        
        const pqrs = await Pqrs.findByPk(id);
        if (!pqrs) {
            return res.status(404).json({ msg: "PQRS no encontrado" });
        }

        const datos = {};
        if (nombre) datos.nombre = nombre.trim();
        if (correo) datos.correo = correo.trim();
        if (tipo_pqrs) datos.tipo_pqrs = capitalize(tipo_pqrs);
        if (descripcion) datos.descripcion = descripcion.trim();
        if (estado) datos.estado = estado;
        if (respuesta !== undefined) datos.respuesta = respuesta.trim();

        await pqrs.update(datos);
        console.log('✅ PQRS actualizado');
        
        res.json({ msg: "PQRS actualizada exitosamente", pqrs });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ msg: "Error al actualizar PQRS", error: err.message });
    }
};

// Eliminar PQRS
const eliminarPqrs = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ Eliminando PQRS ID: ${id}`);
        
        const pqrs = await Pqrs.findByPk(id);
        if (!pqrs) {
            return res.status(404).json({ msg: "PQRS no encontrado" });
        }

        await pqrs.destroy();
        console.log('✅ PQRS eliminado');
        
        res.json({ msg: "PQRS eliminada exitosamente" });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ msg: "Error al eliminar PQRS", error: err.message });
    }
};

module.exports = {
    obtenerPqrs,
    obtenerPqrsPorId,
    crearPqrs,
    actualizarPqrs,
    eliminarPqrs
};