const express = require("express");
const router = require("./routes/routes");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/", express.static(path.join(__dirname, "./public")));
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(process.env.PORT, () => {
  console.log("[SERVER] Listening on port: " + process.env.PORT);
});
