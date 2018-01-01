import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView as RNListView, Text } from 'react-native';
import styled from 'styled-components/native';

const AdjacentRowHighlighted = styled.View`
  height: 4;
  background-color: #3b5998;
`;

const RowSeparator = styled.View`
  height: 1;
  background-color: #cccccc;
`;

const SectionHeader = styled.Text`
  padding-left: 10;
  padding-top: 30;
  padding-bottom: 8;
  background-color: transparent;
`;

export const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) =>
  (adjacentRowHighlighted ? (
    <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
  ) : (
    <RowSeparator key={`${sectionID}-${rowID}`} />
  ));

export class ListView extends Component {
  getDataSource() {
    const dataSource = new RNListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: this.props.getSectionHeader || (() => ''),
    });

    return dataSource.cloneWithRowsAndSections(this.props.data);
  }

  render() {
    const header = (header) => (header !== '' && <SectionHeader>{header}</SectionHeader>)
    return (
      <RNListView
        dataSource={this.getDataSource()}
        renderRow={this.props.renderRow}
        renderSectionHeader={this.props.renderSectionHeader || header}
        renderSeparator={renderSeparator}
      />
    );
  }
}

ListView.propTypes = {
  renderRow: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func,
  getSectionHeader: PropTypes.func,
  data: PropTypes.shape().isRequired,
}
