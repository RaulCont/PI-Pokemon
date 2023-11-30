import { useSelector } from "react-redux"
import { Cards } from "../Cards/Cards"

export const SortedCreatedPokemons = () => {

    const pokes = useSelector(state => state.sortedCreatedPokemons)

    return (
        <div>
            <Cards pokes={pokes}/>
        </div>
    )
}
