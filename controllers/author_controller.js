// var express = require('express');
// var router = express.Router();

var bcrypt = require('bcrypt');
// var u = 'wikipedia';
// var pass = 'test1234';
// var SendGrid = require('sendgrid')(process.env.u, process.env.pass);

var Author = require('../models/author.js').Author;

module.exports.controller = function(app) {
  
	//ARTIST INDEX
//this renders all the artists in the artists table INDEX
	app.get('/authors', function (req, res) {
		Author.all( function(data) {
			// res.render('articleIndex', data);
			res.send('hello');
		});
	});

	app.get('/article/contact/:id', function (req, res) {
		Author.find(req.params.id, function(data) {
			// res.render('articleIndex', data);
			console.log(data);
			res.render('sendEmail', data);
		});
	});


	app.get('/signup', function (req, res) {
		res.render('signup');
		
	});

	
	app.get('/login', function (req, res) {
		res.render('login');
	});


	app.post('/users', function(req, res) {
	  bcrypt.hash(req.body.password, 10, function(err, hash) {
	    Author
	      .create({
	      	name: req.body.name,
	        email: req.body.email,
	        password: hash
	      }, function(user) {
	      		res.render('login');

	    });    
	  });
	});

	app.post('/sessions', function(req, res) {
	  var email = req.body.email;
	  var password = req.body.password;
	  console.log(email);
	  console.log(password);
	  console.log(req.session);
	  // var logg = $('.sign');
	  Author
	    .findUser( email, function(user) {
	    	console.log(user);
	      if (user) {
	        bcrypt.compare(password, user.password, function(err, result) {
	          if (result) {
	            req.session.currentUser = user.id;
	            req.session.name = user.name;
	            // res.send(user);
	            res.redirect('/');
	            // res.redirect('userPage', user);

	          } else {
	            res.status(400);
	            res.send({
	              err: 400,
	              msg: 'Incorrect password'
	            });
	          }
	        });
	      } else {
	        res.redirect('/signup');
	      }
	    });
	});

	app.get('/sessions', function (req, res) {
		Author
	    .findUser( req.session.currentUser, function(user) {
	    	console.log(user);
	    	res.render('userPage', user);
	    });	
	});

	
	app.delete('/sessions', function(req, res) {
	  console.log('hello');
	  req.session.currentUser = null;
	  req.session.name = null;
	 	 res.redirect('/');
	});

	app.get('/current_user', function(req, res) { //not sure what to do with this?
	  if (req.session.currentUser) {

	    Author
	      .find(req.session.currentUser, 
	      function(user) {
	        res.send(user);
	      });
	  } else {
	    res.send(null);
	  }
	});


	app.post('/posts', function(req, res) {
	 
	  if (req.session.currentUser) {
	    Author
	      .createArticle({
	        article_title: req.body.title,
	        article_desc: req.body.description,
	        author_id: req.session.currentUser,
	        category_id: req.body.category_id
	      }, function(newpost) {
	       
	        console.log(newpost);
	        res.redirect('/');
	      });
	  } else {
	    res.status(403);
	     res.redirect('/login');
	  }
	});

app.put('/article/author/:id', function(req, res) {
	  if (req.session.currentUser) {
	    Author
	      .updateArticle({
	        article_title: req.body.title,
	        article_desc: req.body.description
	      }, req.params.id, function(data) {
	       
	        console.log(data);
	        res.redirect('/');
	    });
	  } else {
	    res.status(403);
	    res.redirect('/login');
	  }
	});

	
};




