const { getPokemonById, getPokemonByName, getPokemons } = require('../controllers/getPokemon');
const { getTypes } = require('../controllers/getTypes');
const { postPokemon } = require('../controllers/postPokemon');

const routes = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

routes.get('/', (req, res) => {
    console.log('get all pokemons');
    getPokemons(req, res);
});

routes.get('/types', (req, res) => {
    console.log('Types');
    getTypes(req, res);
});

routes.get('/name', (req, res) => {
    console.log('por name');
    getPokemonByName(req, res);
});

routes.get('/:id', (req, res) => {       
    console.log('por id');
    getPokemonById(req, res);
});

routes.post('/', (req, res) => {
    console.log('post');
    postPokemon(req, res);
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = routes;
