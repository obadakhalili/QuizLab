const router = require("./router");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/v1", router);

const port = process.env.PORT;

app.listen(port, e => {
  if (e) {
    console.log("Could not start listening to server\n", e);
    return process.exit(1);
  }
  console.log("Server is up and running on port %d", port);
});
