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

import { bindActionCreators } from 'redux';

class TournamentListFilter extends Component {
  constructor(props) {
    super(props);

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
      dataSource: dataSource.cloneWithRowsAndSections(props.filter)
    };
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  render() {
    const { toggleFilter } = this.props;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', padding:5}}>
            <Text> {rowData.label} </Text>
            <Switch value={rowData.value} onValueChange={(value) => { this.props.toggleFilter(parseInt(rowID), value) }}/>
          </View>
        }
        renderSectionHeader={(sectionHeader, sectionID) =>
          <Text style={{ paddingTop: 10 }}>{sectionHeader}</Text>
        }
        renderSeparator={this._renderSeparator}
      />
    );
  }
}

export default TournamentListFilter
