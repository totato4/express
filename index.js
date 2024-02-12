const express = require("express");
// const cors = require("cors");
let dotenv = require("dotenv").config();
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const PORT = process.env.PORT || 5000;
const url = process.env.POSTGRES_URL;
const app = express();

app.use(express.json());
// app.use(cors({ origin: "*" }));
app.use("/api", userRouter);
app.use("/api", postRouter);

// app.listen(process.env.PORT, () =>
//   console.log(`server started, port: ${PORT}`)
// );

app.listen(PORT, () => console.log(`server started, port: ${PORT}`));
