import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import { ListRow, Arrow } from '../../components/listComponents'
import TournamentTypeIcon from '../../components/tournamentTypeIcon'
import { tournamentInfoShape } from '../propTypes'

const Title = styled.Text`
  font-size: 16;
  flex-wrap: wrap;
  flex: 1;
`

const Row = styled(TouchableHighlight)`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.6);
`

const MiddleCol = styled.View`
  flex: 1;
`

function TournamentListRow({ tournamentInfo, onPress }) {
  const name = tournamentInfo.name
  return (
    <Row onPress={tournamentInfo.active ? onPress : null} underlayColor="white">
      <ListRow>
        <TournamentTypeIcon
          type={tournamentInfo.type}
          qualifier={tournamentInfo.qualifier}
        />
        <MiddleCol>
          <Title>{name}</Title>
          <Text>
            {tournamentInfo.date.getDuration('ddd, D MMM')},{' '}
            {tournamentInfo.club}
          </Text>
        </MiddleCol>
        {tournamentInfo.active && <Arrow />}
      </ListRow>
    </Row>
  )
}

TournamentListRow.propTypes = {
  tournamentInfo: tournamentInfoShape.isRequired,
  onPress: PropTypes.func.isRequired
}

export default TournamentListRow
