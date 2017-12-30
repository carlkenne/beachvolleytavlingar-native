import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { ListRowStacked } from '../../../components/listComponents';

const AnmalningslistaRow = ({ team }) => (
  <ListRowStacked key={team.name}>
    <Text>{team.name}</Text>
    <Text>
      {team.rank} {team.points} {team.club}
    </Text>
  </ListRowStacked>
);

AnmalningslistaRow.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    club: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnmalningslistaRow;
