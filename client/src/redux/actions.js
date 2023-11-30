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

export const loadPokemonDBList = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemons/db');            
            dispatch({type: 'LOAD_POKEMON_LIST_DB_SUCCES', payload: data});
        } catch(error) {
            dispatch({type: 'LOAD_POKEMON_LIST_DB_FAILURE'});
        }
    }
}

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

export const sortPokemonsByName = (name) => {
    return {
        type: 'SORT_API',
        payload: name 
    }
}

export const sortPokemonsDbByName = (name) => {
    return {
        type: 'SORT_DB',
        payload: name,
    }
}

export const sortPokemonByPower = (order) => {
    return {
        type: 'SORT_BY_POWER',
        payload: order,
    }
}

export const sortPokemonByPowerDb = (order) => {
    return {
        type: 'SORT_BY_POWER_DB',
        payload: order
    }
}

export const filterByType = (type) => {
    return {
        type: 'FILTER_BY_TYPE',
        payload: type,
    }
}

export const loadPokemonDbTypes = () => {

    return async(dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemons/dbtypes');
            dispatch({type: 'LOAD_TYPES_POKEMON_DB_SUCCES', payload: data});
        } catch (error) {
            dispatch({type: 'LOAD_TYPES_POKEMON_DB_FAILURE'});
        }
    }
}

export const filterByTypeDb = (type) => {
    return {
        type: 'FILTER_BY_TYPE_DB',
        payload: type,
    }
}
