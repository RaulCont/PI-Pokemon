import { useEffect, useState } from 'react'
import style from './Form.module.css'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { validation } from './validaton';
import { loadPokemonDBList, loadPokemonDbTypes } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';



export const Form = () => {

    const types = useSelector(state => state.pokemonTypeList);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const [newPokemon, setnewPokemon] = useState({
        nombre: '',
        vida: '',
        ataque: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        imagen: '',
        tipos: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
       setErrors(validation(newPokemon));     
    }, [newPokemon]);
    

    const handleChange = ({target}) => {

        setErrors(validation({
            ...newPokemon,

        }));
        
        setnewPokemon({
            ...newPokemon,
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
                
        event.preventDefault();

        
        const postPokemon = {
            name: newPokemon.nombre,
            hp: newPokemon.vida,
            attack: newPokemon.ataque,
            defense: newPokemon.defensa,
            speed: newPokemon.velocidad,
            height: newPokemon.altura,
            weight: newPokemon.peso,
            image: newPokemon.imagen ? newPokemon.imagen : "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png",        
            types: [...newPokemon.tipos],
        };
                
        if(postPokemon.name === "") {
            alert('El campo nombre no puede estar vacio');
            return;

        } else if(postPokemon.hp === "") {
            alert('El campo vida no puede estar vacio');
            return

        } else if(postPokemon.attack === "") {
            alert('El campo ataque no puede estar vacio');
            return

        }else if(postPokemon.defense === "") {
            alert('El campo defensa no puede estar vacio');
            return

        }else if(postPokemon.speed === "") {
            alert('El campo velocidad no puede estar vacio');
            return

        }else if(postPokemon.height === "") {
            alert('El campo altura no puede estar vacio');
            return

        }else if(postPokemon.weight === "") {
            alert('El campo peso no puede estar vacio');
            return
        }

        axios.post('http://localhost:3001/pokemons', postPokemon, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Respuesta: ', response.data);
            dispatch(loadPokemonDBList()); //Actualiza la base de datos en el estado. 
            dispatch(loadPokemonDbTypes());  
            navigate('/created');
        })
        .then(error => {
            console.log('Linea 72');
            console.error('Error:', error);
        })
    }

    const handleTypeChange = (event) => {

        const selectedTypes = Array.from(event.target.selectedOptions, (option) => option.value);
          
        // console.log(selectedTypes);

        setnewPokemon({
          ...newPokemon,
          tipos: selectedTypes,
        });
        console.log(newPokemon);
    };

  return (
      <div className={style.div_form}>    

        <form onSubmit={handleSubmit} className={style.form_new_pokemon}>
            <h1>Crea tu Pokemon</h1>   
            <label >Nombre </label>            
            <input 
                type="text" 
                placeholder='Ingresa el Nombre de tu Pokemon'
                name='nombre'
                value= {newPokemon.nombre}
                onChange={handleChange}
                className={style.input_form}
            />
            
            {                
                errors.nombre ? <p>{errors.nombre}</p> : null
            }

            <label >Vida:</label>            
            <input 
                type="number" 
                placeholder='Ingresa la Vida de tu Pokemon'
                name='vida'
                min="1"
                max="500"
                value= {newPokemon.vida}
                onChange={handleChange}
                className={style.input_form}
            />
                
                {                
                    errors.vida ? <p>{errors.vida}</p> : null
                }

            <label >Ataque:</label>            
            <input 
                type="number" 
                placeholder='Ingresa el nivel de ataque de tu pokemon'
                name='ataque'
                min="1"
                max="500"
                value= {newPokemon.ataque}
                onChange={handleChange}
                className={style.input_form}
            />

                {                
                    errors.ataque ? <p>{errors.ataque}</p> : null
                }
            
            <label>Defensa</label>                        
            <input 
                type="number" 
                placeholder='Ingresa el nivel de defensa de tu pokemon'
                name='defensa'
                min="1"
                max="500"
                value= {newPokemon.defensa}
                onChange={handleChange}
                className={style.input_form}
            />

                {                
                    errors.defensa ? <p>{errors.defensa}</p> : null
                }
            
            <label >Velocidad: </label>            
            <input 
                type="number" 
                placeholder='Ingresa la velocidad de tu pokemon'
                name='velocidad'
                min="1"
                max="500"
                value= {newPokemon.velocidad}
                onChange={handleChange}
                className={style.input_form}
            />

                {                
                    errors.velocidad ? <p>{errors.velocidad}</p> : null
                }
            
            <label>Altura</label>            
            <input 
                type='number' 
                placeholder='Ingresa la altura de tu pokemon'
                name='altura'
                min="1"
                max="500"
                value= {newPokemon.altura}
                onChange={handleChange}
                className={style.input_form}
            />

                {                
                    errors.altura  ? <p>{errors.altura}</p> : null
                }
            
            <label>Peso</label>            
            <input 
                type="number" 
                placeholder='Ingresa el peso de tu pokemon'
                name='peso'
                min="1"
                max="500"
                value= {newPokemon.peso}
                onChange={handleChange}
                className={style.input_form}
            />   

                {                
                    errors.peso ? <p>{errors.peso}</p> : null
                }

            <label>Imagen</label>
            <input  
                type='text'
                placeholder='Ingresa una imagen para tu pokemon'
                name='imagen'
                value= {newPokemon.imagen}
                onChange={handleChange}
                className={style.input_form}
            />
            <label>Tipo</label>   
            
            <select id="seleccionMultiple" multiple value={newPokemon.tipos} onChange={handleTypeChange}>
                  {types.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                ))}
            </select>                            
            
            <button >Submit</button>
        </form>
    </div>
  )
}
