//modules
const express = require('express');
const mongosee =require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// import routes
const IndexRouter = require("./routers/IndexRouter");
const connDb = require("./database/connDb");
const UserRouter = require( './routers/UserRouter' );
const PhotoRouter = require( './routers/PhotoRouter' );
const upload  = require( './libs/storage' );

class Server {
    constructor() {
        this.objConn = new connDb();
        this.app = express();
        this.#config();
    }

    #config() {
        var db = mongosee.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function cb() {
            console.log('Connected to MongoDB');
        })
        // Middlewares
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(upload.single('file'));
        //static files
        this.app.use(express.static(path.join(__dirname, 'storage')));
        //almacenno en la variable de entorno el puerto
        this.app.set('PORT', process.env.PORT || 3000);
        // Creating Routes
        const indexR =  new IndexRouter();
        const userR = new UserRouter();
        const photoR = new PhotoRouter();
        //adding routes
        this.app.use(indexR.router);
        this.app.use(userR.router);
        this.app.use(photoR.router);
        //listening
        this.app.listen(this.app.get('PORT'), () => {
            console.log(`Server on port ${this.app.get('PORT')}`)
        });
    }
}

new Server();