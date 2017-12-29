import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import blackIcon from './icons/black.png';
import black1Icon from './icons/black1.png';
import black2Icon from './icons/black2.png';
import greenIcon from './icons/green.png';
import blueIcon from './icons/blue.png';
import redIcon from './icons/red.png';
import red1Icon from './icons/red1.png';
import red2Icon from './icons/red2.png';
import normalIcon from './icons/normal.png';

const TournamentTypeIcon = styled.Image`
  height: 40px;
  flex-basis: 40px;
  margin-right: 5px;
`;

const getTypeIcon = (type, qualifier) => {
  switch (type) {
    case 'Open Svart':
      return qualifier === 'CH1' ? black1Icon : qualifier === 'CH2' ? black2Icon : blackIcon;
    case 'Open Grön':
      return greenIcon;
    case 'Challenger':
      return qualifier === 'CH1' ? red1Icon : qualifier === 'CH2' ? red2Icon : redIcon;
    case 'Mixed':
      return blueIcon;
  }

  return normalIcon;
};

const Icon = ({ type, qualifier }) => (
  <TournamentTypeIcon source={getTypeIcon(type, qualifier)} resizeMode="contain" />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  qualifier: PropTypes.string,
};

export default Icon;
