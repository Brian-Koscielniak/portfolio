/* includes */
var fs = require('fs');

/* render pages */
exports.home = function(req, res){
	res.render('index.jade');
}
exports.about = function(req, res){
	// Retrieve info text
	fs.readFile(__dirname + '/../public/assets/infoText', 'utf-8', function (err,text) {
		res.render('about.jade', {text : text});
	});
}
exports.showcase = function(req, res){
	res.render('showcase.jade');
}
exports.contact = function(req, res){
	res.render('contact.jade');
}
exports.blog = function(req, res){
	res.redirect('https://koscielniak.wordpress.com/');
}
exports.notFound = function(req, res){
	res.render('404.jade');
}
exports.project = function(req, res, page){
/* Renders and feeds matching content in via 'page' variable */
	// TODO: these obj will need to be moved to a database
	var projectObj = {
		'realtor' : {
			title : 'Realtor Application', 
			desc : 'In this project the goal was to create a real-estate look up tool in a RESTful architectural style. This application uses the HTTP method POST to communicate with the Zillow property database, and uses Ajax to update the page without a refresh. </br>The features include: property look up, property comparisons, saving property info to local web storage, HTML5 forms with error handling, Google maps, and a compound interest calculator.',
			video : 'assets/videos/realtorApp_demonstration.webm',
			demo : '/realtor/demo'
		},
		'cms' : {
			title : 'Content Management System', 
			desc : 'Just as the name implies, this application is a demonstration of a website with editable content.  This CMS uses <a href="http://www.tinymce.com">TinyMCE</a> to edit and send updated page content. All content is retrieved from and written to a Mongo database. <br>The features include: admin login, sessions, and editable content.',
			video : 'assets/videos/cms_demonstration.webm',
		}
	}
	
	res.render('project-template.jade', projectObj[page]); // bracket notation works for varible properties, nice.
}

/* POSTs */
exports.contactPost = function(req, res){
// creates a file containing the JSON of a user message. 
	if(!req.body.data){res.send(err); return}

	var message = JSON.parse(req.body.data);
	var options = {encoding:'utf8', flag:'w'};

	// Validate email. ( RegEx aquired from http://emailregex.com/ )
	if(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(message.email)){
		fs.writeFile(__dirname+'/../admin/messages/'+message.id, req.body.data, options, function(err){
			if (err) {
				console.log(err);
				res.send(err)
			} else {
				console.log('You have recieved a message from: ' + message.name);
				res.send('200');
			}
		});
	} else {
		res.send('invalid');
	}
}
