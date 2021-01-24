/*
    Esta constante almacena la importación de las dependencias de express
    que nos permitirán trabajar junto con las rutas  y las peticions HTTP.
*/
const express = require('express');
/*
    Requerimos las dependecias de body-parser. Esta dependencias nos permitirá
    crear objetos que no son json a formato json.
*/
const bodyParser = require('body-parser');

// Esta constante ejecutará la función de express.
const app = express();

// RUTAS Y FICHEROS
const project_routes = require('./routes/routes');

// MIDDLEWARES
/*
    Los middlewares se cargarán antes de cargar una RUTA URL.
*/
app.use(bodyParser.urlencoded({extended: false}));
// Cualquier tipo de petición la convertirá a JSON
app.use(bodyParser.json());

// CORS
    /*
        El CORS es el acceso cruzado entre dominios -> Permite las llamadas HTTP/AJAX
        desde nuestro FrontEnd que estará en otra URL diferente. 
        Sino cuando solicitemos algun tipo de información a un enlace (URL) externo desde 
        el FrontEnd al BackEnd no recibiremos ningún tipo de dato mediante los métodos HTTP
        (GET, POST, PUT, DELETE --------- etc...)

        -> El CORS realmente es un middleware que se ejecuta antes de las peticiones
        lo que le decimos es que cualquier cliente pueda requerir cualquiera de los métodos
        que hay añadidos ( se le pueden añadir más métodos ).

    */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
               'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// PREFIJOS DE RUTA
/* Podremos sobreescribir el URL que se encargará de llamar a las rutas. */
app.use('/api', project_routes);

module.exports = app;