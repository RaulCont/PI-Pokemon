const { Pokemon, Type } = require("../db");


const postPokemon = async(req, res) => {
    
    try {
        const {name, image, hp, attack, defense, speed, height, weight, types} = req.body;
        
        if(name && image && hp && attack && defense && speed && height && weight && types) {
            
            const newPokemon = await Pokemon.create({
                name,
                image,
                hp,                        
                attack,
                defense,
                speed,
                height,
                weight,                
            });
                                    
            for(let i = 0; i < types.length; i++) {                
                const tipo = await Type.findOne({where: {name: types[i]}});
                await newPokemon.addType(tipo);                               
            }
                                    
            return res.status(200).json(newPokemon);        
        }
        return res.status(400).json({msg: 'Los datos no estan completos'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear el Pokémon' });
    }
    
};

module.exports = {
    postPokemon,
}