import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Section } from '../sectionComponents'
import BlueText from '../../../components/blueText'
import preliminartSpelschema from './preliminartSpelschema'
import { tournamentDetailsShape } from '../propTypes'
import { fetchSpelschema } from './epic'
import Loading from '../../../components/loading'
import Separator from '../../../components/separator'
import KortAnmalningslista from '../kortLista'
import ResultatRow from './resultatRow'

class SpelschemaTab extends Component {
  componentDidMount() {
    this.props.fetchSpelschema(this.props.tournamentDetails)
  }

  seAll(header) {
    this.props.navigator.push({
      title: header,
      passProps: {
        teams: this.props.results.find(c => c.classType === header).teams
      }
    })
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }
    if (this.props.results === undefined) {
      return (
        <View>
          <Section>
            <Text>Tyvärr finns det inget officiellt spelschema ännu...</Text>
          </Section>
          <Section>
            <Text>Orkar du inte vänta?</Text>
            <BlueText
              onPress={() =>
                this.props.navigator.push({
                  component: preliminartSpelschema,
                  title: 'preliminärt spelschema'
                })
              }
            >
              skapa ditt eget schema {'>'}
            </BlueText>
          </Section>
        </View>
      )
    }
    const classes = this.props.results.map(c => (
      <KortAnmalningslista
        key={c.classType}
        header={c.classType}
        rows={c.top4Teams}
        seAll={this.seAll}
        rowComponent={ResultatRow}
        rowCount={4}
      />
    ))
    return (
      <View>
        {classes}
        <Separator />
      </View>
    )
  }
}

SpelschemaTab.propTypes = {
  navigator: PropTypes.shape().isRequired,
  tournamentDetails: tournamentDetailsShape.isRequired, // eslint-disable-line react/no-typos
  fetchSpelschema: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      classType: PropTypes.string,
      teams: PropTypes.arrayOf(PropTypes.shape({})),
      top4Teams: PropTypes.arrayOf(PropTypes.shape({}))
    })
  ),
  loading: PropTypes.bool
}

export default connect(
  state => ({
    ...state.spelschema
  }),
  { fetchSpelschema }
)(SpelschemaTab)
