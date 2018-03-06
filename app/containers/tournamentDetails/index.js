import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SegmentedControlIOS } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import Separator from '../../components/separator'
import SideMargins from './sideMargins'
import DetailsTab from './detailsTab'
import AnmalningslistaTab from './anmalningsListaTab'
import SpelschemaTab from './spelschemaTab'
import { getTournamentDetails } from './epic'
import { tournamentDetailsShape } from './propTypes'

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

class TournamentDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.scrollTo = this.scrollTo.bind(this)
  }

  componentDidMount() {
    this.props.actions.getTournamentDetails(this.props.tournamentInfo.id)
  }

  scrollTo(y) {
    const NAVBAR_HEIGHT = 64
    this.scrollView.scrollTo({ x: 0, y: y - NAVBAR_HEIGHT * 2, animated: true })
  }

  render() {
    console.log('this.props.tournamentDetails: ', this.props.tournamentDetails)
    return (
      <ScrollView
        classNames="aff"
        ref={view => {
          this.scrollView = view
        }}
      >
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
          <DetailsTab {...this.props.tournamentDetails} />
        )}
        {this.state.selectedIndex === 1 && (
          <AnmalningslistaTab
            tournamentDetails={this.props.tournamentDetails.details}
            navigator={this.props.navigator}
            scrollTo={this.scrollTo}
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

TournamentDetails.propTypes = {
  tournamentInfo: PropTypes.shape().isRequired,
  tournamentDetails: PropTypes.shape({
    details: tournamentDetailsShape, // eslint-disable-line
    loding: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  actions: PropTypes.shape({
    getTournamentDetails: PropTypes.func.isRequired
  }).isRequired,
  navigator: PropTypes.shape().isRequired
}

export default connect(
  state => ({
    tournamentDetails: state.tournamentDetails
  }),
  dispatch => ({
    actions: bindActionCreators({ getTournamentDetails }, dispatch)
  })
)(TournamentDetails)
