import React from 'react'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { resultTeamShape } from '../propTypes'

const ResultRow = ({ item }) => (
  <ListRowStacked>
    <Text>
      {item.position}: {item.team}
    </Text>
  </ListRowStacked>
)

ResultRow.propTypes = {
  item: resultTeamShape.isRequired
}

export default ResultRow
