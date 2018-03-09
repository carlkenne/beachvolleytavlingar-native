import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

export const BoldText = styled.Text`
  font-weight: bold;
`

export const RowLabelText = styled(BoldText)`
  text-align: right;
`

const InternalRowLabel = styled.View`
  flex-basis: 60;
  margin-right: 10;
`

export const Label = ({ children }) => (
  <InternalRowLabel>
    <RowLabelText>{children}</RowLabelText>
  </InternalRowLabel>
)

Label.propTypes = {
  children: PropTypes.node.isRequired
}

export const Content = styled.View`
  flex: 1;
`

export const Row = styled.View`
  flex-direction: row;
  margin-top: 5;
`

export const Header = styled.Text`
  font-size: 16;
  margin-bottom: 10;
`

export const Section = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 10;
  margin-left: 10;
`

export const MarginTop = styled.View`
  margin-top: 10;
`

export const ExtraSpace = styled.View`
  padding-bottom: 5px;
`

export const SmallSeparator = styled.View`
  border-top-color: lightgray;
  border-top-width: 1;
  border-style: solid;
  margin-left: 10;
`
