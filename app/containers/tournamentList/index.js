'use strict'
import React, { Component, PropTypes } from 'react'
import {
  ListView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight } from 'react-native'
import TournamentListRow from './TournamentListRow'
import Immutable from 'immutable'
import cloneObject from 'beachvolleytavlingar/app/lib/clone'
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = StyleSheet.create({
  separatorAdjacentRowHighlighted: {
    height: 4,
    backgroundColor: '#3B5998'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  sectionHeader: {
    paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 8,
    backgroundColor: 'transparent'
  },
  container: {
   flex: 1,
   width: null,
   height: null,
 }
});

class TournamentList extends Component
{
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.actions.getTournamentList();
  }

  _getVisibleTournaments() {
    const dataSource = new ListView.DataSource({
      rowHasChanged           : (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionHeaderData    : this._getSectionData.bind(this)
    });

    const tournaments = {}
    if(this.props.state.tournamentList.loaded && this.props.state.tournamentList.tournamentData) {
      const types = this.props.state.filter.levels
        .filter((lvl) => lvl.value === true )
        .map((lvl) => lvl.type);
      for (var key in this.props.state.tournamentList.tournamentData) {
        tournaments[key] = this.props.state.tournamentList.tournamentData[key]
        .filter((td) => types.indexOf(td.type) > -1 );
      }
    }

    return dataSource.cloneWithRowsAndSections(tournaments);
  }

  _getSectionData(data, sectionID) {
    return this.props.state.tournamentList.sectionHeaders[sectionID];
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={ adjacentRowHighlighted ?  styles.separatorAdjacentRowHighlighted : styles.separator }
      />
    );
  }

  render() {
    return (
      <Image source={require('beachvolleytavlingar/resources/sand.png')} style={styles.container}>
        <ListView
          dataSource={this._getVisibleTournaments()}
          renderRow={(tournamentInfo, sectionID, rowID) =>
            <TournamentListRow tournamentInfo={tournamentInfo} onPress={this.props.onPress} />
          }
          renderSectionHeader={(sectionHeader, sectionID) =>
            <Text style={styles.sectionHeader}>{sectionHeader}</Text>
          }
          renderSeparator={this._renderSeparator}
        />
      </Image>
    );
  }
};

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TournamentList);
