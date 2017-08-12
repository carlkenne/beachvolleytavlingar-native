import React, { PropTypes } from 'react';
import {
  ScrollView,
  Text
} from 'react-native';

function TournamentDetails({ tournamentInfo }) {
  return (
    <ScrollView>
      <Text>Tävlingsinfo</Text>
      <Text>{tournamentInfo.name}</Text>
      <Text>{tournamentInfo.club}</Text>
      <Text>{tournamentInfo.date}</Text>
    </ScrollView>
  );
}
TournamentDetails.propTypes = {
  tournamentInfo: PropTypes.shape().isRequired,
}

export default TournamentDetails
