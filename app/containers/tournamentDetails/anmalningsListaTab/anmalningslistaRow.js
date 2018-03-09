import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { teamShape } from '../propTypes'

const AnmalningslistaRow = ({ item, even }) => (
  <ListRowStacked key={item.name} even={even}>
    <Text>{item.name}</Text>
    <Text>
      {item.rank}: {item.points}p {item.club}
    </Text>
  </ListRowStacked>
)

AnmalningslistaRow.propTypes = {
  item: teamShape.isRequired, // eslint-disable-line react/no-typos
  even: PropTypes.bool
}

export default AnmalningslistaRow
