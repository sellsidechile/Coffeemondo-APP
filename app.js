const express = require("express");
const app = express();
const twilio = require("./twilio");
const dialogflow = require("./dialog");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook",async function (req, res) {
  console.log("req ->", req.body);
  let payload = await dialogflow.sendToDialogFlow(req.body,dialogflow.sessionId);
  let responses = payload.fulfillmentMessages;
  for (const response of responses) {
    await twilio.sendTextMessage(req.body.WaId, req.body.Body);
  }
  res.status(200).json({ ok: true, msg: "Mensaje enviado correctamente" });
});

async function sendMessageToWhatsapp(phone, response) {
  try {
    let payload = await axios.post(
      "https://api.twilio.com/2010-04-01/Accounts/AC0e270509622f6b530ab1cd5888f209bc/Messages",
      {
        to: "whatsapp:+" + phone,
        from: "whatsapp:+14155238886",
        body: response,
      },
    );
    return payload.data;
  } catch (error) {
    console.log(error);
  }
}

app.listen(3000, () => {
  console.log("servidor montado en el puerto 3000");
});
