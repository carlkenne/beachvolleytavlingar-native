import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as S from '../sectionComponents'
import OutlineButton from '../../../components/outlineButton'
import Hyperlink from '../../../components/hyperlink'
import { tournamentDetailsShape } from '../propTypes'

const hasAnyNoOfPaticipants = details => details.noOfHerr || details.noOfDam

const renderNoOfParticipants = details =>
  hasAnyNoOfPaticipants(details) && (
    <S.Row>
      <S.Label>klasser</S.Label>
      <S.Content>
        {details.noOfDam && <Text>dam: {details.noOfDam} lag</Text>}
        {details.noOfHerr && <Text>herr: {details.noOfHerr} lag</Text>}
      </S.Content>
    </S.Row>
  )

const hasPrice = details => details.priceDam || details.priceHerr

const renderPrice = details =>
  hasPrice(details) && (
    <S.Row>
      <S.Label>pris</S.Label>
      <S.Content>
        <Text>{details.priceDam || details.priceHerr} kr/lag</Text>
      </S.Content>
    </S.Row>
  )

const DetailsTab = ({ loaded, details }) =>
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
        {renderNoOfParticipants(details)}
        {renderPrice(details)}
        <S.Row>
          <S.Label>address</S.Label>
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

DetailsTab.propTypes = {
  details: tournamentDetailsShape,
  loaded: PropTypes.bool,
}

export default DetailsTab
