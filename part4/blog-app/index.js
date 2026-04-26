const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

const app = express();
app.use(express.json());

app.use("/api/blogs",blogRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port: ${config.PORT}`);
});
