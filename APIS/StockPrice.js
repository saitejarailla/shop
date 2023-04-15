const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.nseindia.com/get-quotes/equity?symbol=ADANIENT')
  .then((response) => {
    // console.log(response.data)
    const $ = cheerio.load(response.data);
    // const title = $('quoteLtp').text();
    const heading = $('#quoteLtp').text();
    
    // console.log(title);
    console.log(heading);
  })
  .catch((error) => {
    console.log(error);
  });
