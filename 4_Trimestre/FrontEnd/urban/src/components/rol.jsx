import React, { useState, useEffect } from "react";
import { listRoles, createRol, updateRol, deleteRol } from "../services/rolService";

const styles = {
  container: {
    minHeight: '100vh',
    background: '#000000',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff'
  },
  nav: {
    background: '#000000',
    borderBottom: '1px solid #222222',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px'
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '1px',
    textDecoration: 'none'
  },
  backBtn: {
    background: '#111111',
    color: 'white',
    border: '1px solid #222222',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    textDecoration: 'none',
    display: 'inline-block'
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  subtitle: {
    color: '#999999',
    fontSize: '16px'
  },
  card: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '24px'
  },
  formGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '200px',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '14px 16px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s'
  },
  textarea: {
    width: '100%',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '14px 16px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif'
  },
  button: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  buttonSuccess: {
    background: '#10b981'
  },
  buttonDanger: {
    background: '#ef4444'
  },
  buttonWarning: {
    background: '#f59e0b'
  },
  buttonDisabled: {
    background: '#374151',
    cursor: 'not-allowed'
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '24px',
    animation: 'slideIn 0.3s ease-out'
  },
  alertDanger: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  },
  alertSuccess: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  rolesList: {
    display: 'grid',
    gap: '12px'
  },
  roleItem: {
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '8px',
    padding: '20px 24px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  roleIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0
  },
  roleContent: {
    flex: 1
  },
  roleName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  roleDesc: {
    fontSize: '14px',
    color: '#999999'
  },
  roleActions: {
    display: 'flex',
    gap: '8px'
  },
  iconBtn: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '6px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    justifyContent: 'flex-end'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999999'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  loader: {
    textAlign: 'center',
    padding: '40px',
    color: '#999999'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #222222',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    margin: '0 auto 16px',
    animation: 'spin 1s linear infinite'
  }
};

