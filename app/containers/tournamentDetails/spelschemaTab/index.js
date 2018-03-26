import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Section } from '../sectionComponents'
import BlueText from '../../../components/blueText'
import preliminartSpelschema from './preliminartSpelschema'
import { tournamentDetailsShape, resultTeamShape } from '../propTypes'
import { fetchSpelschema } from './epic'
import Loading from '../../../components/loading'
import Separator from '../../../components/separator'
import ShortResultList from '../shortList'
import ResultRow from './resultRow'
import ResultPage from './resultPage'

class SpelschemaTab extends Component {
  componentDidMount() {
    if (this.props.tournamentDetails) {
      this.props.fetchSpelschema(this.props.tournamentDetails)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.results === undefined &&
      this.props.tournamentDetails !== nextProps.tournamentDetails
    ) {
      this.props.fetchSpelschema(this.props.tournamentDetails)
    }
  }

  seAll = header => {
    this.props.navigator.push({
      title: header,
      component: ResultPage,
      passProps: {
        teams: this.props.results.find(c => c.className === header).teams
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
      <ShortResultList
        key={c.className}
        header={c.className}
        rows={c.top4Teams}
        seAll={this.seAll}
        renderRow={(team, even) => (
          <ResultRow key={team.id} item={team} even={even} />
        )}
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
  tournamentDetails: tournamentDetailsShape.isRequired,
  fetchSpelschema: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      teams: PropTypes.arrayOf(resultTeamShape),
      top4Teams: PropTypes.arrayOf(resultTeamShape)
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
