import { Cards } from "../Cards/Cards"
import { useSelector } from "react-redux";


export const SortedPokemonsByType = () => {
    
    const pokes = useSelector(state => state.pokemonFilterTypeList);

    return (
        <div>
            {
                pokes.length === 0 ? <div>No existen pokemones con ese tipo</div> : <Cards pokes={pokes}/>
            }                        
        </div>
    )
}
