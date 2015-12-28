var express = require('express');
var Jade = require('jade');

module.exports = function(){
	var app = express();
	app.set('views', './views');
	app.set('view engine','jade');
	app.engine('jade', Jade.__express);
	app.use(express.static('public'));
	require('../routes/routes.js')(app);
	return app
}
