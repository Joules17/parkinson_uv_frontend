// prop
import PropTypes from 'prop-types';

// Mui 
import Carousel from 'react-material-ui-carousel'
import Item from './CarruselItem'

function Carrusel({items_helper}) {    
    return (
        <Carousel>
            {
                items_helper.map((item, i) => <Item item={item} key = {i}/>)
            }
        </Carousel>
    )
}

export default Carrusel; 

Carrusel.propTypes = {
    items_helper: PropTypes.array
}