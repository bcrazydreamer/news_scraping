var weather = require('weather-js');

// Options:
// search:     location name or zipcode
// degreeType: F or C

weather.find({search: 'Haryana', degreeType: 'C'}, function(err, result) {
  if(err) console.log(err);

  console.log(result[0]);
});
