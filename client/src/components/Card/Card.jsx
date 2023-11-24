import axios from 'axios';
import style from './Card.module.css'

export const Card = ({id, name, image, types}) => {
    
    const onSearch = async() => {
        
        const response = await fetch('http://localhost:3001/pokemons/45');
        
        const data = await response.json();
        setImageUrl(data.image);        
    }   
            
    return (
        <div className={style.tarjeta}>
            <h4>Nombre: {name}</h4>
            <h5>id: {id}</h5>
            <img src={image} alt="" />
            <h5>Tipos: {types}</h5>
        </div>        
    )
}
