import React, { PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import OutlineButton from '../../../components/outlineButton';

const MarginTop = styled.View`
  marginTop: 10;
`;

const Label = styled.Text`
  fontWeight: bold;
  textAlign: right;
`;

const SmallSeparator = styled.View`
  borderTopColor: lightgray;
  borderTopWidth: 1;
  borderStyle: solid;
  marginLeft: 10;
`;

const Row = styled.View`
  flex: 1;
  flexDirection: row;
`;

const SectionLabelColumn = styled.View`
  flexBasis: 60;
  marginRight: 10;
`;

const SectionContentColumn = styled.View`
  flex: 1;
`;

const SectionHeader = styled.Text`
  fontSize: 16;
  marginBottom: 10;
`;

const Section = styled.View`
  marginTop: 10;
  marginBottom: 10;
  marginRight: 10;
  marginLeft: 10;
`;

const InformationTab = ({ tournamentInfo }) => (
  <View>
    <Section>
      <SectionHeader>Information</SectionHeader>
      <Row>
        <SectionLabelColumn>
          <Label>tider</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>{tournamentInfo.date}</Text>
          <Text>kl 11:00</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>antal</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>12</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>avgift</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>600 kr</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>klass</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>Senior, Challenger</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>address</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>här, här och här... se karta</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>kontakt</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>tävlingsledare</Text>
          <Text>Sandra Krook</Text>
          <Text>Mail@mail.com</Text>
          <Text>0736151555</Text>
        </SectionContentColumn>
      </Row>
      <Row>
        <SectionLabelColumn>
          <Label>anmälan</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>Senast, kl 12 på onsdag</Text>
          <MarginTop>
            <OutlineButton>
              till anmälan
            </OutlineButton>
          </MarginTop>
        </SectionContentColumn>
      </Row>
    </Section>
    <SmallSeparator />
    <Section>
      <SectionHeader>Inbetalningsinfo</SectionHeader>
      <Text>
        Anmälan är giltig först när betalningen är genomförd via PayPal. Om betalningen inte är gjord innan sista anmälningsdag (tidpunkten då anmälningssidan stänger) riskerar ni att bli av med er plats i turneringen. Detta gäller även reserver. Logga in på anmälningssidan, välj din klubb, klicka på anmälda lag och sedan på betala. OBS! Om ni inte lyckas betala med PayPal ta då kontakta med TL i god tid före anmälan stänger. De spelare/lag som inte tävlar för IKSU Beachvolley ska maila in sina kontaktuppgifter till tävlingsledaren.
      </Text>
    </Section>
    <SmallSeparator />
    <Section>
      <SectionHeader>Övrigt</SectionHeader>
      <Text>Samling kl 09:00. OBS! Notera att de som missar utsatt tid för samling kan straffas med WO i den första matchen. Avanmälan måste göras innan sista anmälningsdags utgång, både via anmälningssidan och med e-mail till tävlingsledaren. Vid senare avanmälan kontakta tävlingsledare via telefon och läkarintyg krävs för att slippa betala full anmälningsavgift.
För mer information angående anmälan och korrekt avanmälan se tävlingsbestämmelserna: http://www.volleyboll.se/beachvolley/Tavling/Reglerochbestammelser/tavlingsbestammelser2017/.
      </Text>
    </Section>
    <SmallSeparator />
    <Section>
      <OutlineButton>
        Öppna sidan i safari..
      </OutlineButton>
    </Section>
  </View>
)

InformationTab.propTypes = {
  tournamentInfo: PropTypes.shape({
    date: PropTypes.string.isRequired
  }).isRequired,
}

export default InformationTab;