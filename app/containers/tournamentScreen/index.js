import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SegmentedControlIOS } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Separator from '../../components/separator'
import SideMargins from './sideMargins'
import DetailsTab from './detailsTab'
import AnmalningslistaTab from './anmalningsListaTab'
import SpelschemaTab from './spelschemaTab'
import { tournamentDetailsShape } from './propTypes'
import { tournamentInfoShape } from '../propTypes'
import { isOldDate } from '../../utils/date'

const Header = styled.Text`
  font-weight: bold;
`

const SubHeader = styled.Text`
  margin-bottom: 5;
`

const TopImage = styled.Image`
  flex: 1;
  align-self: stretch;
  height: 130;
`

const TopBottomMargins = styled.View`
  margin-top: 5;
  margin-bottom: 5;
`

class TournamentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
  }

  render() {
    const tabs = [
      'info',
      'anmälningslista',
      isOldDate(this.props.tournamentInfo.date) ? 'resultat' : 'spelschema'
    ]
    return (
      <ScrollView>
        <TopImage
          source={require('../../../resources/arenas/gbc.png')}
          style={{ width: undefined }}
          resizeMode="contain"
        />
        <SideMargins>
          <Header>{this.props.tournamentInfo.originalName}</Header>
          <SubHeader>{this.props.tournamentInfo.club} </SubHeader>
          <TopBottomMargins>
            <SegmentedControlIOS
              values={tabs}
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
          <DetailsTab tournamentInfo={this.props.tournamentInfo} />
        )}
        {this.state.selectedIndex === 1 && (
          <AnmalningslistaTab
            tournamentDetails={this.props.tournamentDetails.details}
            navigator={this.props.navigator}
          />
        )}
        {this.state.selectedIndex === 2 && (
          <SpelschemaTab
            tournamentDetails={this.props.tournamentDetails.details}
            navigator={this.props.navigator}
          />
        )}
      </ScrollView>
    )
  }
}

TournamentScreen.propTypes = {
  tournamentInfo: tournamentInfoShape.isRequired,
  tournamentDetails: PropTypes.shape({
    details: tournamentDetailsShape,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  navigator: PropTypes.shape().isRequired
}

export default connect(state => ({
  tournamentDetails: state.tournamentDetails
}))(TournamentScreen)
