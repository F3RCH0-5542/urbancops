const { Router } = require("express");
const { 
  obtenerUsuarios, 
  crearUsuario, 
  actualizarUsuario, 
  actualizarUsuarioParcial,
  eliminarUsuario, 
  obtenerUsuarioPorId
} = require("../controller/user.controller");
const { validarToken, soloSuperAdmin, propietarioOSuperAdmin } = require("../middlewares/auth.middleware");
const bcrypt = require("bcrypt");

const router = Router();

// ✅ NUEVA RUTA - Mi perfil (usuario autenticado)
router.get("/perfil", validarToken, async (req, res) => {
    try {
        const { Usuario, Rol } = require("../models");
        
        const usuario = await Usuario.findByPk(req.userId, {
            attributes: { exclude: ['clave'] },
            include: [{
                model: Rol,
                attributes: ['nombre_rol']
            }]
        });
        
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }
        
        res.json(usuario);
    } catch (err) {
        console.error("Error al obtener perfil:", err);
        res.status(500).json({ msg: "Error al consultar perfil.", error: err.message });
    }
});

// ✅ NUEVA RUTA - Actualizar mi perfil
router.put("/perfil", validarToken, async (req, res) => {
    try {
        const { Usuario } = require("../models");
        const { nombre, apellido } = req.body;
        
        const usuario = await Usuario.findByPk(req.userId);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }
        
        const datosActualizar = {};
        if (nombre) datosActualizar.nombre = nombre.trim();
        if (apellido) datosActualizar.apellido = apellido.trim();
        
        await usuario.update(datosActualizar);
        
        const { clave: _, ...usuarioActualizado } = usuario.toJSON();
        res.json({ 
            msg: "Perfil actualizado exitosamente", 
            usuario: usuarioActualizado 
        });
    } catch (err) {
        console.error("Error al actualizar perfil:", err);
        res.status(500).json({ msg: "Error al actualizar perfil.", error: err.message });
    }
});

// ✅ NUEVA RUTA - Cambiar contraseña
router.put("/cambiar-contrasena", validarToken, async (req, res) => {
    try {
        const { Usuario } = require("../models");
        const { clave_actual, clave_nueva } = req.body;
        
        if (!clave_actual || !clave_nueva) {
            return res.status(400).json({ msg: "Se requieren ambas contraseñas." });
        }
        
        const usuario = await Usuario.findByPk(req.userId);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }
        
        // Verificar contraseña actual
        const esValida = await bcrypt.compare(clave_actual, usuario.clave);
        if (!esValida) {
            return res.status(401).json({ msg: "Contraseña actual incorrecta." });
        }
        
        // Hashear nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const claveHasheada = await bcrypt.hash(clave_nueva, salt);
        
        await usuario.update({ clave: claveHasheada });
        
        res.json({ msg: "Contraseña actualizada exitosamente" });
    } catch (err) {
        console.error("Error al cambiar contraseña:", err);
        res.status(500).json({ msg: "Error al cambiar contraseña.", error: err.message });
    }
});

// R: READ - Solo SuperAdmin puede ver todos los usuarios
router.get("/", validarToken, soloSuperAdmin, obtenerUsuarios);

router.get("/admin", validarToken, soloSuperAdmin, (req, res) => {
  res.json({ msg: "Bienvenido superadmin", user: req.userId });
});

// Usuario puede ver su propio perfil, SuperAdmin puede ver cualquiera
router.get("/:id", validarToken, propietarioOSuperAdmin, obtenerUsuarioPorId);

// C: CREATE - Solo SuperAdmin puede crear usuarios
router.post("/", validarToken, soloSuperAdmin, crearUsuario);

// U: UPDATE - Solo SuperAdmin puede actualizar usuarios
router.put("/:id", validarToken, soloSuperAdmin, actualizarUsuario);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarUsuarioParcial);

// D: DELETE - Solo SuperAdmin puede eliminar usuarios
router.delete("/:id", validarToken, soloSuperAdmin, eliminarUsuario);

module.exports = router;