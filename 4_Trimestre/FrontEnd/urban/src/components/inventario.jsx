import React, { useEffect, useState } from "react";
import { 
  listInventario, 
  createInventario, 
  updateInventario, 
  deleteInventario 
} from "../services/inventarioService";

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [formData, setFormData] = useState({
    id_personalizacion: "",
    stock: "",
    stock_minimo: "",
    precio_venta: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchInventario();
  }, []);

  const fetchInventario = async () => {
    setLoading(true);
    try {
      const data = await listInventario();
      setInventarios(data);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      alert("Error al cargar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("📝 ENVIANDO FORMULARIO");
    console.log("Modo:", editingId ? "EDITAR" : "CREAR");
    console.log("ID editando:", editingId);
    console.log("Datos:", formData);
    
    try {
      if (editingId) {
        console.log(`🔄 Actualizando inventario ID: ${editingId}`);
        const result = await updateInventario(editingId, formData);
        console.log("✅ Respuesta del servidor:", result);
        alert("Inventario actualizado correctamente");
        setEditingId(null);
      } else {
        console.log("➕ Creando nuevo inventario");
        await createInventario(formData);
        alert("Inventario creado correctamente");
      }
      
      setFormData({ 
        id_personalizacion: "", 
        stock: "", 
        stock_minimo: "", 
        precio_venta: "" 
      });
      setShowForm(false);
      await fetchInventario();
    } catch (error) {
      console.error("❌ ERROR AL GUARDAR:", error);
      alert(error.msg || "Error al guardar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    console.log("🔧 EDITANDO ITEM:", item);
    setFormData({
      id_personalizacion: item.id_personalizacion,
      stock: item.stock,
      stock_minimo: item.stock_minimo,
      precio_venta: item.precio_venta
    });
    setEditingId(item.id_inventario);
    setShowForm(true);
    console.log("✅ Formulario llenado, editingId:", item.id_inventario);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto del inventario?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteInventario(id);
      alert("Inventario eliminado correctamente");
      await fetchInventario();
    } catch (error) {
      console.error("Error al eliminar inventario:", error);
      alert(error.msg || "Error al eliminar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ 
      id_personalizacion: "", 
      stock: "", 
      stock_minimo: "", 
      precio_venta: "" 
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Calcular totales
  const totalStock = inventarios.reduce((sum, item) => sum + parseInt(item.stock || 0), 0);
  const valorTotalInventario = inventarios.reduce((sum, item) => 
    sum + (parseFloat(item.precio_venta || 0) * parseInt(item.stock || 0)), 0
  );
  const productosStockBajo = inventarios.filter(item => 
    parseInt(item.stock) <= parseInt(item.stock_minimo)
  ).length;

  return (
    <div className="bg-dark min-vh-100 py-4">
      <style>{`
        .bg-dark-card {
          background: #1a1d29;
          border: 1px solid #2d3142;
        }
        .bg-darker {
          background: #0f111a;
        }
        .text-muted-dark {
          color: #8892ab !important;
        }
        .btn-dark-custom {
          background: #2d3142;
          border: 1px solid #3d4152;
          color: #fff;
        }
        .btn-dark-custom:hover {
          background: #3d4152;
          border-color: #4d5162;
          color: #fff;
        }
        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
        }
        .stat-card-success {
          background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
        }
        .stat-card-info {
          background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
        }
        .stat-card-warning {
          background: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
        }
        .product-card {
          background: #1a1d29;
          border: 1px solid #2d3142;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          border-color: #667eea;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
        }
        .badge-stock-low {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .badge-stock-ok {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .form-control-dark {
          background: #0f111a;
          border: 1px solid #2d3142;
          color: #fff;
        }
        .form-control-dark:focus {
          background: #0f111a;
          border-color: #667eea;
          color: #fff;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .form-control-dark::placeholder {
          color: #5a607f;
        }
        .btn-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }
        .btn-gradient-primary:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
        }
        .btn-gradient-success {
          background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
          border: none;
          color: white;
        }
        .btn-gradient-success:hover {
          background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);
          color: white;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h2 className="text-white mb-1 fw-bold">
                  <i className="bi bi-box-seam me-2"></i>
                  Inventario
                </h2>
                <p className="text-muted-dark mb-0">Gestiona el stock de tus productos</p>
              </div>
              <button 
                className="btn btn-gradient-primary px-4"
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`bi ${showForm ? 'bi-x-circle' : 'bi-plus-circle'} me-2`}></i>
                {showForm ? 'Cancelar' : 'Nuevo Producto'}
              </button>
            </div>
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="bg-dark-card rounded-3 p-4 shadow">
                <h5 className="text-white mb-3 fw-bold">
                  <i className={`bi ${editingId ? 'bi-pencil-square' : 'bi-plus-square'} me-2`}></i>
                  {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6 col-lg-3">
                      <label className="form-label text-white fw-bold small">
                        <i className="bi bi-hash me-1"></i>ID Personalización
                      </label>
                      <input
                        type="number"
                        name="id_personalizacion"
                        value={formData.id_personalizacion}
                        onChange={handleChange}
                        className="form-control form-control-dark"
                        placeholder="Ej: 1"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                      <label className="form-label text-white fw-bold small">
                        <i className="bi bi-box me-1"></i>Stock Disponible
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="form-control form-control-dark"
                        placeholder="Ej: 50"
                        min="0"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                      <label className="form-label text-white fw-bold small">
                        <i className="bi bi-exclamation-triangle me-1"></i>Stock Mínimo
                      </label>
                      <input
                        type="number"
                        name="stock_minimo"
                        value={formData.stock_minimo}
                        onChange={handleChange}
                        className="form-control form-control-dark"
                        placeholder="Ej: 10"
                        min="0"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                      <label className="form-label text-white fw-bold small">
                        <i className="bi bi-currency-dollar me-1"></i>Precio
                      </label>
                      <input
                        type="number"
                        name="precio_venta"
                        value={formData.precio_venta}
                        onChange={handleChange}
                        className="form-control form-control-dark"
                        placeholder="25000"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="d-flex gap-2 flex-column flex-sm-row">
                        <button 
                          type="submit" 
                          className="btn btn-gradient-success flex-grow-1"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              {editingId ? 'Actualizando...' : 'Guardando...'}
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              {editingId ? 'Actualizar' : 'Guardar'}
                            </>
                          )}
                        </button>
                        {editingId && (
                          <button 
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-dark-custom"
                            disabled={loading}
                          >
                            <i className="bi bi-x-circle me-2"></i>
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card rounded-3 p-3 shadow">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <p className="mb-1 small opacity-75">Productos</p>
                  <h3 className="mb-0 fw-bold">{inventarios.length}</h3>
                </div>
                <i className="bi bi-box-seam" style={{fontSize: '2.5rem', opacity: 0.6}}></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card stat-card-success rounded-3 p-3 shadow">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <p className="mb-1 small opacity-75">Stock Total</p>
                  <h3 className="mb-0 fw-bold">{totalStock.toLocaleString()}</h3>
                </div>
                <i className="bi bi-boxes" style={{fontSize: '2.5rem', opacity: 0.6}}></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card stat-card-info rounded-3 p-3 shadow">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <p className="mb-1 small opacity-75">Valor Total</p>
                  <h3 className="mb-0 fw-bold">${(valorTotalInventario/1000).toFixed(0)}K</h3>
                </div>
                <i className="bi bi-cash-stack" style={{fontSize: '2.5rem', opacity: 0.6}}></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card stat-card-warning rounded-3 p-3 shadow">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <p className="mb-1 small opacity-75">Stock Bajo</p>
                  <h3 className="mb-0 fw-bold">{productosStockBajo}</h3>
                </div>
                <i className="bi bi-exclamation-triangle" style={{fontSize: '2.5rem', opacity: 0.6}}></i>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        {loading && !showForm ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted-dark">Cargando inventario...</p>
          </div>
        ) : inventarios.length === 0 ? (
          <div className="bg-dark-card rounded-3 p-5 text-center shadow">
            <i className="bi bi-inbox text-muted-dark" style={{fontSize: '4rem'}}></i>
            <p className="text-muted-dark mt-3 mb-3">No hay productos en inventario</p>
            <button 
              className="btn btn-gradient-primary"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Crear primer producto
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {inventarios.map((item) => {
              const stockBajo = parseInt(item.stock) <= parseInt(item.stock_minimo);
              const valorTotal = parseFloat(item.precio_venta) * parseInt(item.stock);
              
              return (
                <div key={item.id_inventario} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <div className="product-card p-3 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="badge bg-secondary mb-2">#{item.id_inventario}</span>
                        <h6 className="text-white mb-0">Personalización #{item.id_personalizacion}</h6>
                      </div>
                      <span className={`badge ${stockBajo ? 'badge-stock-low' : 'badge-stock-ok'}`}>
                        {stockBajo ? 'Stock Bajo' : 'Disponible'}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted-dark small">Stock:</span>
                        <span className="text-white fw-bold">{item.stock} unidades</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted-dark small">Stock mínimo:</span>
                        <span className="text-muted-dark">{item.stock_minimo}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted-dark small">Precio unitario:</span>
                        <span className="text-success fw-bold">${parseFloat(item.precio_venta).toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted-dark small">Valor total:</span>
                        <span className="text-info fw-bold">${valorTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-muted-dark small mb-3">
                      <i className="bi bi-clock me-1"></i>
                      {new Date(item.fecha_actualizacion).toLocaleDateString('es-CO')}
                    </div>

                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-warning flex-grow-1"
                        onClick={() => handleEdit(item)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item.id_inventario)}
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventario;