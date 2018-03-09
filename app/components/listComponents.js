import React from 'react'
import styled, { css } from 'styled-components/native'

export const List = styled.View`
  border-top-color: lightgray;
  border-top-width: 1;
  border-style: solid;
  border-bottom-color: lightgray;
  border-bottom-width: 1;
`

export const PreviewList = styled.View`
  border-top-color: lightgray;
  border-top-width: 1;
  border-style: solid;
`

export const ListRowTemplate = css`
  flex: 1;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
`

export const ListRowStacked = styled.View`
  ${ListRowTemplate} flex-direction: column;
  ${props => props.even && 'background-color: #fbf5ed'};
`

export const ListRow = styled.View`
  ${ListRowTemplate};
  flex-direction: row;
  align-items: center;
`

const ArrowStyle = styled.View`
  justify-content: center;
  flex-basis: 40px;
`

const ArrowText = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 16;
  text-align: center;
`

export const Arrow = () => (
  <ArrowStyle>
    <ArrowText>{'>'}</ArrowText>
  </ArrowStyle>
)
