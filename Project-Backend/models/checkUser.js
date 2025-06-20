const mongoose = require("mongoose");
const User = require("./User"); // Adjust path based on your project structure

mongoose.connect("mongodb+srv://s51741248:h2ZNgA7GILexRGbN@cluster0.82ebe.mongodb.net/dustcollector?retryWrites=true&w=majority&appName=Cluster0&ssl=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkUser() {
  try {
    const user = await User.findOne({ email: "abhi@gmail.com" });
    if (user) {
      console.log("User found:", user);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    mongoose.connection.close();
  }
}

checkUser();
