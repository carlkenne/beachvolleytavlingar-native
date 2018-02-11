import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from '../../../components/loading'
import AnmalningslistaRow from '../anmalningsListaTab/anmalningslistaRow'
import { ListView } from '../../../components/listView'
import { Section } from '../sectionComponents'
import BlueText from '../../../components/blueText'
import { fetchAnmalningslista } from '../anmalningsListaTab/epic'

const Container = styled.View`
  flex: 1;
`

class PreliminartSpelschema extends Component {
  componentDidMount() {
    this.props.actions.fetchAnmalningslista()
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }
    if (!this.props.classes) return null
    const data = this.props.classes.reduce((prev, c) => {
      prev[c.name] = c.teams
      return prev
    }, {})

    return (
      <Container>
        <Section>
          <BlueText>3</BlueText>
          <BlueText>4</BlueText>
          <BlueText>5</BlueText>
          <BlueText>6</BlueText>
          <BlueText>6</BlueText>
          <BlueText>6</BlueText>
        </Section>
        <ListView
          data={data}
          renderRow={team => <AnmalningslistaRow team={team} />}
          getSectionHeader={(array, sectionId) => sectionId}
        />
      </Container>
    )
  }
}

PreliminartSpelschema.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool,
  actions: PropTypes.shape({
    fetchAnmalningslista: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  state => ({
    ...state.anmalningslista,
  }),
  dispatch => ({
    actions: bindActionCreators({ fetchAnmalningslista }, dispatch),
  }),
)(PreliminartSpelschema)
