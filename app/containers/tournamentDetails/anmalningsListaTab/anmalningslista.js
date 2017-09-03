import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import * as Section from '../sectionComponents'
import * as List from '../listComponents'

const Link = styled.Text`
  color: #0e7afe;
  flex: 1;
  textAlign: right;
`

class Anmalningslista extends Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: false }
  }

  renderTeam = team => (
    <List.Row key={team.name}>
      <Text>{team.name}</Text>
      <Text>
        {team.rank} {team.points} {team.club}
      </Text>
    </List.Row>
  )

  render() {
    return (
      <Section.Section>
        <Section.Row>
          <Section.Header>{this.props.header}</Section.Header>
          {!this.state.isExpanded && (
            <Link
              onPress={() => {
                this.setState({ isExpanded: true })
                this.props.scrollTo({ x: 0, y: 200, animated: true })
              }}
            >
              se alla {'>'}
            </Link>
          )}
        </Section.Row>
        {!this.state.isExpanded && (
          <List.PreviewList>
            {this.props.teams.slice(0, 3).map(team => this.renderTeam(team))}
          </List.PreviewList>
        )}
        {this.state.isExpanded && (
          <List.List>
            {this.props.teams.map(team => this.renderTeam(team))}
          </List.List>
        )}
      </Section.Section>
    )
  }
}

Anmalningslista.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired,
  header: PropTypes.string.isRequired,
  scrollTo: PropTypes.func.isRequired
}

export default Anmalningslista
