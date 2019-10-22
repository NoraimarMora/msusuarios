const amqplib = require('amqplib');

const { MB_URL } = require('../config');

let brokerConnection = null;

const initBroker = () => new Promise(async (resolve, reject) => {
  try {
    const connection = await amqplib.connect(url);
    resolve(connection);
  } catch (error) {
    console.warning(error);
    reject(error);
  }
});

const notify = async (queue, obj) => {
  if (!brokerConnection) {
    brokerConnection = await initBroker(MB_URL);
  }

  await brokerConnection.createChannel()
    .then(ch => ch.assertQueue(queue)
      .then(() => {
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(obj)));
        console.log(`[PUBLISHER] - Sent ${JSON.stringify(ob)}`);
      })
    ).catch(console.warning);
}

module.exports = {
  notify
};
