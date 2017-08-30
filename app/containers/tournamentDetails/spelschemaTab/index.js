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

const SpelschemaTab = ({ tournamentInfo }) => (
  <View>
    <Section>
      <Text>
        Spelschemat...
        {tournamentInfo.name}
      </Text>
    </Section>
  </View>
)

SpelschemaTab.propTypes = {
  tournamentInfo: PropTypes.shape({
    date: PropTypes.string.isRequired
  }).isRequired,
}

export default SpelschemaTab;