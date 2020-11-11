const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
  keyId: process.env.keyId,
  secretKey: process.env.secretKey,
  paper: true,
  usePolygon: false
})

module.exports = alpaca;
