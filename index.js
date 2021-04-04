require('dotenv').config();
const path = require('path');
const express  = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const connectDb = require('./config/db/config_db');
const router = require('./routers/appRouter');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const socket = require('./server');

// connect database
connectDb()

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'app','views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser('abc'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
router(app);
const server = require('http').Server(app);
const io = require('socket.io')(server);
socket(io);
server.listen(3000);
// const io = require('socket.io')(app);
