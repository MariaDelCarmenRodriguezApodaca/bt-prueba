'use strict';

// Imports dependencies and set up http server
const app = require('./app');

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));