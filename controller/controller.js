//Importamos la librería da validator para poder validar todos los datos que nos lleguen.
const validator = require('validator');


// Importación del 'file-system' y path para manipular ficheros.
    /* Podremos manipular el fichero dentro de el directorio donde se almacena.*/ 
const fs = require('fs');
const path = require('path');


// Para poder crear los esquemas tendremos que importar los modelos de esquema.
const Project = require('../models/models');




/*
    Un controlador será un objeto que tendrá una serie de métodos
    o de acciones relacionadas con la entidad del proyecto.

*/

const controller = {
    home: (req, res) => {
       return res.status(200).send({
            "mensaje" : "Hola Soy la HOME!"
       });
    },
    test: (req, res) => {
        return res.status(200).send({
            "mensaje" : "Hola Soy el TEST!"
        });
     },
    saveProject: (req, res) => {
        //Recoger parámetros por post. (Los parámetro que vienen del body)
        const params = req.body;
        
        
        //Validar datos con la librería validator.
        try{

            const validate_name = !validator.isEmpty(params.name);
            const validate_description = !validator.isEmpty(params.description);
            const validate_category = !validator.isEmpty(params.category);
            const validate_year = !validator.isEmpty(params.year);
            const validate_langs = !validator.isEmpty(params.langs);

            if( validate_name && validate_description && validate_category && validate_year && validate_langs){
                    //Crear objetos a guardar. (importar el require de los modelos).
                    const project = new Project();

                    //Asignar valores al objeto.
                    project.name = params.name;
                    project.description = params.description;
                    project.category = params.category;
                    project.year = params.year;
                    project.langs = params.langs;
                
                    //Guardar el artículo.
                    project.save( (err, projectStored) => {
                       if(err || projectStored ){
                            return res.status(404).send({
                                "status" : "error",
                                "mensaje" : "El artículo no se ha guardado!"
                            });
                       }
                       
                        return res.status(200).send({
                            "status" : "succes",
                            "mensaje" : "El artículo se ha guardado!",
                             project: projectStored
                        });
                    });
                    
                    
                    //Devolver una respuesta.
                    return res.status(200).send({
                        
                        "status"  : "success",
                        "project" : project,
                         "mensaje" : " Todas la validaciones OK -> no falta ningún dato."

                    });
    
                }else{
    
                    return res.status(404).send({
                        "status"  : "problem",
                        "mensaje" : " ERR en la validación -> La validación no se ha hecho correctamente."
                    });
    
                }
    

            
        }catch(err){

            return res.status(404).send({
                "status"  : "problem",
                "mensaje" : "Faltan datos por añadir!"
            });

        }
   
    },
    getArticle: (req, res) => {
        
        const last = req.params.last;

        if( last || last != undefined ){

        }

        // FIND -> método para buscar algo en concreto dentro de la BD
        Project.find({}).exec( (err, articles) => {
            
            // Resultado negativo al método GET.
            if( err ){
                return res.status(500).send({
                    "status"  : "error",
                    "articulos" : "Error al devolver los datos!"
                }); 
            }

            // Resultado negativo en caso de que no haya articulos.
            if( !articles ){
                return res.status(404).send({
                    "status"  : "error",
                    "articulos" : "No hay articulos para mostrar"
                }); 
            }

            // Resultado positivo al método GET.
            return res.status(200).send({
                "status"  : "success",
                "articulos" : articles
            });

        });

    },
    
    update : (req, res) => {
        // Recoger los datos del articulo desde la URL.
        const articleId = req.params.id;

        // Recoger todos los datos que llegan con PUT.
        const params = req.body;

        // Validar los datos
        try{
            const validate_name = !validator.isEmpty(params.name);
            const validate_description = !validator.isEmpty(params.description);
            const validate_category = !validator.isEmpty(params.category);
            const validate_year = !validator.isEmpty(params.year);
            const validate_langs = !validator.isEmpty(params.langs);
            
                if( validate_name && validate_description && validate_category && validate_year && validate_langs){
                    // Find & Update

                    /* Utilizamos el modelo de datos.*/
                    Project.findOneAndUpdate({_id: articleId}, params, { new : true }, (err, articleUpdate) =>{
                        
                        // Si llega un error comprobamos status.
                        if( err ) {
                            return res.status(500).send({
                                "status"  : "error",
                                "articulos" : "Erro al actualizar"
                            }); 
                        }

                        // Si no llega la actualización del article
                        if( !articleUpdate ) {
                            return res.status(500).send({
                                "status"  : "error",
                                "articulos" : "No han llegado los articulos"
                                
                            }); 
                        }

                        //Si todo va correctamente la respuesta será satisfactoria
                        return res.status(200).send({
                            "status"  : "succes",
                            "articulos" : "Todo esta correcto",
                            "article" : articleUpdate


                        }); 
                        

                    });

                    
                }else{
                    // Devolver una respuesta
                    return res.status(500).send({
                        "status"  : "error",
                        "articulos" : "Los datos no han sido validados correctamente"
                    }); 
                }


        }catch{
            return res.status(404).send({
                "status"  : "error",
                "articulos" : "Faltan datos por enviar"
            }); 
        }
    },
    delete : (req, res) => {

        // Recoger datos desde la url.
        const articleId = req.params.id;

        // Find & Delete
        Project.findOneAndDelete({_id: articleId}, (err, articleRemoved) =>{
            if( err ){
                return res.status(500).send({
                    "status"  : "error",
                    "articulos" : "Erro al eliminar"
                }); 
            } 

            if( !articleRemoved ){
                return res.status(404).send({
                    "status"  : "error",
                    "articulos" : "El método delete no ha funcionado"
                }); 
            }


            return res.status(200).send({
                "status" : "success",
                "mensaje" : "Datos eliminados correctamente"
            });

        });
    
    
    
    
    },
     uploadImage : (req, res) => {

        // Configurar el módulo connect-multiparty dentro de  -> routes/routes.js

        

        // Recoger el error de la petición
        const file_error = 'Img no subida...';
        if( !req.files ){
            return res.status(404).send({
                "status" : "errors",
                "mensaje" : file_error
            });
        } 

         

        // Conseguir el nombre y la extensión del archivo
        const file_path = req.files.file0.path;
        const file_split = file_path.split('/'); // En windows es ('\\')
                
                // Nombre del archivo
                const file_name = file_split[2]
                // Extensión del archivo
                const ext_split = file_name.split('.');
                const file_ext = ext_split[1];


        // Comprobar la extensión ( es decir : .jpg ,  etc ) -> sino es valida borrar fichero
        if( file_ext != 'png' && file_ext != 'jpeg' && file_ext != 'jpg' && file_ext != 'gif'){
                // En el caso de que sea diferente borrar el archivo
            fs.unlink( file_path, (err) =>{

                return res.status(500).send({
                    "status" : "error",
                    "mensaje" : "La extensión de la img. no es valida"
                })

            })

        }else{
            /*
                Si todo es valido...
                // Buscar el artículo, asignar el nombre a la imagen y actualizarlo.
            */
           
            

        } 

        // Opcional para ver las características
        return res.status(200).send({
            "status" : "success",
            "files" : req.files,
            "path" : {
                file_path,
                file_split,  
            },
            "name" : file_name,
            "extension" :  file_ext
        
        });

    } // end upload file
}

module.exports = controller;