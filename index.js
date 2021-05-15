const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route.js');

const port = 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('index',//path kể từ folder views
      {
         name: 'Messi'
      }
   );
})

app.use('/users', userRoute);

app.listen(port, () => {
   console.log('Server listening on port ' + port);
})
