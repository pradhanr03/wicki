var Article = require('../models/article.js').Article;

module.exports.controller = function(app) {
  
	//ARTIST INDEX
//this renders all the artists in the artists table INDEX
	app.get('/article/:id', function (req, res) {
		Article.authorOfArticle( req.params.id, function (data){
	     	console.log(data);
	      res.render('articleIndex', data);
	    });
	});

	app.get('/article/edit/:id', function (req, res) {
    	Article.find( req.params.id, function (data) {
      		console.log("testing");
          console.log(data);
      		
      	res.render('articleEdit', data);
    	});
  	});

	app.get('/contribute/:id', function (req, res) {
    	// Article.find( req.params.id, function (data) {
      		//when you have sessions figured out
      		//use '/contribute/:id' as the route, and pass in the id when user logs in
      	Article.getWithAuthors( req.params.id, function (data){
	     	console.log(data);      		
      	res.render('newPost', data);
    	});
  	});

  	

  	app.get('/about', function (req, res) {
  		Article.about( function (data) {
	    console.log(data);
	    
	      res.render('about', data);
	 	});
	});

    app.delete('/article/:id', function(req, res) {
    console.log('hello');
       if (req.session.currentUser) {
        Article.delete(req.params.id, function (data) {
          res.redirect('/');
        });
      } else {
      res.status(403);
      res.redirect('/login');
      }
    });


    // res.send({ msg: 'Successfully logged out' });

   

};

 