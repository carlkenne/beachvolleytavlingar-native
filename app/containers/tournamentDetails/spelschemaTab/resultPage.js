import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ListView } from '../../../components/listView'
import ResultRow from './resultRow'
import { resultTeamShape } from '../propTypes'

const Container = styled.View`
  flex: 1;
`

class ResultPage extends Component {
  render() {
    return (
      <Container>
        <ListView
          data={{ all: this.props.teams }}
          renderRow={team => <ResultRow item={team} />}
        />
      </Container>
    )
  }
}

ResultPage.propTypes = {
  teams: PropTypes.arrayOf(resultTeamShape).isRequired
}

export default ResultPage
