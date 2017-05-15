var posts = {
find: function(req, res, next){

		req.app.db.models.Post.find({},function(err, posts){
			res.json(posts);
		});
	},
add: function(req, res, next){
	console.log('posting')
	}
}


module.exports = posts