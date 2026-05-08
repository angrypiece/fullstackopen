const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "test blog",
    author: "test author",
    url: "test.url",
    likes: 3,
  },
  {
    title: "test blog2",
    author: "test author2",
    url: "test.url2",
    likes: 1,
  },
];

const blogsInb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInb };
