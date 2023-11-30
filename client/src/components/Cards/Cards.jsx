import { Card } from "../Card/Card"
import style from './Cards.module.css';
import { useState } from "react";

export const Cards = ({pokes}) => {                
         
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokes.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
        
    return (
        <div>
            <div className={style.contenedorCartas}>
                {
                    currentPokemons.map(pokemon => {
                        return <Card 
                            key={pokemon.id}
                            id={pokemon.id} 
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.types}
                            attack={pokemon.attack}
                        />
                    })                    
                }
            </div>
                <div>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastPokemon >= pokes.length}>
                        Next
                    </button>
                </div>
        </div>
    )
}
