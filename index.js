const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("AK Bot is running...");
});

// Auto reply logic
app.post("/webhook", (req, res) => {
    let body = req.body;

    if (body.object === "page") {
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];

            console.log(webhook_event);

            // এখানে রিপ্লাই লজিক
            if (webhook_event.message) {
                console.log("Message received:", webhook_event.message.text);
            }
        });

        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("AK Bot is running on port 3000");
});
