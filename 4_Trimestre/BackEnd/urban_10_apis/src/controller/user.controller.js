
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt"); 

// R: READ
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ attributes: { exclude: ['clave'] } });
        res.json(usuarios);
    } catch (err) {
        console.error("❌ Error al obtener usuarios:", err);
        res.status(500).json({ msg: "Error al consultar usuarios." });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id, { attributes: { exclude: ['clave'] } });
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }
        res.json(usuario);
    } catch (err) {
        console.error("❌ Error al obtener usuario por ID:", err);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

// C: CREATE
const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, documento, correo, clave, usuario, id_rol } = req.body;
        const existeUsuario = await Usuario.findOne({ where: { correo } });
        if (existeUsuario) {
            return res.status(400).json({ msg: "El correo ya está registrado." });
        }

        const salt = await bcrypt.genSalt(10);
        const claveHasheada = await bcrypt.hash(clave, salt);

        const nuevoUsuario = await Usuario.create({
            nombre, apellido, documento, correo, usuario, id_rol, clave: claveHasheada
        });

        const { clave: _, ...usuarioCreado } = nuevoUsuario.toJSON();
        res.status(201).json({ msg: "Usuario creado exitosamente", usuario: usuarioCreado });
    } catch (err) {
        console.error("❌ Error al crear usuario:", err);
        res.status(500).json({ msg: "Error interno del servidor al crear usuario." });
    }
};

// U: UPDATE (PUT)
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }

        if (data.clave) {
            const salt = await bcrypt.genSalt(10);
            data.clave = await bcrypt.hash(data.clave, salt);
        }

        await usuario.update(data);
        
        const { clave: _, ...usuarioActualizado } = usuario.toJSON();
        res.json({ msg: "Usuario actualizado exitosamente", usuario: usuarioActualizado });
    } catch (err) {
        console.error("❌ Error al actualizar usuario:", err);
        res.status(500).json({ msg: "Error interno del servidor al actualizar usuario." });
    }
};

// U: UPDATE (PATCH - parcial)
const actualizarUsuarioParcial = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }

        if (data.clave) {
            const salt = await bcrypt.genSalt(10);
            data.clave = await bcrypt.hash(data.clave, salt);
        }

        await usuario.update(data);

        const { clave: _, ...usuarioActualizado } = usuario.toJSON();
        res.json({ msg: "Usuario actualizado parcialmente", usuario: usuarioActualizado });
    } catch (err) {
        console.error("❌ Error al actualizar usuario (PATCH):", err);
        res.status(500).json({ msg: "Error interno del servidor al actualizar usuario parcialmente." });
    }
};

// D: DELETE
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // 👇 protege al superadmin (id fijo = 72 o rol = 1)
    if (parseInt(id) === 72) {
      return res.status(403).json({ msg: "No se puede eliminar al Superadmin." });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    await usuario.destroy();
    res.json({ msg: `Usuario con ID ${id} eliminado exitosamente.` });
  } catch (err) {
    console.error("❌ Error al eliminar usuario:", err);
    res.status(500).json({
      msg: "Error interno del servidor al eliminar usuario.",
      error: err.message,   // 👈 ahora devuelve el error real en Postman
    });
  }
};
// AGREGAR al final de user.controller.js (antes del module.exports)
const obtenerUsuariosConRol = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ 
            attributes: { exclude: ['clave'] },
            include: [{
                model: Rol,
                attributes: ['id_rol', 'nombre_rol']
            }],
            order: [['id_usuario', 'ASC']]
        });
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener usuarios con rol:", err);
        res.status(500).json({ msg: "Error al consultar usuarios con roles." });
    }
};

// Y agregar al module.exports:
module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuariosConRol, // NUEVA
    crearUsuario,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
};
module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    actualizarUsuarioParcial,
    eliminarUsuario
};
