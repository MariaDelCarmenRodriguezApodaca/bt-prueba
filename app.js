const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    token = 'EAAfFdXuKyV8BADolijnyOaa5IWUYMdyrKp3npkLXvnVorv50Qj8qlrgldZAUhtXnfyfgc5LPXvv8mU7bPHenxdd4v8xNED1drTnJSxxONNhhUhlrrNXsY9cgZBVVlPrRURQ3rA6QBAS2soWyzZC0JVZBPtY7TY8XndEyPnRoxixXBiFAgDcw',
    request = require('request');

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched


        body.entry.forEach(function(entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "Este_es_mi_token_de_verificacion"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});


// Maneja los eventos de los mensajes
function handleMessage(sender_psid, received_message) {

}


// Maneja las devoluviones de los mensajes
function handlePostback(sender_psid, received_postback) {

}

//Envía mensajes de respuesta a través de la API de envío.
function callSendAPI(sender_psid, response) {

}

module.exports = app;