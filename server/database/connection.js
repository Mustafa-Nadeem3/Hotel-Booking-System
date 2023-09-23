const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://mustafa007:m007n3000@cluster0.o3n9507.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.on("error", () => console.log("Database Error"));
connection.once("open", () => console.log("Database Connected"));

module.exports = connection;
