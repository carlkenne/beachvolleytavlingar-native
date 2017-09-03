import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

export const RowLabelText = styled.Text`
  fontWeight: bold;
  textAlign: right;
`

const InternalRowLabel = styled.View`
  flexBasis: 60;
  marginRight: 10;
`

export const Label = ({ children }) => (
  <InternalRowLabel>
    <RowLabelText>{children}</RowLabelText>
  </InternalRowLabel>
)

Label.propTypes = {
  children: PropTypes.node.isRequired
}

export const Content = styled.View`flex: 1;`

export const Row = styled.View`flexDirection: row;`

export const Header = styled.Text`
  fontSize: 16;
  marginBottom: 10;
`

export const Section = styled.View`
  marginTop: 10;
  marginBottom: 10;
  marginRight: 10;
  marginLeft: 10;
`

export const MarginTop = styled.View`marginTop: 10;`

export const SmallSeparator = styled.View`
  borderTopColor: lightgray;
  borderTopWidth: 1;
  borderStyle: solid;
  marginLeft: 10;
`
