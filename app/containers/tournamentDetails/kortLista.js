import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import * as Section from './sectionComponents'
import BlueText from '../../components/blueText'
import { PreviewList } from '../../components/listComponents'

const Link = styled(BlueText)`
  flex: 1;
  text-align: right;
`

class KortAnmalningslista extends Component {
  render() {
    return (
      <Section.Section
        ref={section => (this.section = section)}
        {...this.props}
      >
        <Section.Row>
          <Section.Header>{this.props.header}</Section.Header>
          <Link
            onPress={() => {
              this.props.seAll(this.props.header)
            }}
          >
            se alla {'>'}
          </Link>
        </Section.Row>
        <PreviewList>
          {this.props.rows
            .slice(0, this.props.rowCount)
            .map(row => <this.props.rowComponent key={row.id} item={row} />)}
        </PreviewList>
      </Section.Section>
    )
  }
}

KortAnmalningslista.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
    .isRequired,
  header: PropTypes.string.isRequired,
  seAll: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  rowCount: PropTypes.number
}

KortAnmalningslista.defaultProps = {
  rowCount: 3
}

export default KortAnmalningslista
