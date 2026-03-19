import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';

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
    maxWidth: '1400px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '24px'
  },
  card: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '32px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  cardDesc: {
    color: '#999999',
    fontSize: '14px',
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#999999',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    marginBottom: '12px'
  },
  toggleLabel: {
    fontSize: '14px',
    color: '#ffffff'
  },
  toggle: {
    width: '52px',
    height: '28px',
    background: '#222222',
    borderRadius: '14px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  toggleActive: {
    background: '#10b981'
  },
  toggleThumb: {
    width: '22px',
    height: '22px',
    background: '#ffffff',
    borderRadius: '50%',
    position: 'absolute',
    top: '3px',
    left: '3px',
    transition: 'all 0.3s'
  },
  toggleThumbActive: {
    left: '27px'
  },
  button: {
    background: '#64748b',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    textTransform: 'uppercase',
    width: '100%'
  },
  alert: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '24px'
  },
  alertWarning: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)'
  },
  alertSuccess: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  colorPicker: {
    width: '100%',
    height: '50px',
    border: '1px solid #222222',
    borderRadius: '6px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  }
};

export default function Configuracion() {
  const [settings, setSettings] = useState({
    siteName: 'URBAN CAPS',
    siteEmail: 'contacto@urbancaps.com',
    sitePhone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    description: 'Tienda especializada en gorras personalizadas y accesorios urbanos',
    currency: 'COP',
    timezone: 'America/Bogota',
    primaryColor: '#a855f7',
    secondaryColor: '#10b981',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceMode: false,
    registrationEnabled: true,
    guestCheckout: true,
    taxRate: 19,
    shippingCost: 10000,
    minOrderAmount: 30000,
    maxOrderAmount: 5000000
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({...prev, [field]: value}));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({...prev, [field]: !prev[field]}));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .back-hover:hover {
            background: #1a1a1a !important;
            border-color: #333333 !important;
          }
          .button-hover:hover {
            background: #475569 !important;
            transform: scale(1.02);
          }
          .input-focus:focus {
            border-color: #64748b !important;
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
            <span>⚙️</span>
            CONFIGURACIÓN DEL SISTEMA
          </h1>
          <p style={styles.subtitle}>
            Administra los parámetros generales del sistema
          </p>
        </div>

        {saved && (
          <div style={{...styles.alert, ...styles.alertSuccess}}>
            <Check size={20} color="#10b981" />
            <div>
              <strong style={{color: '#10b981'}}>Configuración guardada</strong>
              <p style={{color: '#999999', fontSize: '14px', margin: '4px 0 0 0'}}>
                Los cambios se han aplicado correctamente
              </p>
            </div>
          </div>
        )}

        <div style={styles.grid}>
          {/* Información General */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🏢 Información General
            </h2>
            <p style={styles.cardDesc}>
              Datos básicos de la empresa y contacto
            </p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre del Sitio</label>
              <input
                type="text"
                style={styles.input}
                className="input-focus"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Electrónico</label>
              <input
                type="email"
                style={styles.input}
                className="input-focus"
                value={settings.siteEmail}
                onChange={(e) => handleChange('siteEmail', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Teléfono</label>
              <input
                type="tel"
                style={styles.input}
                className="input-focus"
                value={settings.sitePhone}
                onChange={(e) => handleChange('sitePhone', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Dirección</label>
              <input
                type="text"
                style={styles.input}
                className="input-focus"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Descripción</label>
              <textarea
                style={styles.textarea}
                className="input-focus"
                value={settings.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </div>

          {/* Configuración Regional */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🌍 Configuración Regional
            </h2>
            <p style={styles.cardDesc}>
              Moneda, zona horaria y otros ajustes regionales
            </p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Moneda</label>
              <select
                style={styles.select}
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="COP">Peso Colombiano (COP)</option>
                <option value="USD">Dólar Americano (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="MXN">Peso Mexicano (MXN)</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Zona Horaria</label>
              <select
                style={styles.select}
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
              >
                <option value="America/Bogota">Bogotá (GMT-5)</option>
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/New_York">Nueva York (GMT-5)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Tasa de Impuesto (%)</label>
              <input
                type="number"
                style={styles.input}
                className="input-focus"
                value={settings.taxRate}
                onChange={(e) => handleChange('taxRate', Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Costo de Envío (COP)</label>
              <input
                type="number"
                style={styles.input}
                className="input-focus"
                value={settings.shippingCost}
                onChange={(e) => handleChange('shippingCost', Number(e.target.value))}
                min="0"
              />
            </div>
          </div>

          {/* Apariencia */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🎨 Apariencia
            </h2>
            <p style={styles.cardDesc}>
              Personaliza los colores del sistema
            </p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Color Primario</label>
              <input
                type="color"
                style={styles.colorPicker}
                value={settings.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
              />
              <p style={{color: '#999999', fontSize: '12px', marginTop: '8px'}}>
                Actual: {settings.primaryColor}
              </p>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Color Secundario</label>
              <input
                type="color"
                style={styles.colorPicker}
                value={settings.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
              />
              <p style={{color: '#999999', fontSize: '12px', marginTop: '8px'}}>
                Actual: {settings.secondaryColor}
              </p>
            </div>
          </div>

          {/* Notificaciones */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🔔 Notificaciones
            </h2>
            <p style={styles.cardDesc}>
              Configura las notificaciones del sistema
            </p>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('emailNotifications')}
            >
              <span style={styles.toggleLabel}>Notificaciones por Email</span>
              <div style={{
                ...styles.toggle,
                ...(settings.emailNotifications ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.emailNotifications ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('smsNotifications')}
            >
              <span style={styles.toggleLabel}>Notificaciones por SMS</span>
              <div style={{
                ...styles.toggle,
                ...(settings.smsNotifications ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.smsNotifications ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('pushNotifications')}
            >
              <span style={styles.toggleLabel}>Notificaciones Push</span>
              <div style={{
                ...styles.toggle,
                ...(settings.pushNotifications ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.pushNotifications ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>
          </div>

          {/* Opciones de Tienda */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🛒 Opciones de Tienda
            </h2>
            <p style={styles.cardDesc}>
              Configura el comportamiento de la tienda
            </p>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('registrationEnabled')}
            >
              <span style={styles.toggleLabel}>Permitir Registro de Usuarios</span>
              <div style={{
                ...styles.toggle,
                ...(settings.registrationEnabled ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.registrationEnabled ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('guestCheckout')}
            >
              <span style={styles.toggleLabel}>Permitir Compra como Invitado</span>
              <div style={{
                ...styles.toggle,
                ...(settings.guestCheckout ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.guestCheckout ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Pedido Mínimo (COP)</label>
              <input
                type="number"
                style={styles.input}
                className="input-focus"
                value={settings.minOrderAmount}
                onChange={(e) => handleChange('minOrderAmount', Number(e.target.value))}
                min="0"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Pedido Máximo (COP)</label>
              <input
                type="number"
                style={styles.input}
                className="input-focus"
                value={settings.maxOrderAmount}
                onChange={(e) => handleChange('maxOrderAmount', Number(e.target.value))}
                min="0"
              />
            </div>
          </div>

          {/* Sistema */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              🔧 Sistema
            </h2>
            <p style={styles.cardDesc}>
              Opciones avanzadas del sistema
            </p>

            <div style={{...styles.alert, ...styles.alertWarning}}>
              <AlertCircle size={20} color="#f59e0b" />
              <div>
                <strong style={{color: '#f59e0b'}}>Modo de Mantenimiento</strong>
                <p style={{color: '#999999', fontSize: '14px', margin: '4px 0 0 0'}}>
                  Al activarlo, el sitio no estará disponible para usuarios
                </p>
              </div>
            </div>

            <div 
              style={styles.toggleContainer}
              onClick={() => handleToggle('maintenanceMode')}
            >
              <span style={styles.toggleLabel}>Modo de Mantenimiento</span>
              <div style={{
                ...styles.toggle,
                ...(settings.maintenanceMode ? styles.toggleActive : {})
              }}>
                <div style={{
                  ...styles.toggleThumb,
                  ...(settings.maintenanceMode ? styles.toggleThumbActive : {})
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Guardar */}
        <div style={{marginTop: '32px', maxWidth: '400px', margin: '32px auto 0'}}>
          <button 
            style={styles.button} 
            className="button-hover"
            onClick={handleSave}
          >
            💾 GUARDAR CONFIGURACIÓN
          </button>
        </div>
      </div>
    </div>
  );
}