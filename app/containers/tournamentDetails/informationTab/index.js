import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as S from '../sectionComponents'
import OutlineButton from '../../../components/outlineButton'
import Hyperlink from '../../../components/hyperlink'

const InformationTab = ({ tournamentInfo }) => (
  <View>
    <S.Section>
      <S.Header>Information</S.Header>
      <S.Row>
        <S.Label>tider</S.Label>
        <S.Content>
          <Text>{tournamentInfo.date}</Text>
          <Text>kl 11:00</Text>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>antal</S.Label>
        <S.Content>
          <Text>12</Text>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>avgift</S.Label>
        <S.Content>
          <Text>600 kr</Text>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>klass</S.Label>
        <S.Content>
          <Text>Senior, Challenger</Text>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>address</S.Label>
        <S.Content>
          <Hyperlink link="https://maps.google.com">
            här, här och här... se karta
          </Hyperlink>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>kontakt</S.Label>
        <S.Content>
          <Text>tävlingsledare</Text>
          <Text>Sandra Krook</Text>
          <Text>Mail@mail.com</Text>
          <Text>0736151555</Text>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Label>anmälan</S.Label>
        <S.Content>
          <Text>Senast, kl 12 på onsdag</Text>
          <S.MarginTop>
            <OutlineButton onPress={() => {}}>till anmälan</OutlineButton>
          </S.MarginTop>
        </S.Content>
      </S.Row>
    </S.Section>
    <S.SmallSeparator />
    <S.Section>
      <S.Header>Inbetalningsinfo</S.Header>
      <Text>
        Anmälan är giltig först när betalningen är genomförd via PayPal. Om
        betalningen inte är gjord innan sista anmälningsdag (tidpunkten då
        anmälningssidan stänger) riskerar ni att bli av med er plats i
        turneringen. Detta gäller även reserver. Logga in på anmälningssidan,
        välj din klubb, klicka på anmälda lag och sedan på betala. OBS! Om ni
        inte lyckas betala med PayPal ta då kontakta med TL i god tid före
        anmälan stänger. De spelare/lag som inte tävlar för IKSU Beachvolley ska
        maila in sina kontaktuppgifter till tävlingsledaren.
      </Text>
    </S.Section>
    <S.SmallSeparator />
    <S.Section>
      <S.Header>Övrigt</S.Header>
      <Text>
        Samling kl 09:00. OBS! Notera att de som missar utsatt tid för samling
        kan straffas med WO i den första matchen. Avanmälan måste göras innan
        sista anmälningsdags utgång, både via anmälningssidan och med e-mail
        till tävlingsledaren. Vid senare avanmälan kontakta tävlingsledare via
        telefon och läkarintyg krävs för att slippa betala full
        anmälningsavgift. För mer information angående anmälan och korrekt
        avanmälan se tävlingsbestämmelserna:
        http://www.volleyboll.se/beachvolley/Tavling/Reglerochbestammelser/tavlingsbestammelser2017/.
      </Text>
    </S.Section>
    <S.SmallSeparator />
    <S.Section>
      <OutlineButton onPress={() => {}}>Öppna sidan i safari..</OutlineButton>
    </S.Section>
  </View>
)

InformationTab.propTypes = {
  tournamentInfo: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
}

export default InformationTab
