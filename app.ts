import express from 'express';
import morgan from 'morgan';
import { router } from './routes';
const app = express();
app.use(morgan('dev'));

// Router
app.use('/', router);

// app.use(function (err, req, res: NextFunction) {
//   res.send('error');
// });

export default app;
