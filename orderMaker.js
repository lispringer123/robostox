async function orderMaker(alpaca, tradeInfo){
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

module.exports = orderMaker;
