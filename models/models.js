/*
    Nos permitirá modificar el contenido de la base de datos mediante
    mongodb.

*/

const mongoose = require('mongoose');

/*

    Esta constante almacenará los esquemas y como serán interpretados los 
    objetos que se envien a nuestra base de datos.

*/
const Schema = mongoose.Schema;

// Escribimos un modelo de esquema para nuestra base de datos.
const ProjectSchema = Schema({
    "name" : String, 
    "description" : String,
    "category" : String,
    "year" : Number,
    "langs" :  String,  // -> Contendrá un array tipo string.
    // "image" : String
});


/*

    Exportamos el modulo de mongoose 

*/
module.exports = mongoose.model('project', ProjectSchema);