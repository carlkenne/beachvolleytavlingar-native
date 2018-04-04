import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ListView } from '../../../components/listView'
import AnmalningslistaRow from './anmalningslistaRow'

const Container = styled.View`
  flex: 1;
`

class FullAnmalningslista extends Component {
  render() {
    return (
      <Container>
        <ListView
          data={{ all: this.props.teams }}
          renderRow={(team, even) => (
            <AnmalningslistaRow item={team} even={even} />
          )}
        />
      </Container>
    )
  }
}

FullAnmalningslista.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape).isRequired
}

export default FullAnmalningslista
