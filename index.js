import express from 'express'
import AllRoutes from "./routes/index.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();



app.use(express.json());

app.post("/", function (req, res) {
 res.send("working.");
});

app.use('/api/v1', AllRoutes)


app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
  });