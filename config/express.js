var express = require('express');
var bodyParser = require('body-parser');
var Jade = require('jade');

module.exports = function(){
	var app = express();
	app.set('views', './views');
	app.set('view engine','jade');
	app.engine('jade', Jade.__express);
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	require('../routes/routes.js')(app);
	return app
}
