'use strict';


exports = module.exports = function(app, mongoose) {
  var postSchema = new mongoose.Schema({
    
    name: { type: String, default: '' },
    img: { data: Buffer, contentType: String },
    venu: {type: String},
    username: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {type: Date}, 
    search: [String]
  });
  postSchema.plugin(require('./plugins/pagedFind'));
  postSchema.index({ name: 1 });
  postSchema.index({ username: 1 });
  postSchema.index({ date: 1 });
  postSchema.index({ venu: 1 });
  postSchema.index({ search: 1 });
  postSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Post', postSchema);
};
