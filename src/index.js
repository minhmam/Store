const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();
// const port = process.env.PORT || 3000;

const route = require('./routes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

// Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
//   return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// }

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
db.connext();

//HTTP logger
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));


//Template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.json());
route(app);

app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at http://localhost:${port}`)
});
