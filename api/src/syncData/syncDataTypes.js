const axios = require('axios');
const {Type} = require('../db');

const syncDataTypes = async() => {

    try {
                
        const {data} = await axios.get('https://pokeapi.co/api/v2/type');

        if(data.results) {
            
            for(const type of data.results) {
        
                await Type.create({
                    name: type.name,
                });                                 
            }           
             
        } else {
            throw new Error();
        }

    } catch (error) {
        console.log('La carga de datos no se realizo con exito');
        console.log(error.message);
    }
}

module.exports = {
    syncDataTypes,
}