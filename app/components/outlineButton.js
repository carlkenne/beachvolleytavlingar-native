import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const BlueButton = styled.Button`
  background-color: blue;
`

BlueButton.displayName = 'BlueButton'

const BlueRedButton = styled(BlueButton)`
  border-color: red;
`

BlueRedButton.displayName = 'BlueRedButton'

const ButtonWrapper = ({ children, onPress }) => (
  <BlueRedButton onPress={onPress} title={children} />
)

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ButtonWrapper
