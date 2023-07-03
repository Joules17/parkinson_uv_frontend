// proptypes
import PropTypes from 'prop-types';

export default function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
capitalizeFirstLetter.propTypes = {
    word: PropTypes.string
};