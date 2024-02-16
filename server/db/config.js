const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
