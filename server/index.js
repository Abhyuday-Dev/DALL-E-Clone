import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
dotenv.config();

const PORT=process.env.PORT ||9000;





const app = express();
app.use(cors());
app.use((err, req, res, next) => {
  if (err.name === 'CORSError') {
    console.log('CORS Error:', err.message);
  }
  next(err);
});
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});


app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message:"hello from dall-e",
  })
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () => console.log("Server started on port 9000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
