import React from 'react'
import { Text, View } from 'react-native'

import * as S from '../sectionComponents'
import * as List from '../listComponents'

const AnmalningsListaTab = () => (
  <View>
    <S.Section>
      <S.Header>Damer</S.Header>
      <List.List>
        <List.Row>
          <Text>Stina Persson / Matilda Gustavsson</Text>
          <Text>1 (1030p = 550p + 480p)</Text>
        </List.Row>
      </List.List>
    </S.Section>
  </View>
)

export default AnmalningsListaTab
