'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

const backgroundColor = 'rgba(255, 255, 255, 0.6)'
const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 16 },
  row: { padding: 5, backgroundColor }
})

function TournamentListRow({ tournamentInfo, onPress }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{tournamentInfo.name}</Text>
        <Text>
          {tournamentInfo.date} - {tournamentInfo.club}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

TournamentListRow.propTypes = {
  tournamentInfo: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
}

export default TournamentListRow
