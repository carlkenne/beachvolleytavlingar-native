import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'

import {
  SectionHeader,
  SectionLabelColumn,
  Label,
  Row,
  Section,
  SectionContentColumn
} from '../sectionComponents'

const AnmalningsListaTab = ({ tournamentInfo }) => (
  <View>
    <Section>
      <SectionHeader>Damer</SectionHeader>
      <Row>
        <SectionLabelColumn>
          <Label>tider</Label>
        </SectionLabelColumn>
        <SectionContentColumn>
          <Text>{tournamentInfo.date}</Text>
          <Text>kl 11:00</Text>
        </SectionContentColumn>
      </Row>
    </Section>
  </View>
)

AnmalningsListaTab.propTypes = {
  tournamentInfo: PropTypes.shape({
    date: PropTypes.string.isRequired
  }).isRequired
}

export default AnmalningsListaTab
