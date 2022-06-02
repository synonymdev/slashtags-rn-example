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

import sodium from "react-native-libsodium";
import bint from 'bint8array';

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

const doSlashtags = () => {
  alert("TODO");
};

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Button title='Do a libsodium' onPress={doSodium} />
        <Button title='Do a slashtag' onPress={doSlashtags} />
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
