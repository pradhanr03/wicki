var Category = require('../models/category.js').Category;

module.exports.controller = function(app) {
  
	//ARTIST INDEX
//this renders all the artists in the artists table INDEX
	app.get('/categories', function (req, res) {
		Category.all( function (data) {
			res.render('categoryIndex', data);
		});
	});

	app.get("/categories/:id", function (req, res) {
	    Category.getWithArticles( req.params.id, function (data){
	      res.render('categoryList', data);
	    });
	});
};