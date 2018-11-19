var helper       = require("../helper");
const models = require('../models');
var mongoose                = require('mongoose');
var mongourl         = helper.AppConstant.mongoUrl;
mongoose.connect(mongourl);


var insert = function ( criteria , callback) {
  let rssInstanse = new models.rssModel(criteria);
    rssInstanse.save( criteria, function(err, response ){
            if (err) {
                callback(err);
                return;
            }
            callback(null, response);
    })
}

//--------------------------------------------------------------------------------------------------------
var update = function (criteria, details,options, callback){
      models.rssModel.update(criteria, details,options,callback);
}
//--------------------------------------------------------------------------------------------------------
var findOne = function ( criteria, projections, options, callback){
  options.lean = true;
  models.rssModel.findOne( criteria, projections, options, callback )
}
//--------------------------------------------------------------------------------------------------------
var findByIdAndRemove = function (criteria, callback){
  models.rssModel.findByIdAndRemove(criteria, callback);
}
//--------------------------------------------------------------------------------------------------------
var find = function ( criteria, projections, options, callback){
  options.lean = true;
  models.rssModel.find( criteria, projections, options, callback );
}
var remove = function (criteria, projections, options, callback){
  models.rssModel.remove(criteria, projections, options, callback);
}
//------------------------------------------------------------------------------------------------
var aggregation = function(query,callback)
{
    models.rssModel.aggregate([query],callback);
}



var asyncUpdate = function (criteria, details,options){
      return models.community.update(criteria, details,options);
}

var asyncFindOne = function ( criteria, projections, options){
  options.lean = true;
  return models.rssModel.findOne( criteria, projections, options )
}

var asyncFindByIdAndRemove = function (criteria){
  return models.rssModel.findByIdAndRemove(criteria);
}

var asyncFind = function ( criteria, projections, options){
  options.lean = true;
  return models.rssModel.find( criteria, projections, options );
}

var asyncRemove = function ( criteria, projections, options){
  return models.rssModel.remove( criteria, projections, options );
}

var asyncAggregation = function(query){
    return models.rssModel.aggregate([query]);
}



module.exports = {
  'insert'                    : insert,
  'find'                      : find,
	'FindOne'                   : findOne,
  'update'                    : update,
  'remove'                    : remove,
  'aggregation'               : aggregation,
  'asyncUpdate'									   : asyncUpdate,
  'asyncFindOne'								   : asyncFindOne,
  'asyncFindByIdAndRemove'				 : asyncFindByIdAndRemove,
  'asyncFind'									     : asyncFind,
  'asyncAggregation'               : asyncAggregation,
  'asyncRemove'                    : asyncRemove
}
