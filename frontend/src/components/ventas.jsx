import React, { useEffect, useState } from "react";
import { listVentas, createVenta, updateVenta, deleteVenta } from "../services/ventasService";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [newVenta, setNewVenta] = useState({ id_usuario: "", fecha: "" });
  const [editingVenta, setEditingVenta] = useState(null);
  const [deletingVenta, setDeletingVenta] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVentas();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchVentas = async () => {
    try {
      setLoading(true);
      const data = await listVentas(token);
      setVentas(data || []);
    } catch (err) {
      console.error("Error al obtener ventas:", err);
      setError("No se pudieron cargar las ventas");
      setVentas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVenta = async () => {
    if (!newVenta.id_usuario || !newVenta.fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await createVenta({
        id_usuario: parseInt(newVenta.id_usuario),
        fecha: newVenta.fecha
      }, token);
      
      await fetchVentas();
      setNewVenta({ id_usuario: "", fecha: "" });
      setSuccess("✅ Venta registrada exitosamente");
    } catch (err) {
      console.error("Error al crear venta:", err);
      setError("No se pudo registrar la venta");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVenta = async () => {
    if (!editingVenta.id_usuario || !editingVenta.fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await updateVenta(editingVenta.id_venta, {
        id_usuario: parseInt(editingVenta.id_usuario),
        fecha: editingVenta.fecha
      }, token);
      
      await fetchVentas();
      setEditingVenta(null);
      setSuccess("✅ Venta actualizada exitosamente");
    } catch (err) {
      console.error("Error al actualizar venta:", err);
      setError("No se pudo actualizar la venta");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenta = async () => {
    try {
      setLoading(true);
      setError("");
      await deleteVenta(deletingVenta.id_venta, token);
      
      await fetchVentas();
      setDeletingVenta(null);
      setSuccess("✅ Venta eliminada exitosamente");
    } catch (err) {
      console.error("Error al eliminar venta:", err);
      setError("No se pudo eliminar la venta");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{
        background: '#000',
        borderBottom: '1px solid #222',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/home" style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#fff',
            textDecoration: 'none'
          }}>
            URBAN CAPS
          </a>
          <a href="/home" style={{
            background: '#111',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            border: '1px solid #222'
          }}>
            ← Volver
          </a>
        </div>
      </nav>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <span>📊</span>
            GESTIÓN DE VENTAS
          </h1>
          <p style={{ color: '#999', fontSize: '16px' }}>
            Registra, edita y elimina ventas del sistema
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#111',
          border: '1px solid #222',
          borderRadius: '12px',
          padding: '32px'
        }}>
          {/* Alertas */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#ef4444', fontWeight: '600' }}>{error}</span>
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>{success}</span>
            </div>
          )}

          {/* Formulario Crear */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: '600' }}>
              ➕ Registrar Nueva Venta
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <input
                type="number"
                placeholder="ID Usuario"
                value={newVenta.id_usuario}
                onChange={(e) => setNewVenta({...newVenta, id_usuario: e.target.value})}
                disabled={loading}
                style={{
                  background: '#000',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="date"
                value={newVenta.fecha}
                onChange={(e) => setNewVenta({...newVenta, fecha: e.target.value})}
                disabled={loading}
                style={{
                  background: '#000',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleCreateVenta}
                disabled={loading}
                style={{
                  background: loading ? '#374151' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {loading ? "⏳ GUARDANDO..." : "💾 REGISTRAR"}
              </button>
            </div>
          </div>

          {/* Tabla */}
          {loading && ventas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <p>Cargando ventas...</p>
            </div>
          ) : ventas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
                No hay ventas registradas
              </h3>
              <p>Registra la primera venta para comenzar</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#000',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      background: '#1a1a1a',
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderBottom: '2px solid #222'
                    }}>
                      ID VENTA
                    </th>
                    <th style={{
                      background: '#1a1a1a',
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderBottom: '2px solid #222'
                    }}>
                      ID USUARIO
                    </th>
                    <th style={{
                      background: '#1a1a1a',
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderBottom: '2px solid #222'
                    }}>
                      FECHA
                    </th>
                    <th style={{
                      background: '#1a1a1a',
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderBottom: '2px solid #222'
                    }}>
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta) => (
                    <tr key={venta.id_venta}>
                      <td style={{
                        padding: '16px',
                        borderBottom: '1px solid #222'
                      }}>
                        #{venta.id_venta}
                      </td>
                      <td style={{
                        padding: '16px',
                        borderBottom: '1px solid #222'
                      }}>
                        👤 Usuario {venta.id_usuario}
                      </td>
                      <td style={{
                        padding: '16px',
                        borderBottom: '1px solid #222'
                      }}>
                        📅 {formatDate(venta.fecha)}
                      </td>
                      <td style={{
                        padding: '16px',
                        borderBottom: '1px solid #222'
                      }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setEditingVenta({...venta})}
                            style={{
                              background: '#111',
                              border: '1px solid #222',
                              borderRadius: '6px',
                              width: '36px',
                              height: '36px',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => setDeletingVenta(venta)}
                            style={{
                              background: '#111',
                              border: '1px solid #222',
                              borderRadius: '6px',
                              width: '36px',
                              height: '36px',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Editar */}
      {editingVenta && (
        <div style={{
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
        }} onClick={() => setEditingVenta(null)}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>✏️</span>
              EDITAR VENTA
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#999',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                ID Usuario
              </label>
              <input
                type="number"
                value={editingVenta.id_usuario}
                onChange={(e) => setEditingVenta({...editingVenta, id_usuario: e.target.value})}
                disabled={loading}
                style={{
                  background: '#000',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#999',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Fecha
              </label>
              <input
                type="date"
                value={editingVenta.fecha?.split('T')[0] || editingVenta.fecha}
                onChange={(e) => setEditingVenta({...editingVenta, fecha: e.target.value})}
                disabled={loading}
                style={{
                  background: '#000',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setEditingVenta(null)}
                disabled={loading}
                style={{
                  background: '#374151',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                CANCELAR
              </button>
              <button
                onClick={handleUpdateVenta}
                disabled={loading}
                style={{
                  background: loading ? '#374151' : '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {loading ? "⏳ GUARDANDO..." : "💾 GUARDAR"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {deletingVenta && (
        <div style={{
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
        }} onClick={() => setDeletingVenta(null)}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>⚠️</span>
              CONFIRMAR ELIMINACIÓN
            </h2>
            
            <p style={{ color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
              ¿Estás seguro de que deseas eliminar la venta <strong style={{ color: '#fff' }}>#{deletingVenta.id_venta}</strong>?
              <br/><br/>
              <strong style={{ color: '#ef4444' }}>Esta acción no se puede deshacer.</strong>
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setDeletingVenta(null)}
                disabled={loading}
                style={{
                  background: '#374151',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                CANCELAR
              </button>
              <button
                onClick={handleDeleteVenta}
                disabled={loading}
                style={{
                  background: loading ? '#374151' : '#ef4444',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
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

export default Ventas;