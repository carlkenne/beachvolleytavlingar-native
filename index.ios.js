/* @flow */
'use strict';
import 'babel-polyfill';

import {
  AppRegistry,
} from 'react-native';

import app from 'beachvolleytavlingar/app/containers/app';

AppRegistry.registerComponent('beachvolleytavlingar', () => app);
