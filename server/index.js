const router = require("./router");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

if (process.env.NODE_ENV === "production") {
  const staticsDir = __dirname + "/dist";
  app.use(express.static(staticsDir));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: staticsDir });
  });
}

const port = process.env.PORT;

app.listen(port, (e) => {
  if (e) {
    console.log("Could not start listening to server\n", e);
    return process.exit(1);
  }
  console.log("Server is up and running on port %d", port);
});
