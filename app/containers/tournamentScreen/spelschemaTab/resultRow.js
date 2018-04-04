import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { resultTeamShape } from '../propTypes'

const MoreRoom = styled(ListRowStacked)`
  padding-top: 8px;
  padding-bottom: 8px;
`

const ResultRow = ({ item, even }) => (
  <MoreRoom even={even}>
    <Text>
      {item.position}: {item.team}
    </Text>
  </MoreRoom>
)

ResultRow.propTypes = {
  item: resultTeamShape.isRequired,
  even: PropTypes.bool
}

export default ResultRow
