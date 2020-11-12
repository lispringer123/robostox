let alpaca = require("./alpaca");
let orderMaker = require("./orderMaker");

let data = {
  "side": "buy",
  "symbol": "AAPL",
  "type": "market",
  "qty": "2",
  "time_in_force": "gtc",
  "order_class": "bracket",
  "order_price": "119.5"
}

async function main() {
  await orderMaker(alpaca, data);
}

main();
