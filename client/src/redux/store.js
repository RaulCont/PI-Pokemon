import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { pokemonReducer } from './reducer';


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea

pokemonReducer
const store = createStore(
    pokemonReducer, 
    composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store