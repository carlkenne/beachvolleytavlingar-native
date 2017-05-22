'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  Navigator,
  TabBarIOS
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './actions';
import { bindActionCreators } from 'redux';

import TournamentDetailsInfo from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar/TournamentDetailsInfo';
import TournamentDetailsNominations from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar/TournamentDetailsNominations';
import TournamentDetailsPoints from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar/TournamentDetailsPoints';
import TournamentDetailsResults from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar/TournamentDetailsResults';

class TournamentDetailsMaster extends Component {
  static propTypes = {
    tournamentInfo: PropTypes.object.isRequired,
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Info"
          icon={require('beachvolleytavlingar/resources/info-icon25x.png')}
          selected={ this.props.state.selectedTab === 'infoTab'}
          onPress={() =>
            this.props.actions.toggleTab('infoTab')
          }>
          <TournamentDetailsInfo tournamentInfo={this.props.tournamentInfo} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Anmälningslista"
          icon={require('beachvolleytavlingar/resources/player-icon25x.png')}
          selected={this.props.state.selectedTab === 'nominationsTab'}
          onPress={() =>
            this.props.actions.toggleTab('nominationsTab')
          }>
          <TournamentDetailsNominations tournamentInfo={this.props.tournamentInfo} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Poängtabell"
          icon={require('beachvolleytavlingar/resources/laurel25x.png')}
          selected={this.props.state.selectedTab === 'pointsTab'}
          onPress={() =>
            this.props.actions.toggleTab('pointsTab')
          }>
          <TournamentDetailsPoints tournamentInfo={this.props.tournamentInfo} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('beachvolleytavlingar/resources/Trophy.48.png')}
          title="Resultat"
          selected={this.props.state.selectedTab === 'resultsTab'}
          onPress={() =>
            this.props.actions.toggleTab('resultsTab')
          }>
          <TournamentDetailsResults tournamentInfo={this.props.tournamentInfo} />
        </TabBarIOS.Item>
      </TabBarIOS>

    );
  }
}

export default connect(state => ({
    state: state.tournamentDetails
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TournamentDetailsMaster);
