const express = require('express');
const Pusher = require('pusher');

const router = express.Router();

const appId = "1723682"
const key = "00103b493ef2c209e535"
const secret = "a6fbde6bc9697653c5f6"
const cluster = "us2"

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});


router.post(`/event`, function (req, res) {
  const { event, data } = req.body;

  console.log(event)

  pusher.trigger("presence-vortic", event, data);

  res.status(200).json({ event, data })
});

router.post("/auth", function (req, res) {
  const { socket_id, channel_name, id, name, email } = req.body;

  const socketId = socket_id;
  const channel = channel_name;

  const presenceData = {
    user_id: id,
    user_info: { name, email },
  };

  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
});

module.exports = router;
