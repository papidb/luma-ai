import express, { Application } from "express";
import config from "config";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import bodyParser from "body-parser";
import compression from "compression";

const port = config.get("port") as number;

const app: Application = express();

app.use(bodyParser.json());
app.use(compression());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
