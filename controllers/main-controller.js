/* includes */
var fs = require('fs');

/* render pages */
exports.home = function(req, res){
	res.render('index.jade');
}
exports.info = function(req, res){
	// Retrieve info text
	fs.readFile(__dirname + '/../public/assets/infoText', 'utf-8', function (err,text) {
		res.render('info.jade', {text : text});
	});
}
exports.projects = function(req, res){
	res.render('projects.jade');
}
exports.contact = function(req, res){
	res.render('contact.jade');
}
exports.blog = function(req, res){
	res.redirect('https://koscielniak.wordpress.com/');
}
exports.notFound = function(req, res){
	res.render('layout.jade');
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
