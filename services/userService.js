var helper       = require("../helper");

var MongoClient = require('mongodb').MongoClient;

mongourl = helper.AppConstant.mongoUrl;

var FindOne = function ( criteria, projections, options, callback) {

 	MongoClient.connect(mongourl,{ useNewUrlParser: true },function(err,db)
	{
		if(err){
			callback(err,db);
		} else {
			db.db('news_scraper').collection('users').findOne(criteria,function(err,result)
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
	'FindOne'                 : FindOne,
}
