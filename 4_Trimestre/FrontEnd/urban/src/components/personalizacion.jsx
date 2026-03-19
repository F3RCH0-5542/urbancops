import React, { useState, useEffect } from 'react';
import { listPersonalizaciones, createPersonalizacion, updatePersonalizacion, deletePersonalizacion } from '../services/personalizacionService';

const Personalizacion = () => {
  const [personalizaciones, setPersonalizaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [idPedido, setIdPedido] = useState('');
  const [tipoPersonalizacion, setTipoPersonalizacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoAdicional, setCostoAdicional] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPersonalizaciones();
  }, []);

  const fetchPersonalizaciones = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listPersonalizaciones();
      setPersonalizaciones(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.msg || "Error al cargar personalizaciones");
      setPersonalizaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    
    if (!tipoPersonalizacion || !descripcion) {
      setError("Los campos Tipo y Descripción son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = {
        id_pedido: idPedido ? parseInt(idPedido) : null,
        tipo_personalizacion: tipoPersonalizacion,
        descripcion: descripcion.trim(),
        costo_adicional: costoAdicional ? parseFloat(costoAdicional) : 0
      };

      if (isEditing) {
        await updatePersonalizacion(editingId, data);
        setSuccess("¡Personalización actualizada exitosamente!");
      } else {
        await createPersonalizacion(data);
        setSuccess("¡Personalización creada exitosamente!");
      }
      
      await fetchPersonalizaciones();
      limpiarFormulario();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.msg || "Error al gestionar personalización");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (pers) => {
    setIsEditing(true);
    setEditingId(pers.id_personalizacion);
    setIdPedido(pers.id_pedido?.toString() || '');
    setTipoPersonalizacion(pers.tipo_personalizacion);
    setDescripcion(pers.descripcion);
    setCostoAdicional(pers.costo_adicional?.toString() || '');
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('🗑️ Intentando eliminar personalización ID:', deletingId);
      await deletePersonalizacion(deletingId);
      setSuccess("¡Personalización eliminada exitosamente!");
      await fetchPersonalizaciones();
      setTimeout(() => setSuccess(false), 3000);
      setShowDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      console.error('❌ Error completo al eliminar:', err);
      console.error('❌ Status:', err.status);
      console.error('❌ Mensaje:', err.msg);
      
      // Mostrar mensaje de error más detallado
      if (err.status === 500) {
        setError(`Error del servidor: ${err.msg || 'No se pudo eliminar la personalización. Puede que tenga relaciones con otros registros.'}`);
      } else if (err.status === 404) {
        setError("La personalización no existe o ya fue eliminada.");
      } else if (err.status === 403) {
        setError("No tienes permisos para eliminar esta personalización.");
      } else {
        setError(err.msg || "Error al eliminar personalización");
      }
      
      // No cerrar el modal si hay error para que el usuario vea el mensaje
      setShowDeleteModal(false);
      setDeletingId(null);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const limpiarFormulario = () => {
    setIdPedido('');
    setTipoPersonalizacion('');
    setDescripcion('');
    setCostoAdicional('');
    setIsEditing(false);
    setEditingId(null);
    setShowEditModal(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPersonalizaciones = personalizaciones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(personalizaciones.length / itemsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "#1e293b",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
        }}>
          <h1 style={{
            margin: "0 0 8px 0",
            fontSize: "32px",
            fontWeight: "700",
            color: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            🎨 Personalizaciones
          </h1>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "16px" }}>
            Crea y gestiona tus diseños personalizados
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div style={{
            background: "#7f1d1d",
            border: "1px solid #991b1b",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "24px",
            color: "#fecaca",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ fontSize: "24px" }}>⚠️</span>
            <span style={{ fontWeight: "500" }}>{error}</span>
          </div>
        )}

        {success && (
          <div style={{
            background: "#064e3b",
            border: "1px solid #065f46",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "24px",
            color: "#6ee7b7",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ fontSize: "24px" }}>✅</span>
            <span style={{ fontWeight: "500" }}>{success}</span>
          </div>
        )}

        {/* Lista de Personalizaciones */}
        <div style={{
          background: "#1e293b",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{
            margin: "0 0 24px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#f1f5f9"
          }}>
            📋 Mis Personalizaciones
          </h2>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
              <p style={{ margin: 0, fontSize: "16px" }}>Cargando...</p>
            </div>
          ) : personalizaciones.length > 0 ? (
            <>
              <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                {currentPersonalizaciones.map((pers) => (
                  <div 
                    key={pers.id_personalizacion}
                    style={{
                      background: "#334155",
                      borderRadius: "12px",
                      padding: "20px",
                      borderLeft: "4px solid #8b5cf6"
                    }}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                      flexWrap: "wrap",
                      gap: "12px"
                    }}>
                      <div>
                        <h3 style={{
                          margin: "0 0 8px 0",
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#f1f5f9"
                        }}>
                          🎨 {pers.tipo_personalizacion}
                        </h3>
                        <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#94a3b8" }}>
                          <strong>ID:</strong> #{pers.id_personalizacion} | <strong>Pedido:</strong> #{pers.id_pedido || 'N/A'}
                        </p>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap"
                      }}>
                        <div style={{
                          background: "#10b981",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "700"
                        }}>
                          {formatCurrency(pers.costo_adicional || 0)}
                        </div>
                        <button
                          onClick={() => handleEditClick(pers)}
                          style={{
                            padding: "8px 16px",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => openDeleteModal(pers.id_personalizacion)}
                          style={{
                            padding: "8px 16px",
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <p style={{
                      margin: 0,
                      color: "#cbd5e1",
                      fontSize: "15px",
                      lineHeight: "1.6"
                    }}>
                      {pers.descripcion}
                    </p>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "24px",
                  borderTop: "1px solid #334155"
                }}>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    style={{
                      padding: "10px 16px",
                      background: currentPage === 1 ? "#475569" : "#64748b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    ← Anterior
                  </button>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            style={{
                              padding: "10px 14px",
                              background: currentPage === pageNumber ? "#8b5cf6" : "#334155",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: "600",
                              cursor: "pointer",
                              minWidth: "40px"
                            }}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return <span key={pageNumber} style={{ color: "#64748b", padding: "10px 4px" }}>...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "10px 16px",
                      background: currentPage === totalPages ? "#475569" : "#64748b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                    }}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
              <p style={{ margin: 0, fontSize: "16px" }}>No hay personalizaciones registradas</p>
            </div>
          )}
        </div>

        {/* Formulario Crear */}
        {!isEditing && (
          <div style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "24px",
              fontWeight: "600",
              color: "#f1f5f9"
            }}>
              ➕ Nueva Personalización
            </h2>
            
            <form onSubmit={handleCreateOrUpdate}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>ID del Pedido</label>
                  <input
                    type="number"
                    value={idPedido}
                    onChange={(e) => setIdPedido(e.target.value)}
                    placeholder="Número de pedido"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>Tipo *</label>
                  <input
                    type="text"
                    value={tipoPersonalizacion}
                    onChange={(e) => setTipoPersonalizacion(e.target.value)}
                    placeholder="Ej: Bordado, Estampado"
                    required
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>Costo Adicional</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={costoAdicional}
                    onChange={(e) => setCostoAdicional(e.target.value)}
                    placeholder="0.00"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#cbd5e1"
                }}>Descripción *</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe detalladamente tu personalización..."
                  required
                  rows="4"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #334155",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#f1f5f9",
                    background: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: loading ? "#475569" : "#8b5cf6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? "⏳ Procesando..." : "✨ Crear Personalización"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
          overflowY: "auto"
        }}>
          <div style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "800px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}>
              <h3 style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                color: "#f1f5f9"
              }}>
                ✏️ Editar Personalización #{editingId}
              </h3>
              <button
                onClick={limpiarFormulario}
                style={{
                  padding: "8px 12px",
                  background: "transparent",
                  color: "#94a3b8",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>ID del Pedido</label>
                  <input
                    type="number"
                    value={idPedido}
                    onChange={(e) => setIdPedido(e.target.value)}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>Tipo *</label>
                  <input
                    type="text"
                    value={tipoPersonalizacion}
                    onChange={(e) => setTipoPersonalizacion(e.target.value)}
                    required
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#cbd5e1"
                  }}>Costo Adicional</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={costoAdicional}
                    onChange={(e) => setCostoAdicional(e.target.value)}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #334155",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#f1f5f9",
                      background: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#cbd5e1"
                }}>Descripción *</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  rows="4"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #334155",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#f1f5f9",
                    background: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: loading ? "#475569" : "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "⏳ Actualizando..." : "💾 Actualizar"}
                </button>
                <button 
                  type="button"
                  onClick={limpiarFormulario}
                  style={{
                    padding: "16px 32px",
                    background: "#64748b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
          }}>
            <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "20px" }}>⚠️</div>
            <h3 style={{
              margin: "0 0 16px 0",
              fontSize: "24px",
              fontWeight: "700",
              color: "#f1f5f9",
              textAlign: "center"
            }}>
              ¿Confirmar eliminación?
            </h3>
            <p style={{
              margin: "0 0 32px 0",
              color: "#94a3b8",
              fontSize: "16px",
              textAlign: "center"
            }}>
              Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingId(null);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#64748b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personalizacion;