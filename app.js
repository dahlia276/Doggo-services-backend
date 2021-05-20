require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session")
const passport     =require("passport")
const cors         =require("cors")


//Include passport configuration
require("./configs/passport")

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("trust proxy", 1);

//Session set up
app.use(session ({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    sameSite: 'none', //true, //client on same domain as the server (local host)
    secure: true, //false, //cause we are not using https
    httpOnly: false, //true, //only using http not https
    maxAge: 60000 //expirtion time = 6 mins
  },
  rolling: true //session get refreshed with interaction 
}))

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_HOSTNAME]
}))


const index = require('./routes/index');
app.use('/', index);

const auth = require("./routes/auth-routes")
app.use("/api", auth)

const sitters = require("./routes/dog-sitter-routes")
app.use("/api", sitters)

const owners = require("./routes/dog-owner-routes")
app.use("/api", owners)


module.exports = app;
