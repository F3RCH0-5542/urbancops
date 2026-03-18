import React, { useEffect, useState } from "react";

export default function Vegas() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Cargar carrito al iniciar
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("carritoUrbanCops")) || [];
    setCarrito(saved);
  }, []);

  // Guardar carrito en localStorage
  const agregarAlCarrito = (nombre, precio, imagen) => {
    const nuevo = [...carrito, { nombre, precio, imagen }];
    setCarrito(nuevo);
    localStorage.setItem("carritoUrbanCops", JSON.stringify(nuevo));
  };

  // Simula búsqueda
  const buscarGorra = (e) => {
    e.preventDefault();
    const rutas = {
      trucker: "/personalizadas",
      lakers: "/lakers",
      snapback: "/nba",
      vegas: "/vegas",
    };
    if (rutas[busqueda.toLowerCase()]) {
      window.location.href = rutas[busqueda.toLowerCase()];
    } else {
      alert("No se encontró la gorra. Intenta con: trucker, lakers, snapback...");
    }
  };

  const productos = [
    { nombre: "Vegas Raid Clásica Blanca", precio: 95000, imagen: "/img/vegas/blanca-removebg-preview.png", desc: "Blanca con visera plana y escudo frontal bordado." },
    { nombre: "Vegas Raid Black", precio: 92000, imagen: "/img/vegas/negra-removebg-preview.png", desc: "Negra con detalles en rojo y logotipo frontal en alto relieve." },
    { nombre: "Vegas Raid Premium Blanca", precio: 98000, imagen: "/img/vegas/blancaconnegra-removebg-preview.png", desc: "Blanca con detalles en negro y logo bordado en alto relieve." },
    { nombre: "Vegas Raid Negra y Blanca", precio: 95000, imagen: "/img/vegas/bonita-removebg-preview (1).png", desc: "Negra con panel blanco y bandera lateral bordada." },
    { nombre: "Vegas Raid Tricolor", precio: 92000, imagen: "/img/vegas/comogris-removebg-preview.png", desc: "Negra con visera blanca y detalles en rojo." },
    { nombre: "Vegas Raid Azul Hielo", precio: 98000, imagen: "/img/vegas/letras-removebg-preview.png", desc: "Tonos azul grisáceo con diseño moderno y escudo clásico." },
    { nombre: "Falcons Roja Clásica", precio: 95000, imagen: "/img/vegas/blancalogo-removebg-preview.png", desc: "Roja con visera plana y bordado frontal blanco." },
    { nombre: "Falcons Blanca con Rojo", precio: 92000, imagen: "/img/vegas/3x-removebg-preview.png", desc: "Panel frontal blanco, visera gris y detalles rojos." },
    { nombre: "Falcons Gris Hormada", precio: 98000, imagen: "/img/vegas/amarillo-removebg-preview.png", desc: "Gris texturizada con logo bordado y estructura firme." },
  ];

  return (
    <div>
      {/* Navbar */}
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
                <a className="nav-link dropdown-toggle fw-bold" href="#" data-bs-toggle="dropdown">
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
                <a className="nav-link dropdown-toggle fw-bold" href="#" data-bs-toggle="dropdown">
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
                <a className="nav-link dropdown-toggle fw-bold" href="#" data-bs-toggle="dropdown">
                  MLB
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/red">Boston Red Sox</a></li>
                  <li><a className="dropdown-item" href="/white">Chicago White Sox</a></li>
                  <li><a className="dropdown-item" href="/braves">Atlanta Braves</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link fw-bold" href="/personalizacion">Personalizadas</a></li>
              <li className="nav-item"><a className="nav-link fw-bold" href="/pqrs">PQRS</a></li>
            </ul>

            <form className="d-flex me-3" onSubmit={buscarGorra}>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar gorras..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </form>

            <a href="/login" className="btn text-white"><i className="bi bi-person"></i></a>
            <button
              className="btn text-white position-relative"
              onClick={() => (window.location.href = "/carrito")}
            >
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carrito.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/vegas/raiders-logo-wazxzw84pfd1a499.jpg" className="d-block w-100" alt="Raiders" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Descripción */}
      <section className="container my-5 text-center">
        <h2>Las Vegas Raiders</h2>
        <p>
          Los Las Vegas Raiders son sinónimo de rebeldía, pasión y un legado de éxito en la NFL.
          Con su icónico logo de pirata, el equipo representa una mentalidad audaz y un estilo que
          se ha convertido en un emblema global de la cultura urbana.
        </p>
      </section>

      {/* Productos */}
      <section className="container my-5 text-center">
        <div className="row justify-content-center mt-4">
          {productos.map((p, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="p-3 rounded text-dark-bg">
                <h3>{p.nombre}</h3>
                <img src={p.imagen} alt={p.nombre} className="img-fluid my-2" style={{ height: "100px", objectFit: "cover" }} />
                <p>{p.desc}</p>
                <p className="fw-bold">${p.precio.toLocaleString()} COP</p>
                <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(p.nombre, p.precio, p.imagen)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">UrbanCops</h5>
              <p>Gorras urbanas exclusivas con estilo auténtico. Representa tu equipo, tu barrio y tu esencia.</p>
              <div>
                <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-whatsapp"></i></a>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Enlaces Rápidos</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
                <li><a href="/nba" className="text-white text-decoration-none">NBA</a></li>
                <li><a href="/mlb" className="text-white text-decoration-none">MLB</a></li>
                <li><a href="/personalizadas" className="text-white text-decoration-none">Personalizadas</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Contacto</h5>
              <p><i className="bi bi-envelope"></i> contacto@urbancops.com</p>
              <p><i className="bi bi-phone"></i> +57 310 000 0000</p>
              <p><i className="bi bi-geo-alt"></i> Bogotá, Colombia</p>
            </div>
          </div>
          <hr className="border-gray" />
          <div className="text-center small">&copy; 2025 UrbanCops. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
