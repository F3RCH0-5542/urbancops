import { useEffect } from "react";

export default function Braves() {
  // --- Carrito ---
  const agregarAlCarrito = (nombre, precio, imagen) => {
    const carrito = JSON.parse(localStorage.getItem("carritoUrbanCops")) || [];
    carrito.push({ nombre, precio, imagen });
    localStorage.setItem("carritoUrbanCops", JSON.stringify(carrito));
    actualizarContadorCarrito();
  };

  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carritoUrbanCops")) || [];
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = carrito.length;
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  return (
    <>
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
                  <li><a className="dropdown-item" href="/braves">Atlanta Braves</a></li>
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

            {/* Buscador */}
            <form
              className="d-flex me-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Función de búsqueda en desarrollo");
              }}
            >
              <input
                id="barra-busqueda"
                className="form-control"
                type="search"
                placeholder="Buscar gorras..."
                aria-label="Buscar"
              />
            </form>

            {/* Usuario */}
            <a href="/login" className="btn text-white">
              <i className="bi bi-person"></i>
            </a>

            {/* Carrito */}
            <button
              className="btn text-white position-relative"
              onClick={() => (window.location.href = "/carrito")}
            >
              <i className="bi bi-cart"></i>
              <span
                id="contador-carrito"
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/img/Braves/Wall.jpg"
              className="d-block w-100"
              alt="Atlanta Braves"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Descripción */}
      <section className="container my-5 text-center">
        <h2>Atlanta Braves</h2>
        <p>
          Los Atlanta Braves son un equipo de béisbol profesional con sede en
          Atlanta, Georgia. Fundado en 1871, es uno de los equipos más antiguos
          de las Grandes Ligas. Con una rica historia y múltiples campeonatos,
          los Braves son símbolo de orgullo para su ciudad y tienen una gran
          base de fanáticos.
        </p>
      </section>

      {/* Productos */}
      <section className="container my-5 text-center">
        <div className="row justify-content-center mt-4">
          {[
            {
              nombre: "Atlanta Braves Classic Fit",
              precio: 95000,
              imagen: "/img/Braves/1-removebg-preview.png",
              desc: "Gorra New Era 59FIFTY de la colección NBA Classic.",
            },
            {
              nombre: "Atlanta Braves Heritage Line",
              precio: 92000,
              imagen: "/img/Braves/2-removebg-preview.png",
              desc: "Gorra con logotipo bordado y diseño premium.",
            },
            {
              nombre: "Atlanta Braves Night Game",
              precio: 98000,
              imagen: "/img/Braves/3-removebg-preview.png",
              desc: "Modelo clásico con detalles bordados oficiales.",
            },
            {
              nombre: "Atlanta Braves Retro Swing",
              precio: 95000,
              imagen: "/img/Braves/4-removebg-preview.png",
              desc: "Gorra New Era multi color.",
            },
            {
              nombre: "Atlanta Braves Southern Pride",
              precio: 92000,
              imagen: "/img/Braves/5-removebg-preview.png",
              desc: "Gorra con logotipo bordado y diseño premium.",
            },
            {
              nombre: "Atlanta Braves Bold Edition",
              precio: 98000,
              imagen: "/img/Braves/6-removebg-preview.png",
              desc: "Modelo clásico con detalles bordados oficiales.",
            },
            {
              nombre: "Atlanta Braves Street Style",
              precio: 95000,
              imagen: "/img/Braves/7-removebg-preview.png",
              desc: "Gorra New Era de la colección NBA Classic.",
            },
            {
              nombre: "Atlanta Braves Home Field",
              precio: 92000,
              imagen: "/img/Braves/8-removebg-preview.png",
              desc: "Gorra con logotipo bordado y diseño premium.",
            },
            {
              nombre: "Atlanta Braves Legacy Cap",
              precio: 98000,
              imagen: "/img/Braves/9-removebg-preview.png",
              desc: "Modelo clásico con detalles bordados oficiales.",
            },
          ].map((p, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="p-3 rounded text-dark-bg">
                <h3>{p.nombre}</h3>
                <img
                  src={p.imagen}
                  className="img-fluid my-2"
                  style={{ height: "100px", objectFit: "cover" }}
                  alt={p.nombre}
                />
                <p>{p.desc}</p>
                <p className="fw-bold">${p.precio.toLocaleString()} COP</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    agregarAlCarrito(p.nombre, p.precio, p.imagen)
                  }
                >
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
              <p>
                Gorras urbanas exclusivas con estilo auténtico. Representa tu
                equipo, tu barrio y tu esencia.
              </p>
              <div>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Enlaces Rápidos</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-white text-decoration-none">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/nba" className="text-white text-decoration-none">
                    NBA
                  </a>
                </li>
                <li>
                  <a href="/mlb" className="text-white text-decoration-none">
                    MLB
                  </a>
                </li>
                <li>
                  <a
                    href="/personalizadas"
                    className="text-white text-decoration-none"
                  >
                    Personalizadas
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Contacto</h5>
              <p>
                <i className="bi bi-envelope"></i> contacto@urbancops.com
              </p>
              <p>
                <i className="bi bi-phone"></i> +57 310 000 0000
              </p>
              <p>
                <i className="bi bi-geo-alt"></i> Bogotá, Colombia
              </p>
            </div>
          </div>
          <hr className="border-gray" />
          <div className="text-center small">
            &copy; 2025 UrbanCops. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
