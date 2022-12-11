const { Router } = require('express');
require('dotenv').config();

const { blogModel } = require('../models/blog.model');

const blogController = Router();

blogController.get('/', async (req, res) => {
  const query = req.query;
  console.log(query);
  const blogs = await blogModel.find(query);
  res.send(blogs);
});

blogController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.send(user);
});

blogController.post('/create', async (req, res) => {
  const { Title, Category, Author, Content, userId } = req.body;
  const blog = new blogModel({
    Title,
    Category,
    Author,
    Content,
    userId,
  });
  try {
    await blog.save();
    res.send('Blog created');
  } catch (err) {
    res.send('Something went wrong');
  }
});

blogController.delete('/delete/:blogId', async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  const deleteBlog = await blogModel.findOneAndDelete({
    _id: blogId,
    userId: req.body.userId,
  });
  if (deleteBlog) {
    res.send('Blog deleted successfully');
  } else {
    res.send("Couldn't deleted");
  }
});
blogController.patch('/edit/:blogId', async (req, res) => {
  const { blogId } = req.params;
  const editBlog = await blogModel.findOneAndUpdate(
    { _id: blogId, userId: req.body.userId },
    req.body
  );
  if (editBlog) {
    res.send('Blog deleted successfully');
  } else {
    res.send("Couldn't deleted");
  }
});

module.exports = {
  blogController,
};
