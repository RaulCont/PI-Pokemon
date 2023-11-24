import axios from 'axios';

export const loadPokemonList = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemons');

            dispatch({type: 'LOAD_POKEMON_LIST_SUCCES', payload: data});
        } catch (error) {
            dispatch({type: 'LOAD_POKEMON_LIST_FAILURE'});
        }
    }
};

export const loadTypesList = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemons/types');

            dispatch({type: 'LOAD_TYPES_LIST_SUCCES', payload: data});
        } catch (error) {
            dispatch({type: 'LOAD_TYPE_LIST_FAILURE'});
        }
    }
}