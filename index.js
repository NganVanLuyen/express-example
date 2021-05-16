const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('index',//path kể từ folder views
      {
         name: 'Messi'
      }
   );
})

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
   console.log('Server listening on port ' + port);
})
