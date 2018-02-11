import React from 'react'
import { Text } from 'react-native'
import { ListRowStacked } from '../../../components/listComponents'
import { teamShape } from '../propTypes'

const AnmalningslistaRow = ({ team }) => (
  <ListRowStacked key={team.name}>
    <Text>{team.name}</Text>
    <Text>
      {team.rank} {team.points} {team.club}
    </Text>
  </ListRowStacked>
)

AnmalningslistaRow.propTypes = {
  team: teamShape.isRequired,
}

export default AnmalningslistaRow
