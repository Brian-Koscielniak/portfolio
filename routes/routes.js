var controller = require('../controllers/main-controller.js');

module.exports = function(app){
	/* GETs */
	app.get('/', function(req, res){controller.home(req, res)});
	app.get('/home', function(req, res){controller.home(req, res)});
	app.get('*', function(req, res){controller.notFound(req, res)});
}
