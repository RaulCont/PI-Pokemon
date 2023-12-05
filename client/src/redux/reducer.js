
const initialState = {
    pokemonList: [],
    sortedApiPokemons: [], 

    createdPokemons: [],       
    sortedCreatedPokemons: [],

    pokemonTypeList: [],
        
    pokemonFilterTypeList: [], //Para guardar los pokemones filtrados por tipo.

    pokemonTypesDb: [],   //Para guardar los tipos de pokemones que estan en la tabla.

    pokemonCreatedTypeFilter: [],
}

export const pokemonReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'LOAD_POKEMON_LIST_SUCCES': 
            // console.log('Se cargaron lo pokemones');             
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

        case 'LOAD_POKEMON_LIST_DB_SUCCES': 
            // console.log('Se cargaron los pokemones de la DB');
            return {...state, createdPokemons: action.payload}

        case 'LOAD_POKEMON_LIST_DB_FAILURE':
            // console.log('No se cargaron los pokemones de la DB');
            return state;
                
        case 'SORT_API':
            // console.log('ordenando lista');

            let orderCopy = [...state.pokemonList];

            if(action.payload === "A") {
                orderCopy.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    else return -1;
                })
            } else if(action.payload === 'D') {
                orderCopy.sort((a, b) => {
                    if(a.name < b.name) return 1;
                    else return -1;
                })
            };
            return {...state, sortedApiPokemons: orderCopy}

        case 'SORT_DB':

            // console.log('ordenando lista DB');                        
            let orderCopyDB = [...state.createdPokemons];
            if(action.payload === "A") {
                orderCopyDB.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    else return -1;
                })
            } else if(action.payload === 'D') {
                orderCopyDB.sort((a, b) => {
                    if(a.name < b.name) return 1;
                    else return -1;
                })
            };
            return {...state, sortedCreatedPokemons: orderCopyDB}

        case 'SORT_BY_POWER':

            // console.log('Ordenada por poder');

            let orderCopyByPower = [...state.pokemonList];

            if(action.payload === "debilidad") {
                orderCopyByPower.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    else return -1;
                })
            } else if(action.payload === 'fuerza') {
                orderCopyByPower.sort((a, b) => {
                    if(a.defense < b.defense) return 1;
                    else return -1;
                }) 
            };
            
            return {...state, sortedApiPokemons: orderCopyByPower}
        
        case 'SORT_BY_POWER_DB': 

            // console.log('Ordendar por poder en la DB');            

            let orderCopyByPowerDB = [...state.createdPokemons];

            if(action.payload === "debilidad") {
                orderCopyByPowerDB.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    else return -1;
                })
            } else if(action.payload === 'fuerza') {
                orderCopyByPowerDB.sort((a, b) => {
                    if(a.defense < b.defense) return 1;
                    else return -1;
                }) 
            };
            return {...state, sortedCreatedPokemons: orderCopyByPowerDB}
            
        case 'FILTER_BY_TYPE':
            // console.log('Filtro por tipo');            
            return {...state, pokemonFilterTypeList: state.pokemonList.filter(p => p.types.includes(action.payload))}

        case 'LOAD_TYPES_POKEMON_DB_SUCCES':
            // console.log('Obteniendo tipos de pokemones en la tabla');            
            return {...state, pokemonTypesDb: action.payload}

        case 'FILTER_BY_TYPE_DB': 
            
            const searchType = state.pokemonTypeList.find(e => e.name === action.payload); //Se busca el tipo en la lista de tipos.
            
            const tipos = state.pokemonTypesDb.filter(p => p.TypeId === searchType.id);
            const demo2 = [];

            for(let i = 0; i < tipos.length; i++) {
                if(state.createdPokemons.find(p => p.id === tipos[i].PokemonId)) {                    
                    const poke = state.createdPokemons.find(p => p.id === tipos[i].PokemonId)
                    demo2.push(poke);                    
                }
            }

            // console.log(demo2);
            // console.log(tipos);
            return {...state, pokemonCreatedTypeFilter: demo2}
            
        default:
                        
            return state;
    }

}