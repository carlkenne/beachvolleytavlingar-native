import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Separator from '../../../components/separator'
import Loading from '../../../components/loading'
import ShortAnmalningslista from '../shortList'
import { fetchAnmalningslista } from './epic'
import FullAnmalningslista from './fullAnmalningslistaPage'
import { tournamentDetailsShape, teamShape } from '../propTypes'
import AnmalningslistaRow from './anmalningslistaRow'

class AnmalningslistaTab extends Component {
  componentDidMount() {
    this.props.fetchAnmalningslista(this.props.tournamentDetails)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.classes === undefined &&
      this.props.tournamentDetails !== nextProps.tournamentDetails
    ) {
      this.props.fetchAnmalningslista(this.props.tournamentDetails)
    }
  }

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
    if (this.props.loading) {
      return <Loading />
    }
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
  loading: PropTypes.bool,
  navigator: PropTypes.shape().isRequired,
  tournamentDetails: tournamentDetailsShape.isRequired,
  fetchAnmalningslista: PropTypes.func.isRequired
}

export default connect(
  state => ({
    ...state.anmalningslista
  }),
  {
    fetchAnmalningslista
  }
)(AnmalningslistaTab)
