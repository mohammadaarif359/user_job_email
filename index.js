const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require('dotenv').config()
require("./mail/transporter");
require("./processors/index");
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get('/',(req,res,next)=>{
  res.send("server running")
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then((success) => console.log("Mongodb connected successfully..."))
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));
