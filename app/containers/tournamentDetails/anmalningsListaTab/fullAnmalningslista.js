import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, Text } from 'react-native';
import styled from 'styled-components/native';
import { AdjacentRowHighlighted, RowSeparator } from '../../../components/listComponents';
import AnmalningslistaRow from './anmalningslistaRow';

const SectionHeader = styled.Text`
  padding-left: 10;
  padding-top: 30;
  padding-bottom: 8;
  background-color: transparent;
`;

const Container = styled.View`
  flex: 1;
`;

const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) =>
  (adjacentRowHighlighted ? (
    <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
  ) : (
    <RowSeparator key={`${sectionID}-${rowID}`} />
  ));

class FullAnmalningslista extends Component {
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

FullAnmalningslista.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default FullAnmalningslista;
