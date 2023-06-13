
function calcularEdad(fechaNacimiento) {
    var fechaActual = new Date(); // Obtener la fecha actual
    var fechaNac = new Date(fechaNacimiento); // Convertir la cadena de fecha de nacimiento en un objeto Date
  
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear(); // Restar los años de las fechas
  
    // Verificar si el mes de nacimiento es mayor al mes actual o si es el mismo mes pero el día de nacimiento es posterior
    if (
      fechaNac.getMonth() > fechaActual.getMonth() ||
      (fechaNac.getMonth() === fechaActual.getMonth() && fechaNac.getDate() > fechaActual.getDate())
    ) {
      edad--; // Restar un año si no se ha cumplido el mes y día de nacimiento en el año actual
    }
  
    return edad;
  }
  
  export default calcularEdad;