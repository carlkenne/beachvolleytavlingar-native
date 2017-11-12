/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class beachvolleytavlingar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Reacts Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'} h
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    background-color: '#F5FCFF',
  },
  welcome: {
    font-size: 20,
    text-align: 'center',
    margin: 10,
  },
  instructions: {
    text-align: 'center',
    color: '#333333',
    margin-bottom: 5,
  },
});

AppRegistry.registerComponent('beachvolleytavlingar', () => beachvolleytavlingar);
