var express               = require('express');
var router                = express.Router();
var passport              = require('passport');
var session               = require('express-session');
var bodyParser            = require('body-parser');
var helper                =require('../helper');
const controllers         = require('../Controller')
// var multer                = require('multer');
var path                  = require('path');
var fs                    = require('fs');
var weather               = require('weather-js');

router.get('/',function(req, res, next) {
    res.render('index', { title: 'Home',news_data:''});
});

router.get('/getNews/:id',function(req, res, next) {
    var data = req.params.id;
    data = data.replace(/_|-/g, " ");
    controllers.newsDataManipulation.readRssAndSave(data,(err,response)=>{
        if(err){
          console.log(err);
          res.status(500).send('Something went wrong');
        }else{
          // console.log(response);
          res.send(response);
        }
    });
});


router.post('/api/weatherInfo',function(req, res, next) {
  if(!req.body.location){
    loc = 'Haryana';
  }else{
    loc = req.body.location;
  }
  weather.find({search: loc, degreeType: 'C'}, function(err, result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }else{
      res.status(200).send(result);
    }
});



});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
});

router.get('/googlec2ef99614e6df793.html',function(req, res, next) {
    res.render('Admin/seogoogle');
});

router.get('/robots.txt',function(req, res, next) {
    res.sendFile('SEO/robot.txt',{ root: './public' });
});

router.get('/robot.txt',function(req, res, next) {
    res.sendFile('SEO/robot.txt',{ root: './public' });
});

module.exports = router;
