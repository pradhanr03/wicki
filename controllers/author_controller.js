var bcrypt = require('bcrypt');
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

	  Author
	    .findUser({
	    	email: req.body.email
	    }, function(user) {
	    	console.log(user);
	      if (user) {
	        bcrypt.compare(password, user.password_digest, function(err, result) {
	          if (result) {
	            req.session.currentUser = user.id;
	            res.send(user);
	          } else {
	            res.status(400);
	            res.send({
	              err: 400,
	              msg: 'Incorrect password'
	            });
	          }
	        });
	      } else {
	        res.status(400);
	        res.send({
	          err: 400,
	          msg: 'Username not found'
	        });
	      }
	    });
	});

	// app.delete('/sessions', function(req, res) {
	//   req.session.currentUser = null;
	//   res.send({ msg: 'Successfully logged out' });
	// });

	// app.get('/current_user', function(req, res) {
	//   if (req.session.currentUser) {
	//     User
	//       .findOne(req.session.currentUser)
	//       .then(function(user) {
	//         res.send(user);
	//       });
	//   } else {
	//     res.send(null);
	//   }
	// });

	// app.get('/posts', function(req, res) {
	//   Post
	//     .findAll({ include: [User] })
	//     .then(function(posts) {
	//       res.send(posts);
	//     });
	// });

	// app.post('/posts', function(req, res) {
	//   if (req.session.currentUser) {
	//     Post
	//       .create({
	//         content: req.body.content,
	//         user_id: req.session.currentUser
	//       })
	//       .then(function(post) {
	//         res.send(post);
	//       });
	//   } else {
	//     res.status(403);
	//     res.send({
	//       err: 403,
	//       msg: 'You must log in to create posts'
	//     });
	//   }
	// });

	// app.use(express.static('./public'));

	// app.listen(3000, function() {
	//   console.log('Listening on port 3000...');
	// });
};