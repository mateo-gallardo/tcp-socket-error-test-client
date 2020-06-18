const net = require('net');

const IP = '192.168.1.9';
const PORT = 12345;

const objectToSend = { someProp: 1, anotherProp: '2' };
const json = JSON.stringify(objectToSend);
let jsonsSent = 0;

const sendJSON = () => {
  setTimeout(() => {
    const client = new net.Socket();
    client.connect(PORT, IP, () => {
      console.log('Connected');
      client.write(json, () => {
        client.destroy();
      });
    });
    
    client.on('close', () => {
      jsonsSent++;
      console.log(`Connection closed. Sent ${jsonsSent} JSONs so far`);
      sendJSON();
    });
  }, 1000);
};
sendJSON();
