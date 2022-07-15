var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/allRoutes.js'); //chama tudo q tá dentro dessa pasta
var usersRouter = require('./routes/usersRouter.js'); //chama tudo q tá dentro dessa pasta
var cartRouter = require('./routes/cartRouter.js'); //chama tudo q tá dentro dessa pasta
var clientsRouter = require('./routes/clientsRouter.js')
var crudClientsRouter = require('./routes/crudClientsRouter.js')
var editClientsRouter = require('./routes/editClientsRouter.js')
//var listClientsRouter = require("./routes/listClientsRouter.js")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //definição padrão de roteamento básico: 'express.METHOD(PATH,HANDLER)'. Conforme site 'expressjs'
app.set('view engine', 'ejs');

app.use(logger('dev')); //no coursera eu usei "morgan('dev')" para fazer a mesma coisa. É a msm coisa, tanto lá quanto aqui
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //coursera tb usei isso, porém no lugar de "path.join" eu usei "(__dirname+ 'public'"

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter); //se não tiver essas funções, o caminho HTML não será criado. Por isso estava dando errado.
app.use('/clients', clientsRouter)
app.use('/crudClients', crudClientsRouter) //no livro é chamado de new
app.use('/edit/:id', editClientsRouter)
//app.use('/listClients', listClientsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
