/* eslint-disable */
const axios = require('axios');
exports.handler = async function (event, context) {
  try {
    const { data } = await axios('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
