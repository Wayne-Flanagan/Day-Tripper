var wo_query, generateAPIReqUrl, request;

request = require('request');

wo_query = function(url, params, cb) {
  var apiReqUrl;
  apiReqUrl = generateAPIReqUrl("" + url, params);
  return request.get(apiReqUrl, function(err, res, body) {
    if (err) {
      console.log(err, null, null);
    }else
      cb(err, JSON.parse(body));
  });
};

generateAPIReqUrl = function(url, params) {
  var woUrl, key, val;
  woUrl = url;
  for (key in params) {
    val = params[key];
    if (typeof val !== "undefined" && val) {
      woUrl += "&" + key + "=" + val;
    }
  }
  return woUrl;
};

module.exports = wo_query;