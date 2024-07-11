import express from 'express'
import AllRoutes from "./routes/index.js";
import dotenv from "dotenv";
import  mongoose from 'mongoose';
const app = express();
dotenv.config();
app.use(express.json());

app.post("/", function (req, res) {
 res.send("working.");
});

app.use('/api/v1', AllRoutes)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected."));

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
  });