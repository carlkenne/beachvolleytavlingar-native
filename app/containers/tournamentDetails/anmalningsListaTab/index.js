import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import styled from 'styled-components/native';

const Section = styled.View`
    marginRight: 10;
    marginLeft: 10;
    marginRight: 10;
    marginLeft: 10;
`;

const AnmalningsListaTab = ({ tournamentInfo }) => (
  <View>
    <Section>
      <Text>
        Anmälningslistan...
        {tournamentInfo.name}
      </Text>
    </Section>
  </View>
)

AnmalningsListaTab.propTypes = {
  tournamentInfo: PropTypes.shape({
    date: PropTypes.string.isRequired
  }).isRequired,
}

export default AnmalningsListaTab;