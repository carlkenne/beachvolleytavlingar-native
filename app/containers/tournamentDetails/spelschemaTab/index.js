import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import styled from 'styled-components/native'

const Section = styled.View`
  margin-right: 10;
  margin-left: 10;
  margin-right: 10;
  margin-left: 10;
`

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
    date: PropTypes.shape().isRequired,
  }).isRequired,
}

export default SpelschemaTab
