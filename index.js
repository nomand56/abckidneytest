const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
require("./utils/connectdb");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/admin/quizRoutes");


app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1", userRouter);
app.use("/api/v1", quizRouter);
app.use("/api/v1", require("./routes/admin/sectionRoutes"));
app.use("/api/v1", require("./routes/admin/chapterRoutes"));
app.use("/api/v1", require("./routes/admin/videosRoutes"));
app.use("/api/v1", require("./routes/openAccess"));




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log("App started at port:", PORT);
});