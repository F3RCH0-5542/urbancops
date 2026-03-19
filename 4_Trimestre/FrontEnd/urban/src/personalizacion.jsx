import React, { useEffect, useState } from "react";

export default function Personalizadas() {
  const [carrito, setCarrito] = useState([]);

 
  useEffect(() => {
    const carritoGuardado =
      JSON.parse(localStorage.getItem("carritoUrbanCops")) || [];
    setCarrito(carritoGuardado);
  }, []);


  const manejarEnvio = (e) => {
    e.preventDefault();
    alert("🎨 Tu personalización ha sido guardada (simulado).");
    e.target.reset();
  };

  return (
    <div className="bg-dark text-light">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg shadow-sm sticky-top bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/img/logo12.png" alt="UrbanCops" width="40" />
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarGorras"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarGorras">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* NBA */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  NBA
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/chicago">Chicago Bulls</a></li>
                  <li><a className="dropdown-item" href="/boston">Boston Celtics</a></li>
                  <li><a className="dropdown-item" href="/lakers">Los Angeles Lakers</a></li>
                </ul>
              </li>
              {/* NFL */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  NFL
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/falcon">Atlanta Falcons</a></li>
                  <li><a className="dropdown-item" href="/arizona">Arizona Cardinals</a></li>
                  <li><a className="dropdown-item" href="/vegas">Las Vegas Raiders</a></li>
                </ul>
              </li>
              {/* MLB */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  MLB
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/red">Boston Red Sox</a></li>
                  <li><a className="dropdown-item" href="/white">Chicago White Sox</a></li>
                  <li><a className="dropdown-item" href="/atlanta">Atlanta Braves</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/personalizacion">
                  Personalizadas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/pqrs">
                  PQRS
                </a>
              </li>
            </ul>
            <form className="d-flex me-3">
              <input
                id="barra-busqueda"
                className="form-control"
                type="search"
                placeholder="Buscar gorras..."
                aria-label="Buscar"
              />
            </form>
            <a href="/login" className="btn text-white">
              <i className="bi bi-person"></i>
            </a>
            <button
              className="btn text-white position-relative"
              onClick={() => (window.location.href = "/carrito")}
            >
              <i className="bi bi-cart"></i>
              <span
                id="contador-carrito"
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {carrito.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* FORMULARIO PERSONALIZACIÓN */}
      <section className="container my-5">
        <h2 className="text-center mb-4 text-white">Personaliza tu Gorra</h2>
        <form
          className="formulario-personalizado bg-white text-dark p-4 rounded shadow-lg"
          onSubmit={manejarEnvio}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tipo de Gorra:</label>
              <input
                type="text"
                className="form-control bg-white text-dark border-secondary"
                placeholder="Ej. Snapback, Trucker..."
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Diseño:</label>
              <input
                type="text"
                className="form-control bg-white text-dark border-secondary"
                placeholder="Nombre o logotipo"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Color:</label>
              <input
                type="color"
                className="form-control form-control-color"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Talla:</label>
              <select className="form-select bg-white text-dark border-secondary">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Cliente:</label>
              <input
                type="text"
                className="form-control bg-white text-dark border-secondary"
                placeholder="Tu nombre o usuario"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-outline-primary px-5">
              Guardar Personalización
            </button>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-light pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row gy-4 text-center text-md-start">
            <div className="col-md-4">
              <h5 className="fw-bold text-white">Contacto</h5>
              <p><i className="bi bi-envelope me-2"></i> contacto@urbancops.com</p>
              <p><i className="bi bi-telephone me-2"></i> +57 318 71661793</p>
              <p><i className="bi bi-geo-alt me-2"></i> Bogotá, Colombia</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold text-white">Navegación</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-light text-decoration-none">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/carrito" className="text-light text-decoration-none">
                    Carrito
                  </a>
                </li>
                <li>
                  <a
                    href="/personalizadas"
                    className="text-light text-decoration-none"
                  >
                    Personalizadas
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold text-white">Síguenos</h5>
              <a href="#" className="text-light fs-4 me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-4 me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>
          <hr className="border-top border-secondary mt-4" />
          <div className="text-center small text-secondary">
            &copy; 2025 UrbanCops. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
