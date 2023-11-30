import {Routes, Route, useLocation} from 'react-router-dom';
import {LandingPage, Home, Card, Cards, NavBar, Form, Detail, SortedExistingPokemons, SortedCreatedPokemons, CreatedPokemons, SortedPokemonsByType, SortedByPokemonByTypeDB} from './components/index';
import { useEffect } from 'react';
import { loadPokemonList, loadTypesList, loadPokemonDBList, loadPokemonDbTypes } from '../src/redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {

  const dispatch = useDispatch();

  const {pathname} = useLocation();

  useEffect(() => {
    // La acción se ejecutará cuando el componente se monte.
    // dispatch(sortPokemonsByName('A'));
    dispatch(loadPokemonList());
    dispatch(loadTypesList());
    dispatch(loadPokemonDBList());
    dispatch(loadPokemonDbTypes());
  }, [dispatch]);
  
  const pokes = useSelector(state => state.pokemonList);
  return (
    <div className="App">
      
      {
        pathname !== '/' ? <NavBar /> : null
      }      

      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Cards pokes={pokes}/>}/>                
        <Route path='/card' element={<Card />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/detail/:id' element={<Detail />}/>
        <Route path='/sorted' element={<SortedExistingPokemons />}/>
        <Route path='/created' element={<CreatedPokemons />}/>
        <Route path='/sortcreated' element={<SortedCreatedPokemons />}/>
        <Route path='/sortbytype' element={<SortedPokemonsByType />}/>
        <Route path='/sortbytypeDb' element={<SortedByPokemonByTypeDB />}/>

      </Routes>
    </div>
  )
}
