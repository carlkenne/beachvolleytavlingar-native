import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import * as Section from '../sectionComponents'
import * as List from '../listComponents'
import Separator from '../../../components/separator'

const Link = styled.Text`
  color: #0e7afe;
  flex: 1;
  textAlign: right;
`

const renderTeam = team => (
  <List.Row key={team.name}>
    <Text>{team.name}</Text>
    <Text>
      {team.rank} {team.points} {team.club}{' '}
    </Text>
  </List.Row>
)

const AnmalningsListaTab = ({ damer, herrar }) => (
  <View>
    <Section.Section>
      <Section.Row>
        <Section.Header>Damer</Section.Header>
        <Link>se alla {'>'}</Link>
      </Section.Row>
      <List.PreviewList>
        {damer.slice(0, 3).map(team => renderTeam(team))}
      </List.PreviewList>
    </Section.Section>
    <Separator />
    <Section.Section>
      <Section.Row>
        <Section.Header>Herrar</Section.Header>
        <Link>se alla {'>'}</Link>
      </Section.Row>
      <List.PreviewList>
        {herrar.slice(0, 3).map(team => renderTeam(team))}
      </List.PreviewList>
    </Section.Section>
  </View>
)

AnmalningsListaTab.propTypes = {
  damer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  herrar: PropTypes.arrayOf(PropTypes.shape).isRequired
}

export default AnmalningsListaTab
