import { useSelector } from "react-redux"
import { Cards } from "../Cards/Cards";



export const SortedByPokemonByTypeDB = () => {

    const pokes = useSelector(state => state.pokemonCreatedTypeFilter);

    return (
        <div>
            <Cards pokes={pokes}/>
        </div>
    )
}
