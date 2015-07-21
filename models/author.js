var db = require('../db.js');

module.exports.Author = {

  all : function (callback) {
    db.all('authors', function (authors) {
      console.log(authors);
      var data={
        authors: authors
      }
      callback(data);
    });
  },
  create : function(obj, callback){
    db.create('authors', obj, function (data) {
      callback( data );
    });
  },
  createArticle : function(obj, callback){
    db.create('articles', obj, function (data) {
      callback( data );
    });
  },
   find : function(id, callback){
    db.find('authors', id, function (data) {
      callback( data[0] );
    });
  },
  findUser : function(user, callback){
    db.findUser('authors', user, function (data) {
      // console.log(data);
      // console.log(data[0]);
      callback( data[0]);
    });
  },
   updateArticle : function(obj, id, callback){
    db.update('articles', obj, id, function (data) {
      console.log(data);
      console.log(data[0]);
      callback( data);
    });
  }
}

