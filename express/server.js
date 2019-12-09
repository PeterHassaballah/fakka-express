'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const NodeCouchDb = require('node-couchdb');
var debug = require('debug')('server:server');

var indexRouter = require('../routes/index');
var usersRouter = require('./routes/UserRoute');
var transactionsRouter = require('./routes/transactionsRoute');
const couchAuth = new NodeCouchDb({
  auth:{
    user: 'peter',
    password: 'beamer'
  }
});
couchAuth.listDatabases().then(dbs => {
  if(dbs){
    console.log(dbs);
  }
}, err => {
  // request error occured
  if(err){
    console.log('error',err);
  }
});



//Code from netlify .com 
const app = express();
const router = express.Router();


app.set('view engine', 'jade');
app.set('views', path.join(__dirname,'views'));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));








module.exports = app;
module.exports.handler = serverless(app);
