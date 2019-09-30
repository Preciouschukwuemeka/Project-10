const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const cors = require('cors');


const app = express();
// Enable All CORS Requests
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);


// we declare the sequelize and models constiables and initialize them to the sequelize and models objects imported.
const models = require('./models');
const sequelize = models.sequelize;
const { User, Course } = models;


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// global error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

