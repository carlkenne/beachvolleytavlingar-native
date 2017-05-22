'use strict'
import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 16 },
  row: { padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.6)'}
});

export default class TournamentListRow extends Component {
    static propTypes = {
      tournamentInfo: PropTypes.object.isRequired,
      onPress: PropTypes.func.isRequired
    }

    render () {
      return (
        <TouchableHighlight onPress={()=>this.props.onPress(this.props.tournamentInfo)}>
          <View style={styles.row}>
            <Text style={styles.title}>{this.props.tournamentInfo.name}</Text>
            <Text>
              {this.props.tournamentInfo.date} - {this.props.tournamentInfo.club}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
};
