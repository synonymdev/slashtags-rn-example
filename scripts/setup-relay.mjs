import DHT from '@hyperswarm/dht';
import {relay} from '@hyperswarm/dht-relay';
import Stream from '@hyperswarm/dht-relay/ws';
import ws from 'isomorphic-ws';

export const setupRelay = async ({dhtOpts, wsServerOptions} = {}) => {
  const dht = new DHT(dhtOpts);
  await dht.ready();
  const server = new ws.Server(wsServerOptions || {port: 0});
  server.on('connection', socket => {
    relay(dht, new Stream(false, socket));
  });
  return {
    port: server.address().port,
    closeRelay: () => {
      return Promise.all([dht.destroy(), server.close()]);
    },
  };
};

const main = async () => {
  const {port} = await setupRelay({
    wsServerOptions: {port: 8888},
  });
  const relay = 'ws://localhost:' + port;

  console.log('DHT mainnet Relay: ' + relay);
};

main();
