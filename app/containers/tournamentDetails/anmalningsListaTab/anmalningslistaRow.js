import React from 'react'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { teamShape } from '../propTypes'

const AnmalningslistaRow = ({ item }) => (
  <ListRowStacked key={item.name}>
    <Text>{item.name}</Text>
    <Text>
      {item.rank}: {item.points}p {item.club}
    </Text>
  </ListRowStacked>
)

AnmalningslistaRow.propTypes = {
  item: teamShape.isRequired // eslint-disable-line react/no-typos
}

export default AnmalningslistaRow
