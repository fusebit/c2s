var express = require('express');
var path = require('path');
var logger = require('morgan');

var catRouter = require('./routes/cat');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/cat', catRouter);
app.use((err, req, res, next) => {
    const status = err.statusCode || err.status || 500;
    res.status(status).json({ status, message: err.message });
});

module.exports = app;
