
const initialState = {
    pokemonList: [],
    pokemonTypeList: [],    
}

export const pokemonReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'LOAD_POKEMON_LIST_SUCCES': 
            console.log('Se cargaron lo pokemones');                        
            return {...state, pokemonList: action.payload}

        case 'LOAD_POKEMON_LIST_FAILURE': 
            console.log('No se cargaron los pokemones');
            return state;

        case 'LOAD_TYPES_LIST_SUCCES':
            console.log('Se cargo la lista de tipos');        
            return {...state, pokemonTypeList: action.payload};
        
        case 'LOAD_TYPE_LIST_FAILURE:':
            console.log('No se cargo la lista de tipos');
            return state;

        default:
                        
            return state;
    }

}