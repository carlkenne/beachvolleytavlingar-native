import styled from 'styled-components/native';
import ApslButton from 'apsl-react-native-button';
import React, { PropTypes } from 'react';

const Button = styled(ApslButton) `
  borderColor: #0e7afe;
  height: 30;
`;

const ButtonText = styled.Text`
  color: #0e7afe;
`;

const component = ({ children }) => (<Button>
  <ButtonText>{children}</ButtonText>
</Button>);

component.propTypes = {
  children: PropTypes.node.isRequired,
}

export default component;