/**
 * @author luis2ceron
 * @version 1.0.0
 * 
 * Servidor de express
 * Esta clase llama a los metodos necesarios para instanciar un servidor
 */

//Importacion de variables

const express = require('express')
/**
 * @class Server
 * Clase servidor que inicia el servicio de express
 */
 class Server{
    constructor(){
        this.app=express();
        this.port=3000;
        this.path='/api/'
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/orders',require('../routes/orders.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor funcionando',this.port);
        });
    }
 }

 module.exports = Server;