// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import initApp from './src/modules/app.router.js';
import connectdb from './db/connection.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(compression());

initApp(app, express);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
