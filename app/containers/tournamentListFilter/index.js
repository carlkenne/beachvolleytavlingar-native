'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFilter } from './actions';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  sectionHeader: {
    paddingLeft: 5,
    paddingTop: 20
  }
});

class TournamentListFilter extends Component {

  static propTypes = {
    filter: PropTypes.shape().isRequired,
    actions: PropTypes.shape().isRequired
  }

  static _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={adjacentRowHighlighted ? styles.separatorAdjacentRowHighlighted : styles.separator}
      />
    );
  }

  _createDataSource(state) {
    const sectionData = {
      levels: 'NIVÅ'
    }

    const _getSectionData = (data, sectionID) => sectionData[sectionID]

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.value !== row2.value,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: _getSectionData
    });

    return dataSource.cloneWithRowsAndSections(state);
  }


  render() {
    const { toggleFilter } = this.props.actions;
    const dataSource = this._createDataSource(this.props.filter);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          (<View style={styles.row}>
            <Text> {rowData.label} </Text>
            <Switch value={rowData.value} onValueChange={(value) => { toggleFilter(parseInt(rowID), value) }} />
          </View>)
        }
        renderSectionHeader={(sectionHeader) =>
          <Text style={styles.sectionHeader}>{sectionHeader}</Text>
        }
        renderSeparator={this._renderSeparator}
      />
    );
  }
}

export default connect(state => ({
  filter: state.filter
}),
  (dispatch) => ({
    actions: bindActionCreators({ toggleFilter }, dispatch)
  })
)(TournamentListFilter);
