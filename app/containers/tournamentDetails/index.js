import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SegmentedControlIOS } from 'react-native'
import styled from 'styled-components/native'
import Separator from '../../components/separator'
import SideMargins from './sideMargins'
import InformationTab from './informationTab'
import AnmalningslistaTab from './anmalningsListaTab'
import SpelschemaTab from './spelschemaTab'

const Header = styled.Text`font-weight: bold;`

const SubHeader = styled.Text`marginBottom: 5;`

const TopImage = styled.Image`
  flex: 1;
  alignSelf: stretch;
  height: 130;
`

const TopBottomMargins = styled.View`
  marginTop: 5;
  marginBottom: 5;
`

class TournamentDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }

    this.damer = [
      {
        name: 'Stina Persson / Matilda Gustavsson 1',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2'
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 2',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2'
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 3',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '3'
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 4',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '4'
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 5',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '5'
      },
      {
        name: 'Stina Persson / Matilda Gustavsson 6',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '6'
      }
    ]
    this.herrar = [
      {
        name: 'Carl Kenne / Matilda Gustavsson 1',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '1'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 2',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '2'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 3',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '3'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 4',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '4'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 5',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '5'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 6',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '6'
      },
      {
        name: 'Carl Kenne / Matilda Gustavsson 7',
        club: 'GBC',
        points: '(1030p = 550p + 480p)',
        rank: '7'
      }
    ]
  }

  render() {
    return (
      <ScrollView
        ref={view =>
          !this.state.scrollTo && this.setState({ scrollTo: view.scrollTo })}
      >
        <TopImage
          source={require('../../../resources/arenas/gbc.png')}
          style={{ width: undefined }}
          resizeMode="contain"
        />
        <SideMargins>
          <Header>Trettondagsturneringen - Challenger (CH1)</Header>
          <SubHeader>{this.props.tournamentInfo.club} </SubHeader>

          <TopBottomMargins>
            <SegmentedControlIOS
              values={['info', 'anmälningslista', 'spelschema']}
              selectedIndex={this.state.selectedIndex}
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                })
              }}
            />
          </TopBottomMargins>
        </SideMargins>
        <Separator />
        {this.state.selectedIndex === 0 && (
          <InformationTab tournamentInfo={this.props.tournamentInfo} />
        )}
        {this.state.selectedIndex === 1 && (
          <AnmalningslistaTab
            tournamentInfo={this.props.tournamentInfo}
            damer={this.damer}
            herrar={this.herrar}
            scrollTo={this.state.scrollTo || (() => {})}
          />
        )}
        {this.state.selectedIndex === 2 && (
          <SpelschemaTab tournamentInfo={this.props.tournamentInfo} />
        )}
      </ScrollView>
    )
  }
}

TournamentDetails.propTypes = {
  tournamentInfo: PropTypes.shape().isRequired
}

export default TournamentDetails
