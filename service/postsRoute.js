var fs = require('fs');

var posts = {
find: function(req, res, next){

		req.app.db.models.Post.find({},function(err, posts){
			res.json(posts);
		});
	},
add: function(req, res, next){
	if (!req.file) console.log('No files were uploaded.');
	console.log('posting ',req.body.title ,'form ', req.file)
	console.log('user ',req.body.username);
	console.log('path ',req.file.path);
	console.log(req.body);

	im = fs.readFileSync(req.file.path);
	
    req.app.db.models.Post.create(
    	{
    		img:{
    			data:im,
    			contentType:req.file.mimetype
    		},
    		username: 'me',
    		date:Date.now()
		}, function(err , image){

			if (err) console.log('error saveing', err );

			fs.unlink('req.file.path', (err) => {
			  if (err) throw err;
			  console.log('successfully deleted /tmp/hello');
			});
   	}) 
//
    
 
	},
image: function(req, res, next){
		var id = req.params.postId;
		console.log('iddd ',id)
		req.app.db.models.Post.findById(id,function(err, post){
			//res.json(posts);
			if(err){
				console.log('err ',err);
			}else{

				console.log('post ',post)
			res.contentType(post.img.contentType);
           	res.send(post.img.data);
          }
		});


	}
}

//
module.exports = posts