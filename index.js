import 'dotenv/config';
import express from 'express';
import initApp from './src/modules/app.router.js';

const app = express();
const port = process.env.PORT || 3000;

initApp(app,express);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

