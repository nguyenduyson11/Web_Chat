require('dotenv').config();
const path = require('path');
const express  = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connectDb = require('./config/db/config_db');
const router = require('./routers/appRouter');
// connect database
connectDb()
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'app','views'));
app.use(express.static(path.join(__dirname,'public')));
router(app)
app.listen(3000);
// const io = require('socket.io')(app);
