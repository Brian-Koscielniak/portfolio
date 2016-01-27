var controller = require('../controllers/main-controller.js');

module.exports = function(app){
	/* GETs */
	app.get('/', function(req, res){controller.home(req, res)});
	app.get('/home', function(req, res){controller.home(req, res)});
	app.get('/about', function(req, res){controller.about(req, res)});
	app.get('/showcase', function(req, res){controller.showcase(req, res)});
	app.get('/contact', function(req, res){controller.contact(req, res)});
	app.get('/blog', function(req, res){controller.blog(req, res)});
		/* Temp GETs */// Temp GETs will be removed once a superior solution for live demos is found.
			app.get('/showcase/realtor', function(req, res){ res.render('../projects/realtorApp/views/realtorApp.jade') });
			app.get('/showcase/*', function(req, res){ res.send('content unavailable') });
		/* Temp GETs */
	app.get('*', function(req, res){controller.notFound(req, res)});

	/* POSTs */
	app.post('/contact', function(req, res){controller.contactPost(req, res)});
		/* Temp POSTs */// Temp POSTs will be removed once a superior solution for live demos is found.
			app.post("/rest", function(req, res){
				var request = require('request');
				request(req.body.data, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						res.send(body);
					}
				});
			});
		/* Temp POSTs */
}
