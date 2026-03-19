// Backend: routes/pqrs.routes.js
const express = require('express');
const router = express.Router();

// Importar controlador - VERIFICAR que el path sea correcto
let controller;
try {
    controller = require('../controller/pqrs.controller');
    console.log('✅ Controlador PQRS importado correctamente');
    console.log('Funciones disponibles:', Object.keys(controller));
} catch (error) {
    console.error('❌ Error al importar controlador PQRS:', error.message);
    throw error;
}

const {
    obtenerPqrs,
    obtenerPqrsPorId,
    crearPqrs,
    actualizarPqrs,
    eliminarPqrs
} = controller;

// Verificar que las funciones existen
if (!obtenerPqrs) throw new Error('obtenerPqrs no está definida');
if (!obtenerPqrsPorId) throw new Error('obtenerPqrsPorId no está definida');
if (!crearPqrs) throw new Error('crearPqrs no está definida');
if (!actualizarPqrs) throw new Error('actualizarPqrs no está definida');
if (!eliminarPqrs) throw new Error('eliminarPqrs no está definida');

console.log('✅ Todas las funciones del controlador PQRS verificadas');

// GET - Listar todas las PQRS
router.get('/', obtenerPqrs);

// POST - Crear nueva PQRS (público)
router.post('/', crearPqrs);

// GET - Obtener una PQRS por ID
router.get('/:id', obtenerPqrsPorId);

// PUT - Actualizar PQRS completa
router.put('/:id', actualizarPqrs);

// DELETE - Eliminar PQRS
router.delete('/:id', eliminarPqrs);

module.exports = router;