import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Button from 'apsl-react-native-button'
import BlueText from './blueText'

const BlueOutlineButton = styled(Button)`
  border-color: ${props => props.theme.lovingBlue};
  height: 30px;
`

BlueOutlineButton.displayName = 'BlueOutlineButton'

const ButtonWrapper = ({ children, onPress }) => (
  <BlueOutlineButton onPress={onPress}>
    <BlueText>{children}</BlueText>
  </BlueOutlineButton>
)

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ButtonWrapper
