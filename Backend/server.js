import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import db from './db.js';
import userRoute from './Routes/User.route.js';

const app = express();

configDotenv();
app.use(cors());
app.use(express.json());

db();

app.use('/User', userRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `server is append and running in http://localhost:${process.env.PORT}`
  );
});
