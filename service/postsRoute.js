var posts = {
find: function(req, res, next){

		req.app.db.models.Post.find({},function(err, posts){
			res.json(posts);
		});
	},
add: function(req, res, next){
	if (!req.files) console.log('No files were uploaded.');
	console.log('posting ',req.headers ,'form ', req.form)

	}
}


module.exports = posts