import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Separator from '../../../components/separator'
import ShortAnmalningslista from '../shortList'
import { fetchAnmalningslista } from './epic'
import FullAnmalningslista from './fullAnmalningslistaPage'
import { tournamentDetailsShape, teamShape } from '../propTypes'
import AnmalningslistaRow from './anmalningslistaRow'
import TabLoader from '../tabLoader'

/* eslint-disable react/no-multi-comp */
class AnmalningslistaTab extends Component {
  seAll = header => {
    this.props.navigator.push({
      component: FullAnmalningslista,
      title: header,
      passProps: {
        teams: this.props.classes.find(c => c.name === header).teams
      }
    })
  }

  render() {
    const classes = this.props.classes.map(c => (
      <ShortAnmalningslista
        key={c.name}
        header={c.name}
        rows={c.teams}
        seAll={this.seAll}
        renderRow={(team, even) => (
          <AnmalningslistaRow key={team.id} item={team} even={even} />
        )}
      />
    ))
    return (
      <View>
        {classes}
        <Separator />
      </View>
    )
  }
}

AnmalningslistaTab.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      teams: PropTypes.arrayOf(teamShape).isRequired
    })
  ).isRequired,
  navigator: PropTypes.shape().isRequired
}

class AnmalningslistaTabLoader extends Component {
  render() {
    return (
      <TabLoader
        fetch={this.props.fetchAnmalningslista}
        {...this.props}
        component={AnmalningslistaTab}
      />
    )
  }
}

AnmalningslistaTabLoader.propTypes = {
  loading: PropTypes.bool,
  tournamentDetails: tournamentDetailsShape,
  fetchAnmalningslista: PropTypes.func.isRequired
}

export default connect(
  state => ({
    ...state.anmalningslista
  }),
  {
    fetchAnmalningslista
  }
)(AnmalningslistaTabLoader)
