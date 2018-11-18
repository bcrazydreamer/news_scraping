var helper       = require("../helper");
var MongoClient  = require('mongodb').MongoClient;
mongourl         = helper.AppConstant.mongoUrl;



var find = function ( criteria, projections, options, callback) {
   	MongoClient.connect(mongourl,{ useNewUrlParser: true },function(err,db)
  	{
  		if(err){
  			callback(err,db);
  		} else {
        // db.collection('news_scraper').find({},{"sort": [["area",-1]]}).limit(20).toArray(function(err, resul)
  			db.db('news_scraper').collection('rss_links').find(criteria,projections).toArray(function(err,result)
  			{
  				if(err){
  					callback(err,result);
  				} else {
  					callback(err,result);
  				}
  			})
  		}
  	})
}


var FindOne = function ( criteria, projections, options, callback) {
   	MongoClient.connect(mongourl,{ useNewUrlParser: true },function(err,db)
  	{
  		if(err){
  			callback(err,db);
  		} else {
        options.lean = true;
  			db.db('news_scraper').collection('rss_links').findOne(criteria,function(err,result)
  			{
  				if(err){
  					callback(err,result);
  				} else {
  					callback(err,result);
  				}
  			})
  		}
  	})
}

var insert = function ( criteria , callback) {

  MongoClient.connect(mongourl,{ useNewUrlParser: true },async function(err,db)
	{
		if(err){
			callback(err,db);
		} else {
			db.db('news_scraper').collection('rss_links').findOne({rssurl:criteria.rssurl},function(err,result1)
			{
				if(err){
					callback(err,result1);
				} else {
          if(!result1){
            //---------------------------------------------
            db.db('news_scraper').collection('rss_links').save(criteria,function(err,result)
            {
              if(err){
                callback(err,result);
                return;
              } else {
                callback(err,result);
                return;
              }
            })
            //---------------------------------------------
          }else{
              callback('RSS already exit',result1);
          }

				}
			})
		}
	})

}

var update = function ( criteria, projection, option, callback) {
 	MongoClient.connect(mongourl,{ useNewUrlParser: true },function(err,db)
	{
		if(err){
			callback(err,db);
		} else {
			db.db('news_scraper').collection('rss_links').update(criteria,projection,option,function(err,result)
			{
				if(err){
					callback(err,result);
				} else {
					callback(err,result);
				}
			})
		}
	})
}


var remove = function ( criteria, callback) {
   	MongoClient.connect(mongourl,{ useNewUrlParser: true },function(err,db)
  	{
  		if(err){
  			callback(err,db);
  		} else {
  			db.db('news_scraper').collection('rss_links').remove(criteria,function(err,result)
  			{
  				if(err){
  					callback(err,result);
  				} else {
  					callback(err,result);
  				}
  			})
  		}
  	})
}





module.exports = {
  'insert'                    : insert,
  'find'                      : find,
	'FindOne'                   : FindOne,
  'update'                    : update,
  'remove'                    : remove
}
