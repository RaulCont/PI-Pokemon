const axios = require('axios');
const { Pokemon } = require('../db');
const db = require('../db');
const { Op } = require('sequelize');

const getPokemons = async(req, res) => {
        
    try {
        const { data: listData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60`);
        
        if (!listData || !listData.results) {
            throw new Error('Invalid data received from PokeAPI');
        }
        
        const pokemonPromises = listData.results.map(async (pok) => axios.get(pok.url));
      
        const pokemonResponses = await Promise.all(pokemonPromises);
      
        const pokemons = pokemonResponses.map(response => {
            const data = response.data;
      
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name),
            };
        });
      
        return res.status(200).json(pokemons);
    } catch (error) {
        return res.status(404).send(error.message);
    }
    
}

const getPokemonDb = async(req, res) => {
            
    try {
        const pokemons = await Pokemon.findAll();   
        
        return res.status(200).json(pokemons);
    } catch (error) {
        return res.status(400).send(error.message);
    }

}

const getPokemonById = async(req, res) => {
    
    const { id } = req.params;
    
    try {
        const pokemonDb = await Pokemon.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                }
            }
        });
        
        return res.status(200).json(pokemonDb);
        
    } catch (error) {
        // console.log(error); 
        
    }
    

    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                
        if(data.id) {
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name),
            }            
            return res.status(201).json(pokemon);
        } else {
            throw new Error();
        }

    } catch (error) {
        console.log(error.message);
        return res.status(404).json({msg: `Pokemon con id: ${id} no existe`});
    }
}

const getPokemonByName = async(req, res) => {

    let {name} = req.query;
    
    if(!name) {
        return res.status(500).json({msg: 'Faltan datos en la query'});
    }
    
    if(!isNaN(name)) {
        return res.status(500).json({msg: 'Name debe de ser un nombre'});
    }

    try {
        const pokemonDb = await Pokemon.findOne({
            where: {
                name: name,
            }
        })
        if(pokemonDb) {
            return res.status(200).json(pokemonDb)

        }
    } catch (error) {
        console.log(error);
    }

    name = name.toLowerCase();

    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`); 
        if(data.name) {
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name),
            }   
                                    
            return res.status(201).json(pokemon);
        } else {
        }
        throw new Error();
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({msg: `Pokemon con nombre: ${name} no existe`});
    }

}

const getPokemonPokemonTypes = async(req, res) => {
        
    const pokemonTipo = db.pokemonTypes;

    try {
        const resultados = await pokemonTipo.findAll();
        const types = [];
        resultados.forEach(resultado => {
            types.push(resultado);            
        });

        return res.status(200).json(types);
    } catch (error) {
        console.error('Error al obtener datos de PokemonTipo:', error);
        return res.status(404).send('Error al obtener datos de PokemonTipo:', error);
    }

}


module.exports = {
    getPokemonById,
    getPokemonByName,
    getPokemons,
    getPokemonDb,
    getPokemonPokemonTypes

}