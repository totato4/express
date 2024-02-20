const express = require("express");
let dotenv = require("dotenv").config();
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const clothesRouter = require("./routes/clothes.routes");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const PORT = process.env.PORT || 5000;
const url = process.env.POSTGRES_URL;
const app = express();

app.use(express.json());
app.use("/api", cors(corsOptions), userRouter);
app.use("/api", cors(corsOptions), postRouter);
app.use("/api", cors(corsOptions), clothesRouter);

// app.listen(process.env.PORT, () =>
//   console.log(`server started, port: ${PORT}`)
// );

app.listen(PORT, () => console.log(`server started, port: ${PORT}`));
