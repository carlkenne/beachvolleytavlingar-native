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
    this.damer = this.props.damer || [
      {
        name: 'Stina Persson / Matilda Gustavsson 1',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2',
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 2',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2',
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 3',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '3',
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 4',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '4',
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 5',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '5',
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 6',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '6',
      },
    ]
    this.herrar = this.props.herrar || [
      {
        name: 'Carl Kenne / Matilda Gustavsson 1',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '1',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 2',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 3',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '3',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 4',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '4',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 5',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '5',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 6',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '6',
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 7',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '7',
      },
    ]
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
  damer: PropTypes.arrayOf(PropTypes.shape),
  herrar: PropTypes.arrayOf(PropTypes.shape),
  scrollTo: PropTypes.func.isRequired,
}

export default AnmalningslistaTab