const Rol = ({ token: propToken }) => {
  const [roles, setRoles] = useState([]);
  const [newRol, setNewRol] = useState({ nombre_rol: "", descripcion: "" });
  const [editingRol, setEditingRol] = useState(null);
  const [deletingRol, setDeletingRol] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = propToken || localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Debes iniciar sesión para ver roles");
      return;
    }
    fetchRoles();
  }, [token]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listRoles(token);
      setRoles(data);
    } catch (err) {
      console.error("Error al obtener roles:", err);
      setError("No se pudieron cargar los roles");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRol = async () => {
    if (!newRol.nombre_rol.trim()) {
      setError("Debes ingresar un nombre para el rol");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await createRol({
        nombre_rol: newRol.nombre_rol.trim(),
        descripcion: newRol.descripcion.trim() || "Sin descripción",
      }, token);
      
      setRoles([...roles, data.rol || data]);
      setNewRol({ nombre_rol: "", descripcion: "" });
      setSuccess("✅ Rol creado exitosamente");
    } catch (err) {
      console.error("Error al crear rol:", err);
      setError(err.response?.data?.msg || "No se pudo crear el rol");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (rol) => {
    setEditingRol({ ...rol });
    setShowEditModal(true);
  };

  const handleUpdateRol = async () => {
    if (!editingRol.nombre_rol.trim()) {
      setError("El nombre del rol no puede estar vacío");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await updateRol(editingRol.id_rol, {
        nombre_rol: editingRol.nombre_rol.trim(),
        descripcion: editingRol.descripcion.trim() || "Sin descripción",
      }, token);
      
      setRoles(roles.map(r => 
        r.id_rol === editingRol.id_rol ? editingRol : r
      ));
      setShowEditModal(false);
      setEditingRol(null);
      setSuccess("✅ Rol actualizado exitosamente");
    } catch (err) {
      console.error("Error al actualizar rol:", err);
      setError(err.response?.data?.msg || "No se pudo actualizar el rol");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (rol) => {
    setDeletingRol(rol);
    setShowDeleteModal(true);
  };

  const handleDeleteRol = async () => {
    try {
      setLoading(true);
      setError("");
      await deleteRol(deletingRol.id_rol, token);
      
      setRoles(roles.filter(r => r.id_rol !== deletingRol.id_rol));
      setShowDeleteModal(false);
      setDeletingRol(null);
      setSuccess("✅ Rol eliminado exitosamente");
    } catch (err) {
      console.error("Error al eliminar rol:", err);
      setError(err.response?.data?.msg || "No se pudo eliminar el rol");
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateRol();
    }
  };

  if (!token) {
    return (
      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.navContent}>
            <a href="/home" style={styles.logo}>URBAN CAPS</a>
            <a href="/login" style={styles.backBtn}>INICIAR SESIÓN</a>
          </div>
        </nav>
        <div style={{...styles.content, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '72px', marginBottom: '24px'}}>🔒</div>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '12px'}}>
              Acceso Restringido
            </h2>
            <p style={{color: '#999999', marginBottom: '32px'}}>
              Debes iniciar sesión para acceder a esta sección
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .back-hover:hover {
            background: #1a1a1a !important;
            border-color: #333333 !important;
          }
          .button-hover:hover {
            background: #2563eb !important;
            transform: scale(1.02);
          }
          .button-success-hover:hover {
            background: #059669 !important;
            transform: scale(1.02);
          }
          .button-danger-hover:hover {
            background: #dc2626 !important;
            transform: scale(1.02);
          }
          .button-warning-hover:hover {
            background: #d97706 !important;
            transform: scale(1.02);
          }
          .input-focus:focus {
            border-color: #3b82f6 !important;
          }
          .role-hover:hover {
            border-color: #333333 !important;
            transform: translateY(-2px);
          }
          .icon-btn-hover:hover {
            background: #1a1a1a !important;
            border-color: #333333 !important;
            transform: scale(1.1);
          }
        `}
      </style>

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <a href="/home" style={styles.logo}>URBAN CAPS</a>
          <a href="/home" style={styles.backBtn} className="back-hover">
            ← VOLVER AL INICIO
          </a>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span>👥</span>
            GESTIÓN DE ROLES
          </h1>
          <p style={styles.subtitle}>
            Crea, edita y elimina roles del sistema
          </p>
        </div>

        <div style={styles.card}>
          {error && (
            <div style={{...styles.alert, ...styles.alertDanger}}>
              <span style={{fontSize: '20px'}}>⚠️</span>
              <span style={{color: '#ef4444', fontWeight: '600'}}>{error}</span>
            </div>
          )}

          {success && (
            <div style={{...styles.alert, ...styles.alertSuccess}}>
              <span style={{fontSize: '20px'}}>✅</span>
              <span style={{color: '#10b981', fontWeight: '600'}}>{success}</span>
            </div>
          )}

          <div style={{marginBottom: '24px'}}>
            <div style={styles.formGroup}>
              <input
                type="text"
                value={newRol.nombre_rol}
                onChange={(e) => setNewRol({...newRol, nombre_rol: e.target.value})}
                onKeyPress={handleKeyPress}
                placeholder="Nombre del nuevo rol..."
                style={styles.input}
                className="input-focus"
                disabled={loading}
              />
            </div>
            <textarea
              value={newRol.descripcion}
              onChange={(e) => setNewRol({...newRol, descripcion: e.target.value})}
              placeholder="Descripción del rol (opcional)..."
              style={styles.textarea}
              className="input-focus"
              disabled={loading}
            />
            <button
              onClick={handleCreateRol}
              disabled={loading}
              style={{
                ...styles.button,
                marginTop: '12px',
                ...(loading ? styles.buttonDisabled : {})
              }}
              className={!loading ? "button-hover" : ""}
            >
              {loading ? "⏳ CREANDO..." : "➕ CREAR ROL"}
            </button>
          </div>

          {loading && roles.length === 0 ? (
            <div style={styles.loader}>
              <div style={styles.spinner}></div>
              <p>Cargando roles...</p>
            </div>
          ) : roles.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📋</div>
              <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff'}}>
                No hay roles registrados
              </h3>
              <p>Crea el primer rol para comenzar</p>
            </div>
          ) : (
            <div style={styles.rolesList}>
              {roles.map((rol, index) => (
                <div
                  key={rol.id_rol}
                  style={styles.roleItem}
                  className="role-hover"
                >
                  <div style={{
                    ...styles.roleIcon,
                    background: index === 0 ? 'linear-gradient(135deg, #a855f7, #9333ea)' :
                                index === 1 ? 'linear-gradient(135deg, #10b981, #059669)' :
                                'linear-gradient(135deg, #3b82f6, #2563eb)'
                  }}>
                    {index === 0 ? '👑' : index === 1 ? '🛡️' : '👤'}
                  </div>
                  <div style={styles.roleContent}>
                    <div style={styles.roleName}>{rol.nombre_rol}</div>
                    <div style={styles.roleDesc}>
                      {rol.descripcion || 'Sin descripción'}
                    </div>
                  </div>
                  <div style={styles.roleActions}>
                    <button
                      onClick={() => handleEditClick(rol)}
                      style={styles.iconBtn}
                      className="icon-btn-hover"
                      title="Editar rol"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteClick(rol)}
                      style={styles.iconBtn}
                      className="icon-btn-hover"
                      title="Eliminar rol"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditModal && editingRol && (
        <div style={styles.modal} onClick={() => setShowEditModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span>✏️</span>
              EDITAR ROL
            </div>
            
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', marginBottom: '8px', color: '#999999', fontSize: '14px'}}>
                Nombre del Rol
              </label>
              <input
                type="text"
                value={editingRol.nombre_rol}
                onChange={(e) => setEditingRol({...editingRol, nombre_rol: e.target.value})}
                style={styles.input}
                className="input-focus"
                disabled={loading}
              />
            </div>

            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', marginBottom: '8px', color: '#999999', fontSize: '14px'}}>
                Descripción
              </label>
              <textarea
                value={editingRol.descripcion}
                onChange={(e) => setEditingRol({...editingRol, descripcion: e.target.value})}
                style={styles.textarea}
                className="input-focus"
                disabled={loading}
              />
            </div>

            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingRol(null);
                }}
                disabled={loading}
                style={{
                  ...styles.button,
                  background: '#374151'
                }}
              >
                CANCELAR
              </button>
              <button
                onClick={handleUpdateRol}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.buttonSuccess,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                className={!loading ? "button-success-hover" : ""}
              >
                {loading ? "⏳ GUARDANDO..." : "💾 GUARDAR"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && deletingRol && (
        <div style={styles.modal} onClick={() => setShowDeleteModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span>⚠️</span>
              CONFIRMAR ELIMINACIÓN
            </div>
            
            <p style={{color: '#999999', marginBottom: '24px', lineHeight: '1.6'}}>
              ¿Estás seguro de que deseas eliminar el rol <strong style={{color: '#ffffff'}}>"{deletingRol.nombre_rol}"</strong>?
              <br/><br/>
              Esta acción no se puede deshacer.
            </p>

            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingRol(null);
                }}
                disabled={loading}
                style={{
                  ...styles.button,
                  background: '#374151'
                }}
              >
                CANCELAR
              </button>
              <button
                onClick={handleDeleteRol}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.buttonDanger,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                className={!loading ? "button-danger-hover" : ""}
              >
                {loading ? "⏳ ELIMINANDO..." : "🗑️ ELIMINAR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rol;