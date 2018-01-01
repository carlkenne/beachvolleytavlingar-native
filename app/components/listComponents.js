import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { ListView as RNListView } from 'react-native';

export const List = styled.View`
  border-top-color: lightgray;
  border-top-width: 1;
  border-style: solid;
  border-bottom-color: lightgray;
  border-bottom-width: 1;
`;

export const PreviewList = styled.View`
  border-top-color: lightgray;
  border-top-width: 1;
  border-style: solid;
`;

export const ListRowTemplate = css`
  flex: 1;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
`;

export const ListRowStacked = styled.View`
  ${ListRowTemplate} flex-direction: column;
`;

export const ListRow = styled.View`
  ${ListRowTemplate};
  flex-direction: row;
  align-items: center;
`;

export const AdjacentRowHighlighted = styled.View`
  height: 4;
  background-color: #3b5998;
`;

export const RowSeparator = styled.View`
  height: 1;
  background-color: #cccccc;
`;

export const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) =>
  (adjacentRowHighlighted ? (
    <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
  ) : (
    <RowSeparator key={`${sectionID}-${rowID}`} />
  ));

const ArrowStyle = styled.View`
  justify-content: center;
  flex-basis: 40px;
`;

const ArrowText = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 16;
  text-align: center;
`;

export const Arrow = () => (
  <ArrowStyle>
    <ArrowText>{'>'}</ArrowText>
  </ArrowStyle>
);

export class ListView extends Component {
  getDataSource() {
    const dataSource = new RNListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: this.props.getSectionHeader.bind(this),
    });

    return dataSource.cloneWithRowsAndSections(this.props.data);
  }

  render() {
    return (
      <RNListView
        dataSource={this._getDataSource()}
        renderRow={this.props.renderRow}
        renderSectionHeader={this.props.renderSectionHeader}
        renderSeparator={renderSeparator}
      />
    );
  }
}

ListView.propTypes = {
  renderRow: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func.isRequired,
  getSectionHeader: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
}
