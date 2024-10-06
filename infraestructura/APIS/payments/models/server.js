/**
 * @author luis2ceronl
 * @version 1.0.0
 * 
 * Servidor de express
 * Esta clase llama a los metodos necesarios para instaciar un servidor
 */

const express = require('express');

/**
 * @class Server
 * clase servidor que inicia el servicio de express
 */

class Server{
    constructor(){
        this.app = express();
        this.port = 3000;
        this.path = '/api/';
        this.middelewares();
        this.routes();
    }

    middelewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/payments', require('../routes/payments.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor funcionando en el puerto, ${this.port}`)
        })
    }
}

module.exports = Server;