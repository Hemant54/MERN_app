import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import api from './api';
import customResponse from './providers/responseExtend';
import validator from './api/helper/validate'; 
const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());
app.use(customResponse);
app.use(validator);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.withResponse(err.message, null, err.status || 500);
});

export default app;
