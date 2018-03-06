import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'

const AnmalningslistaRow = ({ item }) => (
  <ListRowStacked>
    <Text>
      {item.position}: {item.team}
    </Text>
  </ListRowStacked>
)

AnmalningslistaRow.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired
  }).isRequired
}

export default AnmalningslistaRow
