import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as S from '../sectionComponents'
import OutlineButton from '../../../components/outlineButton'
import Hyperlink from '../../../components/hyperlink'

const render = (prefix = '', value, suffix = '') => {
  if (value) {
    return prefix + value + suffix
  }
}

const hasAnyNoOfPaticipants = details => details.noOfHerr || details.noOfDam

const renderNoOfParticipants = details =>
  hasAnyNoOfPaticipants(details) && (
    <S.Row>
      <S.Label>Klasser</S.Label>
      <S.Content>
        {details.noOfDam && (
          <Text>
            Dam: {details.noOfDam}
            {details.priceDam && ', ' + details.priceDam + ' :-'}
          </Text>
        )}
        {details.noOfHerr && (
          <Text>
            Herr: {details.noOfHerr}
            {details.priceHerr && ', ' + details.priceHerr + ' :-'}
          </Text>
        )}
      </S.Content>
    </S.Row>
  )

const InformationTab = ({ loaded, details }) =>
  loaded && (
    <View>
      <S.Section>
        <S.Header>Information</S.Header>
        <S.Row>
          <S.Label>tider</S.Label>
          <S.Content>
            <Text>{details.date.getDuration('ddd, D MMM hh:mm')}</Text>
          </S.Content>
        </S.Row>
        {renderNoOfParticipants(details)}
        <S.Row>
          <S.Label>address</S.Label>
          <S.Content>
            <Hyperlink link="https://maps.google.com">
              här, här och här... se karta {'>'}
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
                <Hyperlink link={`mailto:${contact.email}`}>
                  {contact.email}
                </Hyperlink>
                <Hyperlink link={`tel:${contact.phone}`}>
                  {contact.phone}
                </Hyperlink>
                <S.ExtraSpace />
              </S.Content>
            ))}
          </S.Content>
        </S.Row>
        <S.Row>
          <S.Label>anmälan</S.Label>
          <S.Content>
            <Text>
              Senast {details.deadline.getDuration('ddd, D MMM hh:mm')}
            </Text>
            <S.MarginTop>
              <OutlineButton onPress={() => {}}>till anmälan</OutlineButton>
            </S.MarginTop>
          </S.Content>
        </S.Row>
      </S.Section>
      <S.SmallSeparator />
      <S.Section>
        <S.Header>Inbetalningsinfo</S.Header>
        <Text>{details.paymentInfo}</Text>
      </S.Section>
      <S.SmallSeparator />
      <S.Section>
        <S.Header>Övrigt</S.Header>
        <Text>{details.info}</Text>
      </S.Section>
      <S.SmallSeparator />
      <S.Section>
        <OutlineButton onPress={() => {}}>Öppna sidan i safari..</OutlineButton>
      </S.Section>
    </View>
  )

InformationTab.propTypes = {
  details: PropTypes.shape({
    date: PropTypes.shape(),
  }),
  loaded: PropTypes.bool,
}

export default InformationTab
