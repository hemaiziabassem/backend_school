const express = require("express");
const db_connect = require("./config/db");
const dotenv = require("dotenv");
const swaggerSetup = require("./swagger");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

db_connect();

app.use("/user", require("./routes/user"));

swaggerSetup(app);

app.listen(PORT, () => {
  console.log("server start working");
});
