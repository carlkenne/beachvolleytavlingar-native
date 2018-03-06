import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Separator from '../../../components/separator'
import Loading from '../../../components/loading'
import KortAnmalningslista from '../kortLista'
import { fetchAnmalningslista } from './epic'
import fullAnmalningslista from './fullAnmalningslista'
import { tournamentDetailsShape, teamShape } from '../propTypes'
import AnmalningslistaRow from './anmalningslistaRow'

class AnmalningslistaTab extends Component {
  constructor(args) {
    super(args)
    this.seAll = this.seAll.bind(this)
  }

  componentDidMount() {
    this.props.fetchAnmalningslista(this.props.tournamentDetails)
  }

  seAll(header) {
    this.props.navigator.push({
      component: fullAnmalningslista,
      title: header,
      passProps: {
        teams: this.props.classes.find(c => c.name === header).teams
      }
    })
  }

  render() {
    console.log('this.props.classes: ', this.props.classes)
    if (this.props.loading) {
      return <Loading />
    }
    const classes = this.props.classes.map(c => (
      <KortAnmalningslista
        key={c.name}
        header={c.name}
        rows={c.teams}
        seAll={this.seAll}
        rowComponent={AnmalningslistaRow}
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
  loading: PropTypes.bool.isRequired,
  navigator: PropTypes.shape().isRequired,
  tournamentDetails: tournamentDetailsShape.isRequired, //eslint-disable-line react/no-typos
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
