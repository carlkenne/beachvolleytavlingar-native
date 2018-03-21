import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Loading = () => (
  <Wrapper>
    <ActivityIndicator size="small" color="#000000" />
  </Wrapper>
)

export default Loading
