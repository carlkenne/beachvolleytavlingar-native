'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  Navigator,
  ListView,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import * as filterActions from 'beachvolleytavlingar/app/actions/filterActions';
import { bindActionCreators } from 'redux';

const styles = StyleSheet.create({
  separatorAdjacentRowHighlighted: {
    height: 4,
    backgroundColor: '#3B5998'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  sectionHeader: {
    paddingLeft: 5,
    paddingTop: 20
  }
});

class TournamentListFilter extends Component {
  constructor(props) {
    super(props);
  }

  _createDataSource(state){
    let sectionData = {
      levels: 'NIVÅ'
    }

    let _getSectionData = (data, sectionID) => {
      return sectionData[sectionID];
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged           : (row1, row2) => {
        return row1.value !== row2.value
      },
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionHeaderData: _getSectionData
    });

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(state)
    };
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style= {adjacentRowHighlighted ? styles.separatorAdjacentRowHighlighted: styles.separator}
      />
    );
  }

  render() {
    const { toggleFilter } = this.props.actions;
    this._createDataSource(this.props.state);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', padding:5}}>
            <Text> {rowData.label} </Text>
            <Switch value={rowData.value} onValueChange={(value) => { toggleFilter(parseInt(rowID), value) }}/>
          </View>
        }
        renderSectionHeader={(sectionHeader, sectionID) =>
          <Text style={styles.sectionHeader}>{sectionHeader}</Text>
        }
        renderSeparator={this._renderSeparator}
      />
    );
  }
}

export default connect(state => ({
    state: state.
    filter
  }),
  (dispatch) => ({
    actions: bindActionCreators(filterActions, dispatch)
  })
)(TournamentListFilter);
