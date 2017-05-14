'use strict';


exports = module.exports = function(app, mongoose) {
  var postSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, default: '' },
    img: {type: String},
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
