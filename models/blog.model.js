const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Category: { type: String, required: true },
  Author: { type: String, required: true },
  Content: { type: String, required: true },
  userId: { type: String, required: true },
});
const blogModel = mongoose.model('blog', blogSchema);

module.exports = {
  blogModel,
};
