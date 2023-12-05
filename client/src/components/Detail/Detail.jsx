import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Detail.module.css';
import axios from 'axios';


export const Detail = ({types}) => {

  const {id} = useParams();

  // const pokemons = useSelector(state => state.pokemonList);

  const [pokemon, setPokemon] = useState({});
      
  useEffect(() => {    
    axios.get(`http://localhost:3001/pokemons/${id}`)
    .then(({data}) => {

      if(data.name) {
        setPokemon(data);

      } else {
        window.alert('No existen personajes con ese id');
      }
    }).catch(error => {
      console.log(error);
    })
    
  }, [id]);

  const colores = {
    grass: '#78C850'
  }
    
  const estiloEnLinea = {
    backgroundColor: colores.grass
  }

  let clase
  if(pokemon.types) {
    clase = pokemon.types[0];
  }

  console.table(pokemon.types)
  return (
    <div className={style.contenedor_pokemon}>

      <div className={style.imagen_pokemon}>  
        <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} className={clase ? style[clase]: null}/>
      </div>

      <div className={style.specs}>                      
        <h1>{pokemon.name}</h1>
        <p>Vida: {pokemon.hp}</p>
        <p>Ataque: {pokemon.attack}</p>
        <p>Defensa: {pokemon.defense}</p>
        <p>Velocidad: {pokemon.speed}</p>
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
        <p>Tipos: {pokemon.types?.map(type => type + ' ')}</p>          
      </div>     
    </div>
  )
}
