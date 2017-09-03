import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Separator from '../../../components/separator'
import Anmalningslista from './anmalningslista'

class AnmalningslistaTab extends Component {
  render() {
    return (
      <View>
        <Anmalningslista
          header="Damer"
          teams={this.props.damer}
          scrollTo={this.props.scrollTo}
        />
        <Separator />
        <Anmalningslista
          header="Herrar"
          teams={this.props.herrar}
          scrollTo={this.props.scrollTo}
        />
      </View>
    )
  }
}

AnmalningslistaTab.propTypes = {
  damer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  herrar: PropTypes.arrayOf(PropTypes.shape).isRequired,
  scrollTo: PropTypes.func.isRequired
}

export default AnmalningslistaTab
