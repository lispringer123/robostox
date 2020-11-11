var createError = require('http-errors');
var express = require('express');
let PromiseRouter = require('express-promise-router');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
  keyId: process.env.keyId,
  secretKey: process.env.secretKey,
  paper: true,
  usePolygon: false
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let router = PromiseRouter();

router.post('/alerts', async function(req, res, next){
  console.log('!!! headers', req.headers);
  console.log('!!! incoming', req.body);
  await orderMaker(req.body);
  res.status(200);
  res.end();
})

app.use(router);

// made this with Terra but it did not work
async function orderMaker(tradeInfo){
  await alpaca.createOrder({
    symbol: tradeInfo["symbol"], // any valid ticker symbol
    qty: tradeInfo['qty'],
    side: 'buy',
    type: 'market',
    time_in_force: 'gtc',
    order_class: 'bracket',
    take_profit: {
      limit_price: tradeInfo["limit_price"] * 1.05,
    },
    stop_loss: {
      stop_price: tradeInfo["limit_price"] * 0.95,
      limit_price: tradeInfo["limit_price"] * 0.94
    }
  })
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
