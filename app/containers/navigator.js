import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  NavigatorIOS,
  Text,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TournamentDetailsTabbar from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar';
import TournamentList from 'beachvolleytavlingar/app/containers/tournamentList';
import TournamentListFilter from 'beachvolleytavlingar/app/containers/tournamentList/TournamentListFilter';
import * as filterActions from '../actions/filterActions';

class Navigator extends Component {
  _showFilterView() {
    this.refs.navigator.push({
      component: TournamentListFilter,
      title: 'filtrera'
    });
  }

  _showTournament(tournamentInfo) {
    this.refs.navigator.push({
      component: TournamentDetailsTabbar,
      title: tournamentInfo.name,
      passProps: { tournamentInfo }
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref = 'navigator'
        initialRoute = {{
          component: TournamentList,
          title: 'Säsongskalendern',
          rightButtonTitle: 'filtrera',
          onRightButtonPress: this._showFilterView.bind(this),
          passProps: {
            onPress: this._showTournament.bind(this),

          }
        }}
        style = {{flex: 1}}
      />
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(filterActions, dispatch)
  })
)(Navigator);
