import express from "express";
import connectDB from "./libs/dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import tableRouter from "./routes/tableRoutes.js"
import orderRouter from "./routes/orderRoutes.js";
import foodRouter from "./routes/foodRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";


const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors({
origin: process.env.FRONTEND_URL,
credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tables", tableRouter);
app.use('/api/orders', orderRouter);
app.use('/api/foods', foodRouter);
app.use('/api/payments', paymentRouter);



app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> Welcome to Restaurant App </h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server is running: http://localhost:${PORT}`);
 console.log(`CORS allows :${process.env.FRONTEND_URL}`);

});










/*

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/

