$(function() {
	$('#button').on('click', '.rand', random);
	
});




var random = function() {
   
        $.ajax({
          url: 'http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json',
          method: "GET"
        }).done(renderRandom);     

};


var renderRandom = function (gif) {
	$('#random').empty();
	//Create a new div with a class of 'gif'
	var title = $('<h4>');
	title.text(body.query.pages.35693371.title);
	console.log(title);
	var article = $('<p>');
	article.html(body.query.pages.35693371.extract);
	var newdiv = $("<div>");
	newdiv.append(title);
	newdiv.append(article);

	// var image = $("<img>")
	// image.attr("src", gif.data.fixed_width_small_still_url)

	
	// newdiv.append(image);
	$("#random").append(newdiv);

			
};
