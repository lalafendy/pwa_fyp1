const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
var session = require('express-session');
//onst popup = require('node-popup');
var cookieParser = require('cookie-parser');
const {getHomePage,viewSmart,BrandSmart, getSearchPage} = require('./routes/index');
const {GenePage,GeneSmart} = require('./routes/genetic');
const {logout,addSmartPage, addSmart, deleteSmart, editSmart, editSmartPage,loginSmartPage,loginSmart,AdminHomePage,regPage,regSmart,ProfAdminPage,ProfEditPage,ProfEdit} = require('./routes/admin');
const port = 5030;
const https = require('https');
const httpsPort = 5020;
// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/login', loginSmartPage);
app.get('/genedata', GeneSmart);
app.get('/gene', GenePage);
app.get('/add', addSmartPage);
app.get('/display/:id', BrandSmart);
app.get('/register', regPage);
app.get('/search', getSearchPage);
app.get('/edit/:id', editSmartPage);
app.get('/editprof/:id', ProfEditPage);
app.post('/editprof/:id', ProfEdit);
app.get('/profile', ProfAdminPage);
app.get('/delete/:id', deleteSmart);
app.get('/view/:id', viewSmart);
app.get('/bview/:id', viewSmart);
app.get('/logoutt', logout);
app.post('/add', addSmart);
app.post('/genedata', GeneSmart);
app.post('/register', regSmart);
app.post('/auth', loginSmart);
app.post('/edit/:id', editSmart);
app.get('/admin',AdminHomePage);
//add the manifest
app.get("/manifest.json", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/cache-manifest");
    //console.log(path.join(__dirname,"manifest.json"));
    //send the manifest file
    //to be parsed bt express
    res.sendFile(path.join(__dirname,"manifest.json"));
});

//add the service worker
  app.get("/sw.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"sw.js"));
  });
  app.get("/images/icons/icon-72x72.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-72x72.png"));
  });
 
  app.get("/images/icons/icon-128x128.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-128x128.png"));
  });

  app.get("/images/icons/icon-144x144.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-144x144.png"));
  });
  app.get("/images/icons/icon-152x152.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-152x152.png"));
  });
  app.get("/images/icons/icon-192x192.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-192x192.png"));
  });
  app.get("/images/icons/icon-384x384.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-384x384.png"));
  });
  app.get("/images/icons/icon-512x512.png", function(req, res){
    //send the correct headers
    res.header("Content-Type", "image/png");
    
    res.sendFile(path.join(__dirname,"/images/icons/icon-512x512.png"));
  });
  app.get("/loader.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"loader.js"));
  });


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.listen(httpsPort, function () {
  console.log(`Listening on port ${httpsPort}!`)
});