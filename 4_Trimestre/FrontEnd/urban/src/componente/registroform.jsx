export default function registroform() {
  return (
    <form className="mb-4">
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
}
