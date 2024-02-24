require("dotenv").config();

/*const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;*/
    
const PORT = 3003
const MONGODB_URI = "mongodb+srv://githubhyfullstack:KHFoArk8Mx2f1PGA@cluster0.48clkfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const SECRET='109365091623956108634871293845927634987562983746592643'

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
