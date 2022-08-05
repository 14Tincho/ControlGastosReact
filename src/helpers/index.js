// Generamos un ID
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    const rta = random + fecha;
    return rta;
  }

// Ponemos una Fecha
export const formatearFecha = e => {
    const fecha = new Date(e);
    const opciones = {year: 'numeric', month: 'long', day: '2-digit' }
    const rta = fecha.toLocaleDateString('es-Es', opciones)
    return rta;
}