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

const SectionHeader = styled.Text`
  paddingLeft: 10;
  paddingTop: 30;
  paddingBottom: 8;
  backgroundColor: transparent;
`

const Container = styled.Image`flex: 1;`

const AdjacentRowHighlighted = styled.View`
  height: 4;
  backgroundColor: #3b5998;
`

const Separator = styled.View`
  height: 1;
  backgroundColor: #cccccc;
`

class TournamentList extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getTournamentList: PropTypes.func.isRequired
    }).isRequired,
    tournamentList: PropTypes.shape().isRequired,
    filter: PropTypes.shape().isRequired,
    navigator: PropTypes.shape().isRequired
  }

  componentDidMount() {
    this.props.actions.getTournamentList()
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return adjacentRowHighlighted ? (
      <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
    ) : (
      <Separator key={`${sectionID}-${rowID}`} />
    )
  }

  _getVisibleTournaments() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: this._getSectionData.bind(this)
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
          td => types.indexOf(td.type) > -1
        )
      }
    }

    return dataSource.cloneWithRowsAndSections(tournaments)
  }

  _getSectionData(data, sectionID) {
    return this.props.tournamentList.sectionHeaders[sectionID]
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
                  passProps: { tournamentInfo }
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

export default connect(
  state => ({
    tournamentList: state.tournamentList,
    filter: state.filter
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TournamentList)
