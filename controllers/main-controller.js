exports.notFound = function(req, res){
	res.render("layout.jade");
}
exports.home = function(req, res){
	res.render("index.jade");
}
