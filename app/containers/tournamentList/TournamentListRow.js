'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import blackIcon from './icons/black.png'
import greenIcon from './icons/green.png'
import blueIcon from './icons/blue.png'
import redIcon from './icons/red.png'
import normalIcon from './icons/normal.png'

const Title = styled.Text`
  font-size: 16;
  flex-wrap: wrap;
  flex: 1;
`

const Row = styled(TouchableHighlight)`
  flex: 1;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
  background-color: rgba(255, 255, 255, 0.6);
`

const FlexRow = styled.View`
  flex-direction: row;
`

const MiddleCol = styled.View`
  flex: 1;
`

const Type = styled.Image`
  height: 40px;
  flex-basis: 40px;
  margin-right: 5px;
`

const Arrow = styled.View`
  align-content: center;
  justify-content: center;
  flex-basis: 40px;
`

const ArrowText = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 16;
  text-align: center;
`

const getTypeIcon = tournamentInfo => {
  switch (tournamentInfo.type) {
    case 'Open Svart':
      return blackIcon
    case 'Open Grön':
      return greenIcon
    case 'Challenger':
      return redIcon
    case 'Mixed':
      return blueIcon
  }

  return normalIcon
}

function TournamentListRow({ tournamentInfo, onPress }) {
  return (
    <Row onPress={onPress}>
      <FlexRow>
        <Type source={getTypeIcon(tournamentInfo)} resizeMode="contain" />
        <MiddleCol>
          <Title>{tournamentInfo.name}</Title>
          <Text>
            {tournamentInfo.date.text}, {tournamentInfo.club}
          </Text>
        </MiddleCol>
        <Arrow>
          <ArrowText>{'>'}</ArrowText>
        </Arrow>
      </FlexRow>
    </Row>
  )
}

TournamentListRow.propTypes = {
  tournamentInfo: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired,
}

export default TournamentListRow
