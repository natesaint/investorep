/**
 * Routes that have to do with information for a stock ticker. This
 * includes information crowdsourced from this website and information
 * from the API where the live stock data is retrieved.
 */
var express = require('express');
var request = require('request');
var auth = require('../middlewares/auth.js');

var router = express.Router();

/**
 * GET information about a stock ticker, essentially a wrapper for the
 * AlphaVantage API. Also gets some crowdsourced information from this
 * websites database.
 *
 * Example: GET /stocks/TIME_SERIES_INTRADAY/AAPL/5min
 * Respone: JSON containing information about the stock
 */
router.get('/:timeSeries/:ticker/:interval', function(req, res) {
  request.get({ url: `https://www.alphavantage.co/query?function=${req.params.timeSeries}&symbol=${req.params.ticker}&interval=${req.params.interval}&apikey=${process.env.AV_API_KEY}` },
    function(error, response, body) {
      if (JSON.parse(body)['Error Message']) {
        console.log('ERROR MESSAGE FROM ALPHAVANTAGE API: ' + JSON.parse(body)['Error Message']);
        res.status(404).json({ error_message: 'Ticker does not exist' });
      } else {
        if (!error && response.statusCode == 200) {
          res.status(200).json(JSON.parse(body));
        } else {
          res.status(404);
        }
      }
    });
});

module.exports = router;
