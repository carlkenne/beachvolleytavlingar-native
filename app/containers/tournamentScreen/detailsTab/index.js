import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as S from '../sectionComponents'
import OutlineButton from '../../../components/outlineButton'
import Hyperlink from '../../../components/hyperlink'
import { tournamentDetailsShape } from '../propTypes'
import { tournamentInfoShape } from '../../propTypes'
import { fetchTournamentDetails } from '../epic'
import TabLoader from '../tabLoader'
/* eslint-disable react/no-multi-comp */

const Render = ({ _if, children }) => (_if ? children : null)

const renderClasses = details => {
  const classes = details.classes.map(item => (
    <Text key={item.className}>
      {item.className}
      <Render _if={item.amount}>
        {': '}
        {item.amount} lag
        <Render _if={item.price}> ({item.price} kr)</Render>
      </Render>
    </Text>
  ))
  return details.classes.length ? (
    <S.Row>
      <S.Label>klasser</S.Label>
      <S.Content>{classes}</S.Content>
    </S.Row>
  ) : null
}

const DetailsTab = ({ loaded, details }) => {
  console.log('loaded: ', loaded)
  console.log('details: ', details)
  return (
    loaded && (
      <View>
        <S.Section>
          <S.Header>Information</S.Header>
          <S.Row>
            <S.Label>tider</S.Label>
            <S.Content>
              <Text>{details.date.getDetailedDuration()}</Text>
            </S.Content>
          </S.Row>
          {renderClasses(details)}
          <S.Row>
            <S.Label>adress</S.Label>
            <S.Content>
              <Hyperlink link={details.location.url}>
                {details.location.text}
                {' (se karta >)'}
              </Hyperlink>
            </S.Content>
          </S.Row>
          <S.Row>
            <S.Label>kontakt</S.Label>
            <S.Content>
              <S.BoldText>tävlingsledare</S.BoldText>
              <S.ExtraSpace />
              {details.contacts.map(contact => (
                <S.Content key={contact.id}>
                  <Text>{contact.name}</Text>
                  {contact.email && (
                    <Hyperlink link={`mailto:${contact.email}`}>
                      {contact.email}
                    </Hyperlink>
                  )}
                  {contact.phone && (
                    <Hyperlink link={`tel:${contact.phone}`}>
                      {contact.phone}
                    </Hyperlink>
                  )}
                  <S.ExtraSpace />
                </S.Content>
              ))}
            </S.Content>
          </S.Row>
          <S.Row>
            <S.Label>anmälan</S.Label>
            <S.Content>
              <Text>Senast {details.deadline.getDetailedDuration()}</Text>
              <S.MarginTop>
                <OutlineButton onPress={() => {}}>
                  <Hyperlink link="http://google.com">till anmälan</Hyperlink>
                </OutlineButton>
              </S.MarginTop>
            </S.Content>
          </S.Row>
        </S.Section>
        <S.SmallSeparator />
        <S.Section>
          <S.Header>Inbetalningsinfo</S.Header>
          <S.Row>
            <Text>{details.paymentInfo}</Text>
          </S.Row>
        </S.Section>
        <S.SmallSeparator />
        <S.Section>
          <S.Header>Övrigt</S.Header>
          <S.Row>
            <Text>{details.info}</Text>
          </S.Row>
        </S.Section>
        <S.SmallSeparator />
        <S.Section>
          <OutlineButton onPress={() => {}}>
            Öppna sidan i safari..
          </OutlineButton>
        </S.Section>
      </View>
    )
  )
}

DetailsTab.propTypes = {
  details: tournamentDetailsShape,
  loaded: PropTypes.bool
}

class DetailsTabLoader extends Component {
  render() {
    return (
      <TabLoader
        fetch={this.props.fetchTournamentDetails}
        argsForFetch={this.props.tournamentInfo}
        component={DetailsTab}
        {...this.props}
      />
    )
  }
}

DetailsTabLoader.propTypes = {
  tournamentInfo: tournamentInfoShape.isRequired,
  fetchTournamentDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default connect(
  state => ({
    ...state.tournamentDetails
  }),
  {
    fetchTournamentDetails
  }
)(DetailsTabLoader)
