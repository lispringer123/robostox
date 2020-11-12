async function orderMaker(alpaca, tradeInfo){
  await alpaca.createOrder({
    symbol: tradeInfo.symbol,
    qty: tradeInfo.qty,
    side: tradeInfo.side,
    type: tradeInfo.type,
    time_in_force: tradeInfo.time_in_force,
    order_class: tradeInfo.order_class,
    take_profit: {
      limit_price: tradeInfo.order_price * 1.05,
    },
    stop_loss: {
      stop_price: tradeInfo.order_price * 0.95,
      limit_price: tradeInfo.order_price * 0.94
    }
  })
}

module.exports = orderMaker;
