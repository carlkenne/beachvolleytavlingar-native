import React from 'react'
import PropTypes from 'prop-types'
import { Linking } from 'react-native'
import BlueText from './blueText'

const Hyperlink = ({ link, children }) => (
  <BlueText onPress={() => Linking.openURL(link)}>{children}</BlueText>
)

Hyperlink.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Hyperlink
