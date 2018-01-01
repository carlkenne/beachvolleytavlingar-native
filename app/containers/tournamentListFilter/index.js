import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { toggleFilter } from './actions';
import { ListRow } from '../../components/listComponents';
import { ListView } from '../../components/listView';
import TournamentTypeIcon from '../../components/tournamentTypeIcon';

const Title = styled.Text`
  font-size: 16;
  flex-wrap: wrap;
  flex: 1;
`;

const StyledSwitch = styled(Switch)`
  flex-basis: 50px;
`;

class TournamentListFilter extends Component {
  render() {
    const { toggleFilter } = this.props.actions;

    return (
      <ListView
        data={this.props.filter}
        getSectionHeader={() => 'NIVÅ'}
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
