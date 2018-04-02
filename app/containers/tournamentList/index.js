import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components/native'
import Loading from '../../components/loading'
import TournamentListRow from './TournamentListRow'
import TournamentDetails from '../tournamentDetails'
import * as actions from './actions'
import { ListView } from '../../components/listView'

const Container = styled.ImageBackground`
  flex: 1;
`

class TournamentList extends Component {
  componentDidMount() {
    this.props.actions.fetchTournamentList()
  }

  _getVisibleTournaments() {
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

    return tournaments
  }

  _getSectionHeader = (data, sectionID) => {
    // Add nuvarande...
    const header = this.props.tournamentList.sectionHeaders[sectionID]
    return `${header.name} (${header.date.getDuration('D MMM')})`.toUpperCase()
  }

  render() {
    return (
      <Container
        source={require('../../../resources/sand.png')}
        style={{ width: null, height: null }}
      >
        {this.props.tournamentList.loading && <Loading />}
        <ListView
          data={this._getVisibleTournaments()}
          renderRow={tournamentInfo => (
            <TournamentListRow
              tournamentInfo={tournamentInfo}
              onPress={() => {
                this.props.navigator.push({
                  component: TournamentDetails,
                  title: tournamentInfo.name,
                  passProps: {
                    tournamentInfo,
                    navigator: this.props.navigator
                  }
                })
              }}
            />
          )}
          getSectionHeader={this._getSectionHeader}
        />
      </Container>
    )
  }
}

TournamentList.propTypes = {
  actions: PropTypes.shape({
    fetchTournamentList: PropTypes.func.isRequired
  }).isRequired,
  tournamentList: PropTypes.shape({
    sectionHeaders: PropTypes.shape({}).isRequired,
    tournamentData: PropTypes.shape({}),
    loaded: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  filter: PropTypes.shape().isRequired,
  navigator: PropTypes.shape().isRequired
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
