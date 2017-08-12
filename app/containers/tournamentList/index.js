'use strict'
import React, { Component, PropTypes } from 'react'
import {
  ListView,
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TournamentListRow from './TournamentListRow'
import TournamentDetails from '../tournamentDetails'
import * as actions from './actions';

const styles = StyleSheet.create({
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
class TournamentList extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getTournamentList: PropTypes.func.isRequired
    }).isRequired,
    tournamentList: PropTypes.shape().isRequired,
    filter: PropTypes.shape().isRequired,
    navigator: PropTypes.shape().isRequired
  }

  static _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={adjacentRowHighlighted ? styles.separatorAdjacentRowHighlighted : styles.separator}
      />
    );
  }

  componentDidMount() {
    this.props.actions.getTournamentList();
  }

  _getVisibleTournaments() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: this._getSectionData.bind(this)
    });

    const tournaments = {}
    if (this.props.tournamentList.loaded && this.props.tournamentList.tournamentData) {
      const types = this.props.filter.levels
        .filter((lvl) => lvl.value === true)
        .map((lvl) => lvl.type);
      for (const key in this.props.tournamentList.tournamentData) {
        tournaments[key] = this.props.tournamentList.tournamentData[key]
          .filter((td) => types.indexOf(td.type) > -1);
      }
    }

    return dataSource.cloneWithRowsAndSections(tournaments);
  }

  _getSectionData(data, sectionID) {
    return this.props.tournamentList.sectionHeaders[sectionID];
  }

  render() {
    return (
      <Image source={require('../../../resources/sand.png')} style={styles.container}>
        <ListView
          dataSource={this._getVisibleTournaments()}
          renderRow={(tournamentInfo) =>
            (<TournamentListRow
              tournamentInfo={tournamentInfo}
              onPress={() => {
                this.props.navigator.push({
                  component: TournamentDetails,
                  title: tournamentInfo.name,
                  passProps: { tournamentInfo }
                })
              }}
            />)
          }
          renderSectionHeader={(sectionHeader) =>
            <Text style={styles.sectionHeader}>{sectionHeader}</Text>
          }
          renderSeparator={this._renderSeparator}
        />
      </Image>
    );
  }
}

export default connect(state => ({
  tournamentList: state.tournamentList,
  filter: state.filter,
}),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TournamentList);
