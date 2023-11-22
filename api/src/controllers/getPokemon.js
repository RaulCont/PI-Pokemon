const axios = require('axios');

const getPokemons = async(req, res) => {
    try {
        const pokemons = [];
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=48`);
                
        if(data) {

            for(const pok of data.results) {            
                const {data} = await axios.get(pok.url);
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
                }
                pokemons.push(pokemon);
            }
            return res.status(200).json(pokemons);
        } else throw new Error();
    } catch (error) {
        throw res.status(404).send(error.message);
    }
    
}

const getPokemonById = async(req, res) => {

    const { id } = req.params;
            
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
            }            
            return res.status(201).json(pokemon);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({msg: `Pokemon con nombre: ${name} no existe`});
    }

}


module.exports = {
    getPokemonById,
    getPokemonByName,
    getPokemons

}