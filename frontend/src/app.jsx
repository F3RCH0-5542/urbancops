import React, { useEffect, useState } from 'react';

function App() {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    actualizarContadorCarrito();
    cargarUsuario();
  }, []);

  const cargarUsuario = () => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      setUsuario(JSON.parse(usuarioLogueado));
    }
  };

  const cerrarSesion = () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      localStorage.removeItem('usuarioLogueado');
      localStorage.removeItem('token');
      localStorage.removeItem('carritoUrbanCops');
      globalThis.location.href = '/';
    }
  };

  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carritoUrbanCops')) || [];
    setContadorCarrito(carrito.length);
  };

  const agregarAlCarrito = (id_producto, nombre, precio, imagen) => {
    const token = localStorage.getItem('token');
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    if (!token || !usuarioLogueado) {
      alert('⚠️ Debes iniciar sesión para agregar productos al carrito');
      globalThis.location.href = '/login';
      return;
    }

    const carrito = JSON.parse(localStorage.getItem('carritoUrbanCops')) || [];
    carrito.push({ id_producto, nombre, precio, imagen, cantidad: 1 });
    localStorage.setItem('carritoUrbanCops', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert('✅ ¡Producto agregado al carrito!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && busqueda.trim()) {
      globalThis.location.href = `/busqueda?q=${encodeURIComponent(busqueda)}`;
    }
  };

  return (
    <>
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
                <button
                  className="nav-link dropdown-toggle fw-bold btn btn-link p-0 text-white text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  NBA
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/chicago">Chicago Bulls</a></li>
                  <li><a className="dropdown-item" href="/boston">Boston Celtics</a></li>
                  <li><a className="dropdown-item" href="/lakers">Los Angeles Lakers</a></li>
                </ul>
              </li>

              {/* NFL */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle fw-bold btn btn-link p-0 text-white text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  NFL
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/falcon">Atlanta Falcons</a></li>
                  <li><a className="dropdown-item" href="/arizona">Arizona Cardinals</a></li>
                  <li><a className="dropdown-item" href="/vegas">Las Vegas Raiders</a></li>
                </ul>
              </li>

              {/* MLB */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle fw-bold btn btn-link p-0 text-white text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  MLB
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/red">Boston Red Sox</a></li>
                  <li><a className="dropdown-item" href="/white">Chicago White Sox</a></li>
                  <li><a className="dropdown-item" href="/atlanta">Atlanta Braves</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-bold" href="/personalizacion">Personalizadas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/pqrs">PQRS</a>
              </li>
            </ul>

            {/* BUSCADOR */}
            <div className="d-flex me-3">
              <input
                id="barra-busqueda"
                className="form-control"
                type="search"
                placeholder="Buscar gorras..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            {usuario ? (
              <>
                <a
                  href="/mi-cuenta"
                  className="btn text-white me-2 d-flex align-items-center gap-1"
                  title="Mi Cuenta"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-person-circle" style={{ fontSize: 20 }}></i>
                  <span style={{ fontSize: 14 }}>{usuario.nombre.split(' ')[0]}</span>
                </a>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={cerrarSesion}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
              </>
            ) : (
              <a href="/login" className="btn text-white me-2">
                <i className="bi bi-person"></i> Iniciar Sesión
              </a>
            )}

            {/* CARRITO */}
            <button
              className="btn text-white position-relative"
              onClick={() => (globalThis.location.href = '/carrito')}
            >
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {contadorCarrito}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* CARRUSEL PRINCIPAL */}
      <div className="container-fluid p-0">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/Containera.webp" className="d-block w-100" alt="Slide 1" style={{ height: 500, objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src="/img/containerb.webp" className="d-block w-100" alt="Slide 2" style={{ height: 500, objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src="/img/Contanerc.webp" className="d-block w-100" alt="Slide 3" style={{ height: 500, objectFit: 'cover' }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN NBA */}
      <section className="container my-5 text-center">
        <h2>NBA</h2>
        <p>Explora nuestra colección de gorras oficiales de la NBA.</p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Chicago Bulls</h3>
              <img src="/img/chicago.png" className="img-fluid my-2" alt="Chicago" style={{ height: 100, objectFit: 'cover' }} />
              <p>Gorra New Era 59FIFTY de la colección NBA Classic.</p>
              <p className="fw-bold">$95.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(1, 'Chicago Bulls', 95000, '/img/chicago.png')}>Agregar al carrito</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Boston Celtics</h3>
              <img src="/img/Raiders12.png" className="img-fluid my-2" alt="Boston" style={{ height: 100, objectFit: 'cover' }} />
              <p>Gorra con logotipo bordado y diseño premium.</p>
              <p className="fw-bold">$92.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(2, 'Boston Celtics', 92000, '/img/Adobe-Express-file.png')}>Agregar al carrito</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Los Angeles Lakers</h3>
              <img src="/img/Lakers12.png" className="img-fluid my-2" alt="Lakers" style={{ height: 100, objectFit: 'cover' }} />
              <p>Modelo clásico con detalles bordados oficiales.</p>
              <p className="fw-bold">$98.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(3, 'Los Angeles Lakers', 98000, '/img/Lakers12.png')}>Agregar al carrito</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN NFL */}
      <section className="container my-5 text-center">
        <h2>NFL</h2>
        <p>Explora nuestra colección de gorras oficiales de la NFL.</p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Atlanta Falcons</h3>
              <img src="/img/Atlanta12.png" className="img-fluid my-2" alt="Atlanta" style={{ height: 100, objectFit: 'cover' }} />
              <p>Gorra New Era 59FIFTY de la colección Classic.</p>
              <p className="fw-bold">$95.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(4, 'Atlanta Falcons', 95000, '/img/Atlanta12.png')}>Agregar al carrito</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Arizona Cardinals</h3>
              <img src="/img/Arizona12.png" className="img-fluid my-2" alt="Arizona" style={{ height: 100, objectFit: 'cover' }} />
              <p>Gorra con logotipo bordado y diseño premium.</p>
              <p className="fw-bold">$92.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(5, 'Arizona Cardinals', 92000, '/img/Arizona12.png')}>Agregar al carrito</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-3 rounded text-dark-bg">
              <h3>Las Vegas Raiders</h3>
              <img src="/img/Raiders12.png" className="img-fluid my-2" alt="Raiders" style={{ height: 100, objectFit: 'cover' }} />
              <p>Modelo clásico con detalles bordados oficiales.</p>
              <p className="fw-bold">$98.000 COP</p>
              <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(6, 'Las Vegas Raiders', 98000, '/img/Raiders12.png')}>Agregar al carrito</button>
            </div>
          </div>
        </div>
      </section>

      {/* COLECCIONES DESTACADAS */}
      <div className="container my-4">
        <h2 className="text-center mb-4">Colecciones Destacadas</h2>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <a href="/categorias"><img src="/img/sti.webp" alt="Imagen 1" className="img-fluid my-2" style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 10 }} /></a>
          </div>
          <div className="col">
            <a href="/categorias"><img src="/img/NIgga.webp" alt="Imagen 2" className="img-fluid my-2" style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 10 }} /></a>
          </div>
          <div className="col">
            <a href="/categorias"><img src="/img/blanco.webp" alt="Imagen 3" className="img-fluid my-2" style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 10 }} /></a>
          </div>
          <div className="col">
            <a href="/categorias"><img src="/img/rap.webp" alt="Imagen 4" className="img-fluid my-2" style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 10 }} /></a>
          </div>
        </div>
      </div>

      {/* CARRUSEL 2 */}
      <section className="container my-5 text-center">
        <div id="carouselFooter" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/An-Assortment-of-Baseball-Hats-Displayed-on-Shelves_2468753_wh860.png" className="d-block w-100" alt="Slide 1" style={{ height: 400, objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src="/img/image_79235f70-f04a-433c-bd7e-4978de0eec57.jpg" className="d-block w-100" alt="Slide 2" style={{ height: 400, objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src="/img/desktop-wallpaper-colourful-caps-caps.jpg" className="d-block w-100" alt="Slide 3" style={{ height: 400, objectFit: 'cover' }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselFooter" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselFooter" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      {/* ===== BANNER DESCARGA APP ===== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0f3460 100%)',
          padding: '70px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Círculos decorativos de fondo */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 350, height: 350, borderRadius: '50%',
          background: 'rgba(229,57,53,0.07)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -50, left: -50,
          width: 250, height: 250, borderRadius: '50%',
          background: 'rgba(229,57,53,0.05)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.02)', pointerEvents: 'none',
        }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Etiqueta superior */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(229,57,53,0.18)',
            border: '1px solid rgba(229,57,53,0.35)',
            borderRadius: 20,
            padding: '5px 18px',
            marginBottom: 20,
          }}>
            <span style={{ color: '#ff6b6b', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              📱 App Oficial — Android
            </span>
          </div>

          {/* Título */}
          <h2 style={{
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            marginBottom: 14,
            lineHeight: 1.2,
          }}>
            Lleva <span style={{ color: '#e53935' }}>UrbanCops</span> en tu bolsillo
          </h2>

          {/* Subtítulo */}
          <p style={{
            color: '#9aa3b0',
            fontSize: 17,
            maxWidth: 500,
            margin: '0 auto 16px',
            lineHeight: 1.6,
          }}>
            Compra tus gorras favoritas desde tu celular Android. Rápido, fácil y seguro.
          </p>

          {/* Info versión */}
          <p style={{ color: '#555e6e', fontSize: 13, marginBottom: 36 }}>
            <span style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 10, marginRight: 8 }}>v1.0.0</span>
            <span style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 10, marginRight: 8 }}>70.3 MB</span>
            <span style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 10 }}>Android</span>
          </p>

          {/* Botón de descarga */}
          <a
            href="/app-release.apk"
            download="UrbanCops-v1.0.0.apk"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'linear-gradient(135deg, #e53935, #c62828)',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: 50,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 18,
              boxShadow: '0 6px 30px rgba(229,57,53,0.45)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(229,57,53,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(229,57,53,0.45)';
            }}
          >
            <i className="bi bi-android2" style={{ fontSize: 24 }}></i>
            Descargar APK
          </a>

          {/* Nota de instalación */}
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 20 }}>
            <i className="bi bi-info-circle me-1"></i>
            Habilita "Fuentes desconocidas" en Ajustes → Seguridad antes de instalar
          </p>
        </div>
      </section>
      {/* ===== FIN BANNER DESCARGA APP ===== */}

      {/* FOOTER */}
      <footer className="bg-black text-white pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">UrbanCops</h5>
              <p>Gorras urbanas exclusivas con estilo auténtico. Representa tu equipo, tu barrio y tu esencia.</p>
              <div>
                <button
                  className="btn text-white me-3 p-0 border-0 bg-transparent"
                  aria-label="Facebook"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                >
                  <i className="bi bi-facebook"></i>
                </button>
                <button
                  className="btn text-white me-3 p-0 border-0 bg-transparent"
                  aria-label="Instagram"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  <i className="bi bi-instagram"></i>
                </button>
                <button
                  className="btn text-white p-0 border-0 bg-transparent"
                  aria-label="WhatsApp"
                  onClick={() => window.open('https://wa.me/573100000000', '_blank')}
                >
                  <i className="bi bi-whatsapp"></i>
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Enlaces Rápidos</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
                <li><a href="/categorias" className="text-white text-decoration-none">Categorías</a></li>
                <li><a href="#nba" className="text-white text-decoration-none">NBA</a></li>
                <li><a href="#mlb" className="text-white text-decoration-none">MLB</a></li>
                <li><a href="/personalizacion" className="text-white text-decoration-none">Personalizadas</a></li>
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
          <div className="text-center small">
            &copy; {new Date().getFullYear()} UrbanCops. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;