import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Section from '../sectionComponents';
import BlueText from '../../../components/blueText';
import { PreviewList, List, ListRow } from '../../../components/listComponents';

const Link = styled(BlueText)`
  flex: 1;
  text-align: right;
`;

const renderTeam = team => (
  <ListRow key={team.name}>
    <Text>{team.name}</Text>
    <Text>
      {team.rank} {team.points} {team.club}
    </Text>
  </ListRow>
);

class Anmalningslista extends Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
  }

  render() {
    return (
      <Section.Section ref={section => (this.section = section)} {...this.props}>
        <Section.Row>
          <Section.Header>{this.props.header}</Section.Header>
          {!this.state.isExpanded && (
            <Link
              onPress={() => {
                this.setState({ isExpanded: true });
                this.props.scrollToList(this.props.header);
              }}
            >
              se alla {'>'}
            </Link>
          )}
        </Section.Row>
        {!this.state.isExpanded && (
          <PreviewList>{this.props.teams.slice(0, 3).map(renderTeam)}</PreviewList>
        )}
        {this.state.isExpanded && <List>{this.props.teams.map(renderTeam)}</List>}
      </Section.Section>
    );
  }
}

Anmalningslista.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired,
  header: PropTypes.string.isRequired,
  scrollToList: PropTypes.func.isRequired,
};

export default Anmalningslista;
