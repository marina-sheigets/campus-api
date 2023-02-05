import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { URL_MONGO } from './constants/index';
import AuthRouter from './routes/auth';
import AdminRouter from './routes/admin';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error-middleware';
const app = express();
app.use(function (req: any, res: any, next: any) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);

app.use(errorMiddleware);

mongoose
	.connect(URL_MONGO)
	.then(() => console.log('MongoDB connected'))
	.catch(console.log);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on ' + PORT));
