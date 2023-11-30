import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Detail.module.css';
import axios from 'axios';
import { useSelector } from "react-redux";


export const Detail = () => {

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

  return (
    
    <div className={style.contenedor_carta}>
      <div className="carta">
        <h2>Name: {pokemon.name}</h2>
        <h2>Id: {pokemon.id}</h2>
        <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} />
      </div>
    </div>
  )
}
