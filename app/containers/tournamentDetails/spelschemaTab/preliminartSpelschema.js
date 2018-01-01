import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import styled from 'styled-components/native';
import { renderSeparator } from '../../../components/listComponents';
import AnmalningslistaRow from '../anmalningsListaTab/anmalningslistaRow';

const SectionHeader = styled.Text`
  padding-left: 10;
  padding-top: 30;
  padding-bottom: 8;
  background-color: transparent;
`;

const Container = styled.View`
  flex: 1;
`;

class PreliminartSpelschema extends Component {
  _getVisibleTournaments() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.value !== row2.value,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: () => '',
      enableEmptySections: true,
    });

    return dataSource.cloneWithRowsAndSections({ all: this.props.teams });
  }

  render() {
    return (
      <Container>
        <ListView
          dataSource={this._getVisibleTournaments()}
          renderRow={team => <AnmalningslistaRow team={team} />}
          renderSectionHeader={sectionHeader => <SectionHeader>{sectionHeader}</SectionHeader>}
          renderSeparator={renderSeparator}
        />
      </Container>
    );
  }
}

PreliminartSpelschema.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default PreliminartSpelschema;
