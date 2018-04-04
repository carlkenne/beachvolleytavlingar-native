import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/loading'

export default class TabLoader extends Component {
  state = {
    initialized: false
  }

  componentDidMount() {
    if (this.props.argsForFetch) {
      requestAnimationFrame(() => {
        this.props.fetch(this.props.argsForFetch)
        this.setState({ initialized: true })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.argsForFetch !== nextProps.argsForFetch) {
      if (nextProps.argsForFetch) {
        this.props.fetch(nextProps.argsForFetch)
        this.setState({ initialized: true })
      }
    }
  }

  render() {
    console.log('render ', this.props)
    if (this.props.loading || !this.state.initialized) {
      return <Loading />
    }
    console.log('render after loading ' + this.props)

    return <this.props.component {...this.props} />
  }
}

TabLoader.propTypes = {
  loading: PropTypes.bool,
  argsForFetch: PropTypes.shape({}),
  fetch: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired
}
