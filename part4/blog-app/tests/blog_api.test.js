const { test, beforeEach, after, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test("blog post id is not _id", async () => {
    const res = await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert(!res.body[0]._id);
    assert(res.body[0].id);
  });

  test("valid blog can be added", async () => {
    const newBlog = {
      title: "new blog",
      author: "new author",
      url: "new url",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((r) => r.title);
    assert(contents.includes("new blog"));
  });

  test("if likes is missing default to 0", async () => {
    const noLikesBlog = {
      title: "new blog",
      author: "new author",
      url: "new url",
    };

    await api
      .post("/api/blogs")
      .send(noLikesBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    const blogsInDb = await helper.blogsInb();
    const likes = blogsInDb.map((b) => b.likes);

    assert.strictEqual(res.body.length, helper.initialBlogs.length + 1);
    assert.strictEqual(likes.at(-1), 0);
  });

  test("if title or url is missing response 400", async () => {
    const noTitle = {
      author: "new author",
      url: "new url",
    };

    const noLikes = {
      author: "new author",
      url: "new url",
    };

    await api.post("/api/blogs").send(noTitle).expect(400);

    await api.post("/api/blogs").send(noLikes).expect(400);

    const res = await api.get("/api/blogs");

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test("blog can be deleted", async () => {
    const blogsBefore = await helper.blogsInb();

    await api.delete(`/api/blogs/${blogsBefore[0].id}`).expect(204);

    const blogsAfter = await helper.blogsInb();
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length - 1);
  });

  test("blog can be updated", async () => {
    const blogsBefore = await helper.blogsInb();
    const blogToUpdate = blogsBefore[0];

    blogToUpdate.title = "updated";
    blogToUpdate.author = "updater";
    blogToUpdate.url = "updating.com";
    blogToUpdate.likes = 123;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInb();
    assert.strictEqual(blogsAfter.length, blogsAfter.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
