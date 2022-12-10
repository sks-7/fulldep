const express = require('express');
require('dotenv').config();
const { connection } = require('./config/db');
const { userController } = require('./routes/user.route');
const { blogController } = require('./routes/blog.route');
const cors = require('cors');
const { authentication } = require('./middleware/Authentication');

const PORT = process.env.PORT;
console.log(PORT);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
  res.send("welcome to my website")
})

app.use('/user', userController);
app.use(authentication);

app.use('/blog', blogController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Connected to db');
  } catch (err) {
    console.log(err);
  }
  console.log(`Server started at ${PORT}`);
});
