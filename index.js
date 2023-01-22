import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import router from './routes/auth.js';

dotenv.config();

const app = express();
const port = 5000;
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/user', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
