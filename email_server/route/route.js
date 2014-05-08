var fiveDaysControl = require("../controllers/email_controllers");
module.exports = function(app){
	/// get five-day 
	app.get('/fd/:id',fiveDaysControl.getFd);
}
