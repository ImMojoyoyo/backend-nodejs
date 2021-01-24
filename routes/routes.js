/*
    Para organizar de mejor forma nuestro proyecto
    creamos este fichero donde almacenar las rutas 
    para nuestro proyecto y así poder importarlas dentro
    del fichero -> app.js

*/


// Nos permitirá crear las rutas y las peticiones HTTP.
const express = require('express');

// Esta constante almacenará los datos que proveen los controladores.
const ProjectController = require('../controller/controller');


/* 
    Le diremos a Express que esta constante almacena 
    las rutas -> llamamos a la función Router() para que 
    sepa que lo que observa es una ruta.
*/
const router = express.Router();

/*

   =============== Cargamos el modulo del connect-multiparty ====================

*/

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir : './upload/articles'});


/*

    Las rutas irán cargadas con sus respectivos métodos
    y paths. Junto con el contenido que están exportarán
    para que sean visualizados, provenientes de los controladores.

*/
router.get('/home', ProjectController.home );
router.post('/test', ProjectController.test);

// Métodos útilis
router.post('/save-project', ProjectController.saveProject);
router.get('/article/:last?', ProjectController.getArticle);
router.put('/update/:id?', ProjectController.update);
router.delete('/delete/:id?', ProjectController.delete);
router.post('/upload-image/:id', md_upload, ProjectController.uploadImage);

// router.post('/file-upload', ProjectController.upload);



module.exports = router;