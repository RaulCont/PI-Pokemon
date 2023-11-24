import {Routes, Route} from 'react-router-dom';
import {LandingPage, Home, Card, Cards, NavBar} from './components';
import { useEffect } from 'react';
import { loadPokemonList, loadTypesList } from '../src/redux/actions';
import { useDispatch } from 'react-redux';

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // La acción se ejecutará cuando el componente se monte
    dispatch(loadPokemonList());
    dispatch(loadTypesList());
  }, [dispatch]);
  
  return (
    <div className="App">
      
      <NavBar />

      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Cards />}/>                
        <Route path='/card' element={<Card />}/>
      </Routes>
    </div>
  )
}
