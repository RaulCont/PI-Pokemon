

export const validation = (pokemon) => {

    const errors = {};
    if(pokemon.nombre.length > 20 ) {
        errors.nombre = 'El nombre debe ser menor a veinte caracteres.';
    }    

    if(!/^[^\d]*$/.test(pokemon.nombre)) {
        errors.nombre = 'El nombre del Pokemon no puede contener numeros';
    }

    if(pokemon.vida === '0') {
        errors.vida = 'La vida de tu pokemon debe ser mayor a 1'
    }

    if(pokemon.ataque === '0') {
        errors.ataque = 'El ataque de tu pokemon debe ser mayor a 1'
    }

    if(pokemon.defensa === "0") {
        errors.defensa = 'La defensa de tu pokemon debe ser mayor a 1'
    }

    if(pokemon.velocidad === "0") {
        errors.velocidad = 'La velocidad de tu pokemon debe ser mayor a 1'
    }

    if(pokemon.altura === "0") {
        errors.altura = 'La altura de tu pokemon debe ser mayor a 1'
    }

    if(pokemon.peso === "0") {
        errors.peso = 'El peso de tu pokemon debe ser mayor a 1'
    }

    // if(pokemon.imagen === "") {
    //     errors.vida = 'La vida de tu pokemon debe ser mayor a 1'
    // }

    // console.log(errors.nombre);
    return errors;
}