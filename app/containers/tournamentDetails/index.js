import React, { PropTypes, Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SegmentedControlIOS,
  View,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: 130
  },
  header: {
    fontWeight: 'bold'
  },
  subHeader: {
    marginBottom: 5
  },
  sectionLabelColumn: {
    flexBasis: 60,
    marginRight: 10,
  },
  sectionContentColumn: {
    flex: 1
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  separator: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  separatorSmall: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderStyle: 'solid',
    marginLeft: 10,
  },
  leftRightMargins: {
    marginRight: 10,
    marginLeft: 10,
  },
  margins: {
    marginTop: 5,
    marginBottom: 5,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  }
});

class TournamentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  render() {
    return (
      <ScrollView>
        <Image
          source={require('../../../resources/arenas/gbc.png')}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={[styles.header, styles.leftRightMargins]}>Trettondagsturneringen - Challenger (CH1)</Text>
        <Text style={[styles.subHeader, styles.leftRightMargins]}>{this.props.tournamentInfo.club} </Text>
        <SegmentedControlIOS
          style={[styles.margins, styles.leftRightMargins]}
          values={['info', 'anmälningslista', 'spelschema']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
          }}
        />
        <View style={styles.separator} />
        <View style={[styles.section, styles.leftRightMargins]}>
          <Text style={styles.sectionHeader}>Information</Text>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>tider</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>{this.props.tournamentInfo.date}</Text>
              <Text>kl 11:00</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>antal</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>12</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>avgift</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>600 kr</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>klass</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>Senior, Challenger</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>address</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>här, här och här... se karta></Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>kontakt</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>tävlingsledare</Text>
              <Text>Sandra Krook</Text>
              <Text>Mail@mail.com</Text>
              <Text>0736151555</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.sectionLabelColumn}>
              <Text style={styles.label}>anmälan</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text>Senast, kl 12 på onsdag</Text><Button title='till anmälan' />
            </View>
          </View>
        </View>
        <View style={styles.separatorSmall} />
        <View style={[styles.section, styles.leftRightMargins]}>
          <Text style={styles.sectionHeader}>Inbetalningsinfo</Text>
          <Text>
            Anmälan är giltig först när betalningen är genomförd via PayPal. Om betalningen inte är gjord innan sista anmälningsdag (tidpunkten då anmälningssidan stänger) riskerar ni att bli av med er plats i turneringen. Detta gäller även reserver. Logga in på anmälningssidan, välj din klubb, klicka på anmälda lag och sedan på betala. OBS! Om ni inte lyckas betala med PayPal ta då kontakta med TL i god tid före anmälan stänger. De spelare/lag som inte tävlar för IKSU Beachvolley ska maila in sina kontaktuppgifter till tävlingsledaren.
          </Text>
        </View>
        <View style={styles.separatorSmall} />
        <View style={[styles.section, styles.leftRightMargins]}>
          <Text style={styles.sectionHeader}>Övrigt</Text>
          <Text>Samling kl 09:00. OBS! Notera att de som missar utsatt tid för samling kan straffas med WO i den första matchen. Avanmälan måste göras innan sista anmälningsdags utgång, både via anmälningssidan och med e-mail till tävlingsledaren. Vid senare avanmälan kontakta tävlingsledare via telefon och läkarintyg krävs för att slippa betala full anmälningsavgift.
För mer information angående anmälan och korrekt avanmälan se tävlingsbestämmelserna: http://www.volleyboll.se/beachvolley/Tavling/Reglerochbestammelser/tavlingsbestammelser2017/.
          </Text>
        </View>
        <View style={styles.separatorSmall} />
        <View style={[styles.section, styles.leftRightMargins]}>
          <Button title="se sidan i safari> " />
        </View>
      </ScrollView >
    );
  }
}
TournamentDetails.propTypes = {
  tournamentInfo: PropTypes.shape().isRequired,
}

export default TournamentDetails
