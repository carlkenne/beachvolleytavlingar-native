'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
`

const Row = styled.View`
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
  background-color: rgba(255, 255, 255, 0.6);
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
  onPress: PropTypes.func.isRequired,
}

export default TournamentListRow
