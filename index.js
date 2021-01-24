/*
    Dentro de este archivo crearemos la conexión con la base de datos
    utilizando NodeJS.

*/

// Llamamos a la dependencia de mongoose que nos permite conectarnos al servidor.
/*
    Dentro de esta variable se almacena el módulo de mongoose.
*/
const mongoose = require('mongoose');



/*
    Indicamos que la conexión al servidor debe de ser una promesa.
    Por tanto siempre que necesitemos recibir una petición estará 
    "escuchando" al servidor

*/ 
mongoose.Promise = global.Promise;


/* 
    Creamos una constante que importará el servidor,
    la configuración de EXPRESS -> que nos permitirá trabajar con peticiones
    + rutas. 
 */
const app = require('./app');
const port = 3700;


/*
    Para realizar la conexión a la base de datos le pasamos a la promesa
    la URL que almacena la base de datos.
*/ 
mongoose.connect("mongodb://localhost:27017/formularios", {useNewUrlParser : true})
                .then(() => {
                    // El método then lo podremos utilizar en las promesas 
                    /*
                        Si la conexión es favorable entonces nos devolverá un resultado por consola 
                        favorable -> "La conexión se ha realizado con éxito".
                    */

                    /* 
                        Llamamos a la constante que almacenea EXPRESS
                        y le diremos que Express tendrá que escuchar las peticiones 
                        de los argumentos que le vamos a pasar.
                        Entre ellos el puerto.

                    */
                    app.listen( port, () => {
                        console.log( "Conexión a la BD realizada con éxito" );
                    } );
                })
                .catch( 
                    /* El método catch al igual que el then sólo podremos usarlo en las promesas
                    pero este nos devolverá un resultado erroneo si la conexión no es favorable.
                    */

                    err => { console.log(err)}
                )   