
const {Type} = require('../db');

const getTypes = async(req, res) => {

    try {
        const allTypes = await Type.findAll();    
        res.status(200).json(allTypes);

    }catch(error) {

        console.error('Error al obtener los Tipos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getTypes,
}