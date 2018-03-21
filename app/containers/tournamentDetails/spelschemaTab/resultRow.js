import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { resultTeamShape } from '../propTypes'

const ResultRow = ({ item, even }) => (
  <ListRowStacked even={even}>
    <Text>
      {item.position}: {item.team}
    </Text>
  </ListRowStacked>
)

ResultRow.propTypes = {
  item: resultTeamShape.isRequired,
  even: PropTypes.bool
}

export default ResultRow
