// proptypes
import PropTypes from 'prop-types';

export default function CalculateAge ({ value }) {
    var fechaActual = new Date();
    var fechaNac = new Date(value);
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    var mesActual = fechaActual.getMonth();
    var mesNac = fechaNac.getMonth();

    // Verificar si aún no se ha cumplido el cumpleaños en el mes actual
    if (mesActual < mesNac) {
        edad--;
    }
    // Verificar si se ha cumplido el cumpleaños pero no el día
    else if (mesActual === mesNac) {
        var diaActual = fechaActual.getDate();
        var diaNac = fechaNac.getDate();
        if (diaActual < diaNac) {
            edad--;
        }
    }

    return edad;
};

CalculateAge.propTypes = {
    value: PropTypes.string
};