var posts = {
find: function(req, res, next){

		req.app.db.models.Post.find({},function(err, posts){
			res.json(posts);
		});
	}
}


module.exports = posts