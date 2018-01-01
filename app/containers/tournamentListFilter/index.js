import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, Switch } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { toggleFilter } from './actions';
import { renderSeparator, ListRow } from '../../components/listComponents';
import TournamentTypeIcon from '../../components/tournamentTypeIcon';

const Title = styled.Text`
  font-size: 16;
  flex-wrap: wrap;
  flex: 1;
`;

const SectionHeader = styled.Text`
  padding-left: 5;
  padding-top: 20;
`;

const StyledSwitch = styled(Switch)`
  flex-basis: 50px;
`;

const createDataSource = (state) => {
  const sectionData = {
    levels: 'NIVÅ',
  };

  const _getSectionData = (data, sectionID) => sectionData[sectionID];
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1.value !== row2.value,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    getSectionHeaderData: _getSectionData,
    enableEmptySections: true,
  });

  return dataSource.cloneWithRowsAndSections(state);
};

class TournamentListFilter extends Component {
  render() {
    const { toggleFilter } = this.props.actions;
    const dataSource = createDataSource(this.props.filter);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) => (
          <ListRow>
            <TournamentTypeIcon type={rowData.type} />
            <Title> {rowData.label} </Title>
            <StyledSwitch
              value={rowData.value}
              onValueChange={(value) => {
                toggleFilter(parseInt(rowID), value);
              }}
            />
          </ListRow>
        )}
        renderSectionHeader={sectionHeader => <SectionHeader>{sectionHeader}</SectionHeader>}
        renderSeparator={renderSeparator}
      />
    );
  }
}

TournamentListFilter.propTypes = {
  filter: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

export default connect(
  state => ({
    filter: state.filter,
  }),
  dispatch => ({
    actions: bindActionCreators({ toggleFilter }, dispatch),
  }),
)(TournamentListFilter);
