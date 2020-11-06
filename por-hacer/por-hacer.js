const fs = require('fs');
let listadoPorHacer = [];

const guardarDB = () => {
    //convierte un obbjeto a un json
    let data = JSON.stringify(listadoPorHacer);


    //la data debe ser copiada al data.json
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No de pudo grabar', err);
    });
}

//para leer un archivo json podemos hacer una peticion http  para cargarlo, pero como estamos en back end podemos hacer un require directamente de ese archivo 
//y esa funcion al detectar que es un archivo json lo serializa y lo convierte en un objeto de javascript por nosotros

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        //descripcion:descripcion
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const getListado = () => {
    cargarDB()
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //find index recibe un callback que recorre un ciclo interno por cada uno de los elementos
    //retorna la posicion del item, si no encuentra nada retorna -1
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDB();
    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    let nuevoListado = listadoPorHacer.filter(item => {
        return item.descripcion !== descripcion
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}