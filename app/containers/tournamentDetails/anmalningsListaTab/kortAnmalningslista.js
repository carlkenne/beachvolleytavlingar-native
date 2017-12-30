import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Section from '../sectionComponents';
import BlueText from '../../../components/blueText';
import { PreviewList } from '../../../components/listComponents';
import AnmalningslistaRow from './anmalningslistaRow';

const Link = styled(BlueText)`
  flex: 1;
  text-align: right;
`;

class KortAnmalningslista extends Component {
  render() {
    return (
      <Section.Section ref={section => (this.section = section)} {...this.props}>
        <Section.Row>
          <Section.Header>{this.props.header}</Section.Header>
          <Link
            onPress={() => {
              this.props.seAll(this.props.header);
            }}
          >
            se alla {'>'}
          </Link>
        </Section.Row>
        <PreviewList>
          {this.props.teams
            .slice(0, 3)
            .map(team => <AnmalningslistaRow key={team.name} team={team} />)}
        </PreviewList>
      </Section.Section>
    );
  }
}

KortAnmalningslista.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired,
  header: PropTypes.string.isRequired,
  seAll: PropTypes.func.isRequired,
};

export default KortAnmalningslista;
