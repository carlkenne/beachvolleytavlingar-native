import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Separator from '../../../components/separator'
import Anmalningslista from './anmalningslista'

const HEADER_HEIGHT = 270

class AnmalningslistaTab extends Component {
  constructor(args) {
    super(args)
    this.scrollToList = this.scrollToList.bind(this)
  }

  scrollToList(header) {
    if (header === 'Damer') {
      this.props.scrollTo(HEADER_HEIGHT)
    } else if (header === 'Herrar') {
      this.props.scrollTo(HEADER_HEIGHT + this.damerListHeight)
    }
  }

  render() {
    return (
      <View>
        <Anmalningslista
          header="Damer"
          teams={this.props.damer}
          scrollToList={this.scrollToList}
          onLayout={event => {
            this.damerListHeight = event.nativeEvent.layout.height
          }}
        />
        <Separator />
        <Anmalningslista
          header="Herrar"
          teams={this.props.herrar}
          scrollToList={this.scrollToList}
        />
      </View>
    )
  }
}

AnmalningslistaTab.propTypes = {
  damer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  herrar: PropTypes.arrayOf(PropTypes.shape).isRequired,
  scrollTo: PropTypes.func.isRequired,
}

export default AnmalningslistaTab
