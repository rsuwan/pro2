import 'dotenv/config';
import express from 'express';
import initApp from './src/modules/app.router.js';
import cors from 'cors'; 

const app = express();
const PORT = process.env.PORT || 3000;
// app.use(cors());
app.options('*', cors(corsOptions));
initApp(app,express);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

