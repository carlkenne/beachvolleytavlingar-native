import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as S from '../sectionComponents'
import OutlineButton from '../../../components/outlineButton'
import Hyperlink from '../../../components/hyperlink'
import { tournamentDetailsShape } from '../propTypes'
import Loading from '../../../components/loading'

const renderClasses = details => {
  const classes = details.classes.map(item => (
    <Text key={item.className}>
      {item.className}: {item.amount} lag ({item.price} kr)
    </Text>
  ))
  console.log('renderClasses: ', classes)
  return (
    details.classes.length && (
      <S.Row>
        <S.Label>klasser</S.Label>
        <S.Content>{classes}</S.Content>
      </S.Row>
    )
  )
}

const DetailsTab = ({ loading, loaded, details }) => {
  console.log('loading: ', loading)
  if (loading) {
    return <Loading />
  }
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
  loaded: PropTypes.bool,
  loading: PropTypes.bool
}

export default DetailsTab
