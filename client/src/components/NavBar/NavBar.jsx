import { useState } from 'react';
import style from './NavBar.module.css'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { sortPokemonsByName, sortPokemonsDbByName, sortPokemonByPower, sortPokemonByPowerDb, filterByType, filterByTypeDb } from '../../redux/actions';


export const NavBar = () => {
    
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const types = useSelector(state => state.pokemonTypeList);
     
  const [valoresSeleccionados, setValoresSeleccionados] = useState({
    select1: 'init',
    select2: 'init',
    select3: 'init',
  });

  const valoresOriginales = {
    select1: 'init',
    select2: 'init',
    select3: 'init',
  }
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

const onSearchPokemon = async(event) => {  

    event.preventDefault();

    if(!/^[^\d]*$/.test(name)) {      
        setError({name: 'El nombre no puede contener numeros'});
    } else {
        setError({});
    }

    try {
        const {data} = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);  
        
        if(data.id) {
            navigate(`/detail/${data.id}`);
        } else {

           throw new Error('No existe un pokemon con ese nombre');
        }
        
    } catch (error) {

        console.error(error.message);
    }
}

const handleChange = ({target}) => {
    setName(target.value);
}

const handlePokemons = (event) => {

    setValoresSeleccionados(valoresOriginales)

    if(event.target.value === 'created') {
        
        navigate('/created');
    } else {
        navigate('/home');
    }
}

const handleSortByAbc = (event, selector) => {

    const nuevoValor = event.target.value;    

    setValoresSeleccionados({
        ...valoresOriginales,
        [selector]: nuevoValor
    })

    if(pathname === '/home' || pathname === '/sorted' || pathname === '/sortbytype') {

        dispatch(sortPokemonsByName(event.target.value));

        if(event.target.value === 'default') {
            navigate('/home');
            return;
        } else {
            navigate('/sorted');
            return;
        }    

    } else if(pathname === '/created' || pathname === '/sortcreated' || pathname === '/sortbytypeDb') {

        dispatch(sortPokemonsDbByName(event.target.value));

        if(event.target.value === 'default') {
            navigate('/created');
            return;
        } else {
            navigate('/sortcreated');
            return;
        }
    }
}

const handleByPower = (event, selector) => {

    const nuevoValor = event.target.value;

    setValoresSeleccionados({
        ...valoresOriginales,
        [selector]: nuevoValor
    })   

    if(pathname === '/home' || pathname === '/sorted' || pathname === '/sortbytype') {

        if(event.target.value === 'fuerza' || event.target.value === 'debilidad') {
        
            dispatch(sortPokemonByPower(event.target.value));
            navigate('/sorted');  
        }

    } else if(pathname === '/created' || pathname === '/sortcreated' || pathname === '/sortbytypeDb') {
        
        dispatch(sortPokemonByPowerDb(event.target.value));
        navigate('/sortcreated');
    }
}

const handleByType = (event, selector) => {

    const nuevoValor = event.target.value;

    setValoresSeleccionados({
        ...valoresOriginales,
        [selector]: nuevoValor
    })
    
    if(pathname === '/home' || pathname === '/sortbytype' || pathname === '/sorted') {
        console.log(event.target.value);

        if(event.target.value === 'default') {
            navigate('/home');
            return;
        }
    
        dispatch(filterByType(event.target.value));
        navigate('/sortbytype');
    } else if(pathname === '/created' || pathname === '/sortcreated' || pathname === '/sortbytypeDb'){
        if(event.target.value === 'default') {
            navigate('/created');
            return;
        }
        dispatch(filterByTypeDb(event.target.value));
        navigate('/sortbytypeDb');
    }

}

return (    
    <nav className={style.navBar}>  
         
        <div className={style.top_link}>            
            <h2 onClick={() => navigate('/home')}>Poké Dex</h2>
            <h2 onClick={() => navigate('/form')}>Crea tu Pokemon</h2>            
        </div> 
        {
            pathname === '/form' || pathname === '/detail' ? null :  
                <div className={style.barra_nav}>
                    <select 
                        name="createdOrExisting" 
                        id="createdOrExisting"
                        onChange={handlePokemons}
                        defaultValue="existing"
                    >
                        <option value="existing" >Existentes </option>                  
                        <option value="created">Creados</option>
                    </select>
                            
                    <select                 
                        id="select1"
                        onChange={(event) => handleSortByAbc(event, 'select1')}
                        value={valoresSeleccionados.select1}
                    >
                        {/* <option value="init">Ordenar por alfabeto</option>                   */}
                        <option value="init" disabled>Filtrar por Abecedario</option>                  
                        <option value="A">Ascendente</option>                    
                        <option value="D">Descendente</option>  
                    </select> 
                    
                    <select                  
                        id="select2"
                        value={valoresSeleccionados.select2}                                
                        onChange={(event) => handleByPower(event, 'select2')}
                    >   
                        <option value="init" disabled>Ordenar por poder</option>
                        <option value="fuerza">Fuerza</option>
                        <option value="debilidad">Debilidad</option>
                    </select>  

                    <select                  
                        id="tipo"
                        onChange={(event) => handleByType(event, 'select3')}
                        value={valoresSeleccionados.select3}              
                    >
                        <option value="init" disabled>Filtrar por tipos</option>
                        <option value="default">Default</option>
                        {
                            types.map(t => {
                                return (
                                    <option value={t.name} key={t.id}>
                                        {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                                    </option>
                                )
                            })
                        }
                    </select>             
                    
                    <form 
                        onSubmit={onSearchPokemon}
                        // onChange={style.nav_form}  
                        className={style.nav_form }  
                    >
                        <input 
                            type="text" 
                            onChange={handleChange} 
                            placeholder='Busca tu pokemon'  
                            className={style.input_nav}         
                        />
                        <button onClick={onSearchPokemon} className={style.search_button}>Buscar</button>
                    </form>
                
                    {
                        error.name ? <p>{error.name}</p> : null
                    }

                </div>                                        
        }           
    </nav>   
   
  )
}
