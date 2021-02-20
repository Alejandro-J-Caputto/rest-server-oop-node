const path = require('path');
const express = require('express');
const cors = require('cors')
const AppError = require('../utils/appError');

const userRouter = require('../routes/userRoutes');
const authRouter = require('../routes/authRoutes');
const { dbConnection } = require('../database/config');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.userEndpoitPath = '/api/v1/users';
    this.authEndpointPath = '/api/v1/auth';
    this.conectarDB(process.env.ENVIROMENT_NOW);
    this.middlewares();
    this.routes();
    this.listen();
    this.errorHandlingMiddleware();
  }
  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())

    this.app.use(express.static('./public'))  
  }
  routes() {
    this.app.use(this.authEndpointPath, authRouter);
    this.app.use(this.userEndpoitPath, userRouter);

    this.app.all('*',(req,res,next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    })
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(this.port)
      console.log('Server running on port', this.port)
    })
  }
  async conectarDB(env) {
    await dbConnection(env);
  }
  errorHandlingMiddleware() {
    this.app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error';
      if(process.env.ENVIROMENT_NOW === 'development') {
        
      
      }
      res.status(err.statusCode).json({
        // err: {...err, [err.message]:err.message},
        status: err.status,
        message: err.message
      })
    })
  }
} 

module.exports = Server
