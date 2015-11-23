var express = require('express');

var router = express.Router();

var config = require('../config.json');

var fs_query = require('../modules/fs_query');

var wo_query = require('../modules/wo_query');

var fsKey = config.foursquare.client_id;

var woKey = config.weatherOnline.key;

var secret = config.foursquare.client_secret;

var version = config.foursquare.version;

var fsUrl = config.foursquare.url;

var woUrl = config.weatherOnline.url;


/* GET listings. */

router.get('/', function(req, res, next) {
  var apiResp, params;
  fs_params = {};
  fs_params.section = req.query.section;
  fs_params.near = req.query.near;
  fs_query(fsUrl + 'client_id=' + fsKey + '&client_secret=' + secret + '&v=' + version, fs_params, function(err, resp){

    var col = resp.response.groups[0].items;
    var iconSize = 32;

    wo_params = {};
    wo_params.q = fs_params.near;
    wo_params.format = config.weatherOnline.format;
    wo_params.num_of_days = config.weatherOnline.num_of_days;
    wo_params.tp = config.weatherOnline.tp;

    wo_query(woUrl + 'key=' + woKey, wo_params, function(err, resp){
      var forecasts = resp.data.weather;
      var icon = resp.data.current_condition[0].weatherIconUrl[0].value;
      res.render('listings', {title: 'Day-Tripper', venues: col, size: iconSize, forecasts: forecasts});
    })
  })

});

module.exports = router;