var controller = require('../controllers/main-controller.js');

module.exports = function(app){
	/* GETs */
	app.get('/', function(req, res){controller.home(req, res)});
	app.get('/home', function(req, res){controller.home(req, res)});
	app.get('/about', function(req, res){controller.about(req, res)});
	app.get('/showcase*', function(req, res){controller.showcase(req, res)});
	app.get('/contact', function(req, res){controller.contact(req, res)});
	app.get('/blog', function(req, res){controller.blog(req, res)});
	app.get('*', function(req, res){controller.notFound(req, res)});

	/* POSTs */
	app.post('/contact', function(req, res){controller.contactPost(req, res)});
}
