import styled from 'styled-components/native'

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

export const ListRow = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
`

export const AdjacentRowHighlighted = styled.View`
  height: 4;
  background-color: #3b5998;
`

export const RowSeparator = styled.View`
  height: 1;
  background-color: #cccccc;
`
