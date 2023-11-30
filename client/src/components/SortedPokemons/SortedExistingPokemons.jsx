import { useSelector } from "react-redux"
import { Cards } from "../Cards/Cards";

export const SortedExistingPokemons = () => {

    const pokes = useSelector(state => state.sortedApiPokemons);
    
    return (
        <div>
            <Cards pokes={pokes}/>
        </div>
    )
}
