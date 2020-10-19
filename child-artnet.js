var dmxlib = require('@stefang/dmxnet');

var dmxnet = new dmxlib.dmxnet({
  verbose: 0,
});

var sender = dmxnet.newSender({
  ip: '192.168.68.115',
  subnet: 0,
  universe: 0,
  net: 0,
});

process.on('message', (msg) => {
  console.log(msg);
  for (const [key, value] of Object.entries(msg)) {
    sender.prepChannel(parseInt(key), value);
  }
  sender.transmit();
});