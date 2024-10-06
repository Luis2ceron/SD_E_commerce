/**
 * @author Miguelcajigas19ch
 * @version 1.0.0
 * 
 * Server express
 * This class calls the methods necessary to instantiate a server
 */
const express  = require('express')
/**
 * @class Server
 * Server class that starts the express service.
 */

class Server {
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
        this.app.use('/car',require('../routes/shopping.car.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor funcionando',this.port);
        });
    }
 }

 module.exports = Server;


