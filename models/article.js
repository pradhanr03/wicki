var db = require('../db.js');

module.exports.Article = {

  all : function (callback) {
    db.all('articles', function (articles) {
      console.log(articles);
      var data={
        articles: articles
      }
      callback(data);
    });
  },
  find : function(id, callback){
    db.find('articles', id, function (data) {
      callback( data[0] );
    });
  },
  getWithAuthors : function( id, callback){
    db.find('authors', id, function (authors) {
      db.findRelations('articles', 'author_id', id, function (articles) {
        var data = {
          author: authors[0],
          articles: articles[0]
        };

        callback(data);
      });
    });
  },
  authorOfArticle : function( key, callback){
    db.authorOfArticle('articles', 'authors', 'author_id', 'id', key, function (articles) {
        console.log(articles);
        console.log(articles[0]);
        var data = {
          articles: articles[0]
        };

        callback(data);
    });
  }
}
