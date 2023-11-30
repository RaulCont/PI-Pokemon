import { useEffect, useState } from 'react'
import style from './Form.module.css'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { validation } from './validaton';
import { loadPokemonDBList } from '../../redux/actions';

export const Form = () => {

    const types = useSelector(state => state.pokemonTypeList);

    const dispatch = useDispatch();

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
            image: newPokemon.imagen,
            types: [...newPokemon.tipos],
        };
        
        axios.post('http://localhost:3001/pokemons', postPokemon, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Respuesta: ', response.data);
            dispatch(loadPokemonDBList()); //Actualiza la base de datos en el estado.
            return;
        })
        .then(error => {
            console.error('Error:', error);
        })
    }

    const handleTypeChange = (event) => {
        const selectedTypes = Array.from(event.target.selectedOptions, (option) => option.value);        
        setnewPokemon({
          ...newPokemon,
          tipos: selectedTypes,
        });
    };

  return (
    <div className={style.div_form}>        
        <form onSubmit={handleSubmit} className={style.form_new_pokemon}>
            <label >Name: </label>            
            <input 
                type="text" 
                placeholder='Ingresa el Nombre de tu Pokemon'
                name='nombre'
                value= {newPokemon.nombre}
                onChange={handleChange}
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
            />

                {/* {
                    console.log(errors.vida)
                } */}

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
