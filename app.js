var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
// var favicon = require('static-favicon');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var app = express();

app.disable('x-powered-by');

// all environments
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression()); //gzip compression for HTTP responses
// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/logo', routes.logo);
app.get('/syllabus', routes.syllabus);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});