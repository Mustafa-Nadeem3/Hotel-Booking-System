const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const indexRouter = require("./routes/index");
const newsletterRouter = require("./routes/newsletter");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const commentRouter = require("./routes/comment");
const paymentRouter = require("./routes/payment");

app.use("/", indexRouter);
app.use("/newsletter", newsletterRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/comment", commentRouter);
app.use("/payment", paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
