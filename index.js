import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
