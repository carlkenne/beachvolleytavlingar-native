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

export default class TournamentDetailsInfo extends Component {
  static propTypes = {
    tournamentInfo: PropTypes.object.isRequired,
  }

  render() {
    return (
        <View style={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
          <Text>Poängtabell</Text>
          <Text>{this.props.tournamentInfo.name}</Text>
          <Text>{this.props.tournamentInfo.club}</Text>
          <Text>{this.props.tournamentInfo.date}</Text>
        </View>
    );
  }
}
