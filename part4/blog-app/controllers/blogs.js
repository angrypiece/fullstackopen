const blogsRouter = require("express").Router();
const { request } = require("express");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, url, author, likes } = request.body;

  const blog = new Blog({ title, url, author, likes });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const blogToDelete = await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, url, author, likes } = request.body;

  const id = request.params.id;

  const blogToUpdate = await Blog.findById(id);

  blogToUpdate.title = title;
  blogToUpdate.url = url;
  blogToUpdate.author = author;
  blogToUpdate.likes = likes;

  await blogToUpdate.save();

  response.status(201).json(blogToUpdate);
});

module.exports = blogsRouter;
