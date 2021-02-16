const path = require('path');
const express = require('express');
const cors = require('cors')
const AppError = require('../utils/appError');

const userRouter = require('../routes/userRoutes');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.userEndpoitPath = '/api/v1/users';
    this.middlewares();
    this.routes();
    this.listen();
    this.errorHandlingMiddleware();
  }

  middlewares() {
    this.app.use(cors())
    // server.app.use(express.static(__dirname + '/public'))
    this.app.use(express.static('src/public'))  
  }
  routes() {
    this.app.use(this.userEndpoitPath, userRouter);

    this.app.all('*',(req,res,next) => {
      // const err = new Error(`Can't find ${req.originalUrl} on this server`);
      // err.status = 'fail';
      // err.statusCode = 404;
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    })
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(this.port)
      console.log('Server running on port', this.port)
    })
  }
  errorHandlingMiddleware() {
    this.app.use((err, req, res, next) => {
      console.log(err.stack)
      err.statusCode = err.statusCodde || 500;
      err.status = err.status || 'error';
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    })
  }
} 
module.exports = Server