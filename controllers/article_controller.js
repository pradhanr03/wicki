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
      		console.log(data);
      		console.log(data[0]);
      	res.render('articleEdit', data);
    	});
  	});
};

 