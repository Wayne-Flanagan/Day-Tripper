var moment = require('moment');



generateDayNames = function(date){
	dt = moment(date, "YYYY-MM-DD")
	return dt.format('dddd');
}

module.exports = generateDayNames;