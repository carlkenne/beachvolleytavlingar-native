'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  Navigator
} from 'react-native';

export default class TournamentDetails extends Component {
  static propTypes = {
    tournament: PropTypes.object.isRequired,
  }

  render() {
    return (
        <View style={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
          <Text>{this.props.tournament.name}</Text>
          <Text>{this.props.tournament.club}</Text>
          <Text>{this.props.tournament.date}</Text>
        </View>
    );
  }
} 
