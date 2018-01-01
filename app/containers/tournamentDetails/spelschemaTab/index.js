import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Section } from '../sectionComponents';
import BlueText from '../../../components/blueText';
import preliminartSpelschema from './preliminartSpelschema';

class SpelschemaTab extends Component {
  render() {
    return (
      <View>
        <Section>
          <Text>Tyvärr finns det inget officiellt spelschema ännu...</Text>
        </Section>
        <Section>
          <Text>Orkar du inte vänta?</Text>
          <BlueText
            onPress={() =>
              this.props.navigator.push({
                component: preliminartSpelschema,
                title: 'preliminärt spelschema',
              })
            }
          >
            skapa ditt eget schema {'>'}
          </BlueText>
        </Section>
      </View>
    );
  }
}

SpelschemaTab.propTypes = {
  navigator: PropTypes.shape().isRequired,
};

export default SpelschemaTab;
