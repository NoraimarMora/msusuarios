const amqplib = require('amqplib');

const { MB_URL } = require('../config');

let brokerConnection = null;

const initBroker = (url) => new Promise(async (resolve, reject) => {
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
    try {
      brokerConnection = await initBroker(MB_URL);
    } catch (error) {
      console.error('Failed to connect to broker');
      return;
    }
  }

  await brokerConnection.createChannel()
    .then(ch => ch.assertQueue(queue)
      .then(() => {
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(obj)));
        console.log(`[PUBLISHER] - Sent ${JSON.stringify(obj)}`);
      })
    ).catch(console.warning);
}

module.exports = {
  notify
};
