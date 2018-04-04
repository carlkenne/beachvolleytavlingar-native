import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/loading'
import { tournamentDetailsShape } from './propTypes'

export default class TabLoader extends Component {
  state = {
    initialized: false
  }

  componentDidMount() {
    if (this.props.tournamentDetails) {
      requestAnimationFrame(() => {
        this.props.fetch(this.props.tournamentDetails)
        this.setState({ initialized: true })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tournamentDetails !== nextProps.tournamentDetails) {
      if (nextProps.tournamentDetails) {
        this.props.fetch(nextProps.tournamentDetails)
        this.setState({ initialized: true })
      }
    }
  }

  render() {
    if (this.props.loading || !this.state.initialized) {
      return <Loading />
    }
    return <this.props.component {...this.props} />
  }
}

TabLoader.propTypes = {
  loading: PropTypes.bool,
  tournamentDetails: tournamentDetailsShape,
  fetch: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired
}
