const mongoose = require("mongoose");
const username = "Razzaq";
const password = "Razzaq@2003";
const cluster = "cluster0";
const uri = "mongodb+srv://Razzaq:Razzaq%402003@cluster0.pysaqrm.mongodb.net/userDB";
mongoose.connect(
  uri, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to Cluster0 MongoDB");
});
