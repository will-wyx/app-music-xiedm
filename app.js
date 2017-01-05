const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
// const contact = require('./routes/contact');
// const service = require('./routes/service');
const generic = require('./routes/generic');

const artists = require('./routes/artists');
const labels = require('./routes/labels');
const news = require('./routes/news');
// const reserve = require('./routes/reserve');

const management = require('./routes/management/management');
const managementapi = require('./routes/api/management');
const audio = require('./routes/api/audio');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/news', news);
app.use('/artists', artists);
app.use('/labels', labels);
app.use('/service', generic);
app.use('/reserve', generic);
app.use('/contact', generic);

app.use('/management', management);
app.use('/api/management', managementapi);
app.use('/api/audio', audio);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
