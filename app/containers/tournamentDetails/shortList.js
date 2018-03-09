import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Section, Row, Header } from './sectionComponents'
import BlueText from '../../components/blueText'
import { PreviewList } from '../../components/listComponents'

const Link = styled(BlueText)`
  flex: 1;
  text-align: right;
`

class ShortAnmalningslista extends Component {
  render() {
    return (
      <Section ref={section => (this.section = section)} {...this.props}>
        <Row>
          <Header>{this.props.header}</Header>
          <Link
            onPress={() => {
              this.props.seAll(this.props.header)
            }}
          >
            se alla {'>'}
          </Link>
        </Row>
        <PreviewList>
          {this.props.rows
            .slice(0, this.props.rowCount)
            .map((item, index) => this.props.renderRow(item, index % 2 === 0))}
        </PreviewList>
      </Section>
    )
  }
}

ShortAnmalningslista.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
    .isRequired,
  header: PropTypes.string.isRequired,
  seAll: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  rowCount: PropTypes.number,
  even: PropTypes.bool
}

ShortAnmalningslista.defaultProps = {
  rowCount: 3
}

export default ShortAnmalningslista
