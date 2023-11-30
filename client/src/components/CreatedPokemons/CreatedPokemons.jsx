import { useSelector } from "react-redux"
import { Cards } from "../Cards/Cards";


export const CreatedPokemons = () => {
    
    const pokes = useSelector(state => state.createdPokemons);

    return (
        <div>
            <Cards pokes={pokes}/>
        </div>
    )
}
