/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import sodium from 'react-native-libsodium';
import bint from 'bint8array';
import './shim.js';
import crypto from 'crypto';
import {SDK} from '@synonymdev/slashtags-sdk';
import {DHT} from 'dht-universal';
import Hyperswarm from 'hyperswarm';
import 'react-native-url-polyfill/auto';

const doSodium = async () => {
  try {
    const rand = new Uint8Array(32);
    sodium.randombytes_buf(rand);
    const hex = bint.toString(rand, 'hex');

    alert(hex);
  } catch (e) {
    console.error(e);
  }
};

const doCrypto = async () => {
  try {
    const hash = crypto
      .createHmac('sha256', 'password')
      .update('something_random_123')
      .digest('hex');

    alert(hash);
  } catch (e) {
    console.error(e);
  }
};

const doDHT = async () => {
  const dhtA = await DHT.create({
    relays: ['ws://localhost:8888'],
  });
  await dhtA.ready();

  const server = dhtA.createServer(conn => {
    alert('Got connection');
  });
  await server.listen();

  const dhtB = await DHT.create({
    relays: ['ws://localhost:8888'],
  });
  await dhtB.ready();

  await dhtB.connect(server.address().publicKey);
};

const doSwarm = async () => {
  const swarmA = new Hyperswarm({
    dht: await DHT.create({
      relays: ['ws://localhost:8888'],
    }),
  });

  const topic = swarmA.keyPair.publicKey;

  swarmA.on('connection', conn => {
    alert('Got connection');
  });

  await swarmA.join(topic).flushed();

  const swarmB = new Hyperswarm({
    dht: await DHT.create({
      relays: ['ws://localhost:8888'],
    }),
  });

  swarmB.join(topic);

  await swarmB.flush();
};

const doSlashtags = async () => {
  try {
    const sdkA = await SDK.init({
      persist: false,
      swarmOpts: {relays: ['ws://localhost:8888']},
    });

    const alice = await sdkA.slashtag({name: 'alice'});

    await alice.setProfile({name: 'Alice'});

    console.log(alice.url.toString());

    const sdkB = await SDK.init({
      persist: false,
      swarmOpts: {relays: ['ws://localhost:8888']},
    });

    const remoteAlice = await sdkB.slashtag({url: alice.url.toString()});
    await remoteAlice.ready();
    console.log('REMOTE ALICE connected:', remoteAlice.publicDrive?.online);

    const profile = await remoteAlice.getProfile();
    console.log(profile);
    alert(profile);
  } catch (e) {
    console.error(e);
  }
};

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Do a libsodium" onPress={doSodium} />
        <Button title="Do a crypto" onPress={doCrypto} />
        <Button title="Do a DHT" onPress={doDHT} />
        <Button title="Do a Swarm" onPress={doSwarm} />
        <Button title="Do a slashtag" onPress={doSlashtags} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
