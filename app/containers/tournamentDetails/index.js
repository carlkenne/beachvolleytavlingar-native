import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SegmentedControlIOS } from 'react-native'
import styled from 'styled-components/native'
import Separator from '../../components/separator'
import SideMargins from './sideMargins'
import InformationTab from './informationTab'
import AnmalningsListaTab from './anmalningsListaTab'
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
  }

  render() {
    return (
      <ScrollView>
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
          <AnmalningsListaTab tournamentInfo={this.props.tournamentInfo} />
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
