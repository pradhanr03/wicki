var root = __dirname;
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var bcrypt = require('bcrypt');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./db.js');
var router = express.Router();
var key = 'edited out for now';
var sendgrid = require('sendgrid')(key);


// app.listen(3000);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log("App running on port : ", app.get('port'));
});

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(root, 'views'));
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'allthethings',
  saveUninitialized: false,
  resave: false
}));



app.use(methodOverride(function(req, res) {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method
   delete req.body._method
   return method
 }
}));

fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     console.log('this is the route', route);
     route.controller(app, session);
 }
});



//ROOT ROUTE
app.get('/', function (req, res) {
var user = req.session.currentUser;
var name = req.session.name;
var id = req.session.id;

console.log(">>>>>>>>>>>");
console.log(data);
var data ={
        user: user,
        name: name
   }
  res.render('home', data);
  
});

app.post('/sendEmail/:id', function(req, res) {
      db.find('authors', req.params.id, function (data) {
        console.log(data[0]);
        var email = data[0].email;
        var message = req.body.description;
        var sender = req.body.sender;

        console.log(email+message+sender);

          var payload = new sendgrid.Email({
                to:       email,
                from:     sender,
                subject:  'Hello World',
                text:     message
          });

          sendgrid.send(payload, function(err, json) {
          if (err) { return console.error(err); }
          res.redirect('/');
        });

      });


  });

// app.get('/random', function (req, res) {
//   res
// })

