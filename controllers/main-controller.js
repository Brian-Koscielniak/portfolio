exports.home = function(req, res){
	res.render("index.jade");
}
exports.info = function(req, res){
	res.render("info.jade");
}
exports.projects = function(req, res){
	res.render("projects.jade");
}
exports.contact = function(req, res){
	res.render("contact.jade");
}
exports.blog = function(req, res){
	res.redirect(' https://koscielniak.wordpress.com/');
}
exports.notFound = function(req, res){
	res.render("layout.jade");
}
