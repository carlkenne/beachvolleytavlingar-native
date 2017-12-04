'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components/native'
import TournamentListRow from './TournamentListRow'
import TournamentDetails from '../tournamentDetails'
import * as actions from './actions'
import { AdjacentRowHighlighted, RowSeparator } from '../listComponents'

const SectionHeader = styled.Text`
  padding-left: 10;
  padding-top: 30;
  padding-bottom: 8;
  background-color: transparent;
`

const Container = styled.ImageBackground`
  flex: 1;
`

class TournamentList extends Component {
  static _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return adjacentRowHighlighted ? (
      <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
    ) : (
      <RowSeparator key={`${sectionID}-${rowID}`} />
    )
  }

  componentDidMount() {
    this.props.actions.getTournamentList()
  }

  _getVisibleTournaments() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: this._getSectionData.bind(this),
    })

    const tournaments = {}
    if (
      this.props.tournamentList.loaded &&
      this.props.tournamentList.tournamentData
    ) {
      const types = this.props.filter.levels
        .filter(lvl => lvl.value === true)
        .map(lvl => lvl.type)
      for (const key in this.props.tournamentList.tournamentData) {
        tournaments[key] = this.props.tournamentList.tournamentData[key].filter(
          td => types.indexOf(td.type) > -1,
        )
      }
    }

    return dataSource.cloneWithRowsAndSections(tournaments)
  }

  _getSectionData(data, sectionID) {
    // Add nuvarande...
    const header = this.props.tournamentList.sectionHeaders[sectionID]
    return `${header.name} (${header.date.duration})`.toUpperCase()
  }

  render() {
    return (
      <Container
        source={require('../../../resources/sand.png')}
        style={{ width: null, height: null }}
      >
        <ListView
          dataSource={this._getVisibleTournaments()}
          renderRow={tournamentInfo => (
            <TournamentListRow
              tournamentInfo={tournamentInfo}
              onPress={() => {
                this.props.navigator.push({
                  component: TournamentDetails,
                  title: tournamentInfo.name,
                  passProps: { tournamentInfo },
                })
              }}
            />
          )}
          renderSectionHeader={sectionHeader => (
            <SectionHeader>{sectionHeader}</SectionHeader>
          )}
          renderSeparator={this._renderSeparator}
        />
      </Container>
    )
  }
}

TournamentList.propTypes = {
  actions: PropTypes.shape({
    getTournamentList: PropTypes.func.isRequired,
  }).isRequired,
  tournamentList: PropTypes.shape().isRequired,
  filter: PropTypes.shape().isRequired,
  navigator: PropTypes.shape().isRequired,
}

export default connect(
  state => ({
    tournamentList: state.tournamentList,
    filter: state.filter,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(TournamentList)
