let Parser                  = require('rss-parser');
let parser                  = new Parser();
var services                = require('../services');
var helper                  = require("../helper");
var axios                   = require("axios");

async function getUrlThatNotInDb(payload,html){

  payload = payload.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
  var reg = new RegExp('<a[^>]* href="([^"]*)" id[^>]*>'+payload+'</a>',"g");
  ans = html.match(reg);
  // console.log(ans,'debug');
  var resultUrl;
  if(ans){
    try{
        resultUrl = ans[0].match(/<a[^>]*?href="([^<]*?)"[^>]*?>/)[1] || null;
    }catch(err){
      resultUrl = null;
    }
  }
  // console.log(resultUrl);
  return resultUrl;

}

var readRssAndSave = async (payload,callback)=>{
          var newsDataInDb=[];
          // result give rss from db
          let result = await services.rssService.asyncFindOne({subcategory:payload},{},{});
          if(result){
                //to check todays news
                var timeF = new Date();
                var dateStringF = timeF.toLocaleString('en-US', { day: 'numeric' }) + timeF.toLocaleString('en-US', { month: 'numeric' }) + timeF.toLocaleString('en-US', { year: 'numeric' });
                try{
                    newsDataInDb = await services.newsService.asyncFind({subcategory:payload,serverdate:dateStringF},{},{});
                }catch(err){
                    newsDataInDb = [];
                }
                if(newsDataInDb.length){
                  callback(null,newsDataInDb)
                  return;
                }
                else
                {
                  try{
                      var removeOldDateIfAny = await services.newsService.asyncRemove({subcategory:payload});
                  }catch(err){
                    removeOldDateIfAny = null;
                  }
                  let feed = await parser.parseURL(result.rssurl);
                  var time = new Date();
                  for(var i=0 ; i<feed.items.length ; i++)
                  {
                    console.log(feed.items[i]);
                    var dateString = time.toLocaleString('en-US', { day: 'numeric' }) + time.toLocaleString('en-US', { month: 'numeric' }) + time.toLocaleString('en-US', { year: 'numeric' });
                    feed.items[i].serverdate = dateString;
                    feed.items[i].category = helper.feedUrls.getCategory[payload];
                    feed.items[i].subcategory = payload;
                    feed.items[i].scrapedat = Date.now();
                    var saveResult = await services.newsService.asyncUpdate({title:feed.items[i].title},feed.items[i],{upsert: true});
                    console.log('saved-1');
                  }
                  callback(null,feed.items)
                }
          }
          else
          {
              axios.get("https://timesofindia.indiatimes.com/rss.cms")
              .then(async function (response) {
                  var dataUrl = getUrlThatNotInDb(payload,response.data);
                  if(!dataUrl){
                    callback('Not found',null);
                    return;
                  }
                  dataUrl.then(async (url)=>{
                    let feed = await parser.parseURL(url);
                    var time = new Date();
                    for(var i=0 ; i<feed.items.length ; i++)
                    {
                      var dateString = time.toLocaleString('en-US', { day: 'numeric' }) + time.toLocaleString('en-US', { month: 'numeric' }) + time.toLocaleString('en-US', { year: 'numeric' });
                      feed.items[i].serverdate = dateString;
                      feed.items[i].category = helper.feedUrls.getCategory[payload];
                      feed.items[i].subcategory = payload;
                      feed.items[i].scrapedat = Date.now();
                      var saveResult = await services.newsService.asyncUpdate({title:feed.items[i].title},feed.items[i],{upsert: true});
                      console.log('saved-2');
                    }
                    callback(null,feed.items)
                    return;
                  },(err)=>{
                    callback(err,null)
                    return;
                  }).catch((err)=>{
                    console.log(err);
                  })
              })
              .catch(function (error) {
                callback(null,null);
              });
          }
}



module.exports = {
    "readRssAndSave" : readRssAndSave
}
