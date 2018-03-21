import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components/native'
import * as actions from './actions'
import { ListView } from '../../components/listView'

const Container = styled.ImageBackground`
  flex: 1;
`

class RankingList extends Component {
  componentDidMount() {
    this.props.actions.fetchRankingList()
  }

  _getSectionHeader = (data, sectionID) => {
    // Add nuvarande...
    console.log('data: ', data)
    console.log('sectionID: ', sectionID)

    return 'Herrar'
  }

  render() {
    return (
      <Container
        source={require('../../../resources/sand.png')}
        style={{ width: null, height: null }}
      >
        <ListView
          data={this._getVisibleTournaments()}
          renderRow={tournamentInfo => <Text>{tournamentInfo}</Text>}
          getSectionHeader={this._getSectionHeader}
        />
      </Container>
    )
  }
}

RankingList.propTypes = {
  actions: PropTypes.shape({
    fetchRankingList: PropTypes.func.isRequired
  }).isRequired,
  /*  rankingList: PropTypes.shape({
    damer: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    herrar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    mixed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired, */
  navigator: PropTypes.shape({}).isRequired
}

export default connect(
  state => ({
    rankingList: state.rankingList
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(RankingList)
