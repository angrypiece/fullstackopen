const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes == mostLikes);
};

const mostBlogs = (blogs) => {
  const authorBlogs = _.groupBy(blogs, "author");

  const authors = _.map(authorBlogs, (authorBlogs, author) => { // value, key|index, collection
    return {
      author,
      blogs: authorBlogs.length,
    };
  });

  return _.maxBy(authors, "blogs");
  //   return { author: , blogs: };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
