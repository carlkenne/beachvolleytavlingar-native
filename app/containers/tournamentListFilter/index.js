'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, ListView, Switch } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components/native'
import { toggleFilter } from './actions'
import { RowSeparator, AdjacentRowHighlighted } from '../listComponents'

const Row = styled.View`
  sve: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5;
`

const SectionHeader = styled.Text`
  padding-left: 5;
  padding-top: 20;
`

class TournamentListFilter extends Component {
  static _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return adjacentRowHighlighted ? (
      <AdjacentRowHighlighted key={`${sectionID}-${rowID}`} />
    ) : (
      <RowSeparator key={`${sectionID}-${rowID}`} />
    )
  }

  static _createDataSource(state) {
    const sectionData = {
      levels: 'NIVÅ',
    }

    const _getSectionData = (data, sectionID) => sectionData[sectionID]

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.value !== row2.value,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: _getSectionData,
    })

    return dataSource.cloneWithRowsAndSections(state)
  }

  render() {
    const { toggleFilter } = this.props.actions
    const dataSource = this._createDataSource(this.props.filter)
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) => (
          <Row>
            <Text> {rowData.label} </Text>
            <Switch
              value={rowData.value}
              onValueChange={value => {
                toggleFilter(parseInt(rowID), value)
              }}
            />
          </Row>
        )}
        renderSectionHeader={sectionHeader => (
          <SectionHeader>{sectionHeader}</SectionHeader>
        )}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}

TournamentListFilter.propTypes = {
  filter: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
}

export default connect(
  state => ({
    filter: state.filter,
  }),
  dispatch => ({
    actions: bindActionCreators({ toggleFilter }, dispatch),
  }),
)(TournamentListFilter)
