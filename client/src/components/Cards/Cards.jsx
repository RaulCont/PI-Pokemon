import { useSelector } from "react-redux"
import { Card } from "../Card/Card"
import style from './Cards.module.css';

export const Cards = () => {
    const pokemons = useSelector(state => state.pokemonList);
    const tipos = useSelector(state => state.pokemonTypeList);
    const page = pokemons.slice(12, 24);
    return (
        <div className={style.contenedorCartas}>
            {
                pokemons.map(pokemon => {
                    return <Card 
                        key={pokemon.id}
                        id={pokemon.id} 
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                })
            }
        </div>
    )
}
