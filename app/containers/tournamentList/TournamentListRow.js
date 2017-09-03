'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'

const Title = styled.Text`
  fontWeight: bold;
  fontSize: 16;
`

const Row = styled.View`
  paddingTop: 5;
  paddingBottom: 5;
  paddingLeft: 5;
  paddingRight: 5;
  backgroundColor: rgba(255, 255, 255, 0.6);
`

function TournamentListRow({ tournamentInfo, onPress }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <Row>
        <Title>{tournamentInfo.name}</Title>
        <Text>
          {tournamentInfo.date} - {tournamentInfo.club}
        </Text>
      </Row>
    </TouchableHighlight>
  )
}

TournamentListRow.propTypes = {
  tournamentInfo: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
}

export default TournamentListRow
