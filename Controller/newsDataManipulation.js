let Parser = require('rss-parser');
let parser = new Parser();
var helper = require("../helper");
var axios  = require("axios");
var MongoClient = require('mongodb').MongoClient;
mongourl = helper.AppConstant.mongoUrl;


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
  MongoClient.connect(mongourl,{ useNewUrlParser: true },async function(err,db)
  {
    if(err){
      callback(err,db);
    } else {
          var newsDataInDb=[];
          // result give rss from db
          let result = await db.db('news_scraper').collection('rss_links').findOne({subcategory:payload});
          if(result){
            try{
              //to check todays news
              var timeF = new Date();
              var dateStringF = timeF.toLocaleString('en-US', { day: 'numeric' }) + timeF.toLocaleString('en-US', { month: 'numeric' }) + timeF.toLocaleString('en-US', { year: 'numeric' });
              newsDataInDb = await db.db('news_scraper').collection('news_data').find({subcategory:payload,serverdate:dateStringF}).toArray();
            }catch(err){
              console.log(err);
              newsDataInDb = [];
            }
            if(newsDataInDb.length){
              callback(null,newsDataInDb)
              return;
            }else{
              var removeOldDateIfAny = await db.db('news_scraper').collection('news_data').remove({subcategory:payload});
              // console.log(removeOldDateIfAny,'-----');
              let feed = await parser.parseURL(result.rssurl);
              var time = new Date();
              for(var i=0 ; i<feed.items.length ; i++)
              {
                var dateString = time.toLocaleString('en-US', { day: 'numeric' }) + time.toLocaleString('en-US', { month: 'numeric' }) + time.toLocaleString('en-US', { year: 'numeric' });
                feed.items[i].serverdate = dateString;
                feed.items[i].category = helper.feedUrls.getCategory[payload];
                feed.items[i].subcategory = payload;
                feed.items[i].scrapedat = Date.now();
                var saveResult = await db.db('news_scraper').collection('news_data').insert(feed.items[i]);
                console.log('saved');
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
                      var saveResult = await db.db('news_scraper').collection('news_data').insertMany([feed.items[i]]);
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
  });
}



module.exports = {
    "readRssAndSave" : readRssAndSave
}
