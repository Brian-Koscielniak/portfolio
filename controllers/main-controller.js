/* includes */
var fs = require('fs');

/* render pages */
exports.home = function(req, res){
	res.render('index.jade');
}
exports.info = function(req, res){
	res.render('info.jade');
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
	var message = JSON.parse(req.body.data);
	var options = {encoding:'utf8', flag:'w'};
	fs.writeFile(__dirname+'/../admin/messages/'+message.id, req.body.data, options, function(err){
		if (err) {
			console.log(err);
			res.send(err)
		} else {
			console.log('You have recieved a message.');
			res.send('200');
		}
	});
}
