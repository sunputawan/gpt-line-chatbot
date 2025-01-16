import express from 'express'
import { client , middlewareComponent } from './components/line.js';
import { chatCompletion } from './components/openai.js';

const app = express();
app.use(middlewareComponent);

app.post('/webhook', async (req, res) => {
    try {
        const events = req.body.events;
        return (events.length > 0) ? await events.map(item => handleEvent(item)) : res.status(200).send("OK");
    } catch(error) {
        res.status(500).end();
    }
});

const handleEvent = async (event) => { // handle any interact from users
    console.log(event);
    if (event.type !== 'message') { // ignore all non-message events
        return Promise.resolve(null);
    }

    const replyMessage = (event.message.type === 'text') ? 
    await chatCompletion(event.message.text) : 
    "Sorry!\nWe weren't be able to recieve any data other than a text!";

    // console.log(replyMessage);

    return client.replyMessage({
        replyToken: event.replyToken,
        messages: [{ 
            type: 'text', 
            text: replyMessage,
        }],
    });
}

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});