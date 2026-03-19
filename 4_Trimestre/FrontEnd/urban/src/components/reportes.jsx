import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  filterCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px'
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#999999',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  input: {
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none'
  },
  select: {
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '6px',
    padding: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer'
  },
  button: {
    background: '#a855f7',
    color: 'white',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    textTransform: 'uppercase'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  },
  statCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '24px'
  },
  statValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  statLabel: {
    color: '#999999',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  chartCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderLeft: '4px solid #a855f7',
    paddingLeft: '16px'
  },
  tabsContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    borderBottom: '1px solid #222222',
    paddingBottom: '0'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    color: '#999999',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s'
  },
  activeTab: {
    color: '#ffffff',
    borderBottom: '3px solid #a855f7'
  },
  exportBtn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

export default function Reportes() {
  const [activeTab, setActiveTab] = useState('ventas');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');

  // Datos de ejemplo para gráficos
  const ventasData = [
    { mes: 'Ene', ventas: 45000, pedidos: 120 },
    { mes: 'Feb', ventas: 52000, pedidos: 145 },
    { mes: 'Mar', ventas: 48000, pedidos: 130 },
    { mes: 'Abr', ventas: 61000, pedidos: 165 },
    { mes: 'May', ventas: 55000, pedidos: 150 },
    { mes: 'Jun', ventas: 67000, pedidos: 180 },
    { mes: 'Jul', ventas: 72000, pedidos: 195 },
    { mes: 'Ago', ventas: 68000, pedidos: 185 },
    { mes: 'Sep', ventas: 75000, pedidos: 200 },
    { mes: 'Oct', ventas: 80000, pedidos: 220 },
    { mes: 'Nov', ventas: 85000, pedidos: 230 },
    { mes: 'Dic', ventas: 95000, pedidos: 260 }
  ];

  const productosData = [
    { nombre: 'Gorra Classic', value: 350 },
    { nombre: 'Gorra Snapback', value: 280 },
    { nombre: 'Gorra Trucker', value: 220 },
    { nombre: 'Gorra Dad Hat', value: 180 },
    { nombre: 'Gorra 5-Panel', value: 120 }
  ];

  const COLORS = ['#a855f7', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const inventarioData = [
    { categoria: 'Gorras', stock: 850, minimo: 200 },
    { categoria: 'Personalizadas', stock: 320, minimo: 100 },
    { categoria: 'Accesorios', stock: 450, minimo: 150 },
    { categoria: 'Edición Limitada', stock: 95, minimo: 50 }
  ];

  const handleGenerateReport = () => {
    alert(`Generando reporte de ${activeTab} desde ${dateFrom} hasta ${dateTo}`);
  };

  const handleExport = (format) => {
    alert(`Exportando reporte en formato ${format}`);
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
            background: #9333ea !important;
            transform: scale(1.02);
          }
          .export-hover:hover {
            background: #059669 !important;
            transform: scale(1.02);
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
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
            <span>📈</span>
            REPORTES Y ESTADÍSTICAS
          </h1>
          <p style={styles.subtitle}>
            Análisis detallado del rendimiento del sistema
          </p>
        </div>

        {/* Estadísticas generales */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#a855f7'}}>$803,000</div>
            <div style={styles.statLabel}>Ventas Totales</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#10b981'}}>2,180</div>
            <div style={styles.statLabel}>Pedidos Completados</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#3b82f6'}}>1,150</div>
            <div style={styles.statLabel}>Productos Vendidos</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#f59e0b'}}>$368</div>
            <div style={styles.statLabel}>Ticket Promedio</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={styles.filterCard}>
          <div style={styles.filterGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fecha Desde</label>
              <input 
                type="date" 
                style={styles.input}
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fecha Hasta</label>
              <input 
                type="date" 
                style={styles.input}
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Tipo de Reporte</label>
              <select style={styles.select}>
                <option>Resumen General</option>
                <option>Detallado</option>
                <option>Comparativo</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Formato</label>
              <select style={styles.select}>
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
            <button style={styles.button} className="button-hover" onClick={handleGenerateReport}>
              GENERAR REPORTE
            </button>
            <button style={styles.exportBtn} className="export-hover" onClick={() => handleExport('PDF')}>
              📥 EXPORTAR
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button 
            style={{...styles.tab, ...(activeTab === 'ventas' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('ventas')}
          >
            Ventas
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'productos' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('productos')}
          >
            Productos
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'inventario' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('inventario')}
          >
            Inventario
          </button>
        </div>

        {/* Gráficos según tab activo */}
        {activeTab === 'ventas' && (
          <>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Evolución de Ventas Mensuales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ventasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                  <XAxis dataKey="mes" stroke="#999999" />
                  <YAxis stroke="#999999" />
                  <Tooltip 
                    contentStyle={{background: '#111111', border: '1px solid #222222', borderRadius: '6px'}}
                    labelStyle={{color: '#ffffff'}}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="ventas" stroke="#a855f7" strokeWidth={3} name="Ventas ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Pedidos por Mes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ventasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                  <XAxis dataKey="mes" stroke="#999999" />
                  <YAxis stroke="#999999" />
                  <Tooltip 
                    contentStyle={{background: '#111111', border: '1px solid #222222', borderRadius: '6px'}}
                    labelStyle={{color: '#ffffff'}}
                  />
                  <Legend />
                  <Bar dataKey="pedidos" fill="#10b981" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'productos' && (
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Productos Más Vendidos</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={productosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({nombre, percent}) => `${nombre} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{background: '#111111', border: '1px solid #222222', borderRadius: '6px'}}
                  labelStyle={{color: '#ffffff'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Estado del Inventario</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="categoria" stroke="#999999" />
                <YAxis stroke="#999999" />
                <Tooltip 
                  contentStyle={{background: '#111111', border: '1px solid #222222', borderRadius: '6px'}}
                  labelStyle={{color: '#ffffff'}}
                />
                <Legend />
                <Bar dataKey="stock" fill="#3b82f6" name="Stock Actual" />
                <Bar dataKey="minimo" fill="#ef4444" name="Stock Mínimo" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}