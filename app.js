const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./Routes/users.routes');
const transfersRouter = require('./Routes/transfers.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json);
app.use(cors());

//ROUTES

app.use('/api/v1/users', userRouter);
// app.use('/api/v1/transfers', transfersRouter);
app.all('*', (req, res, next) => {
  return res.status(400).json({
    status: 'err',
    message: 'this direction not exist',
  });
});

module.exports = app;
