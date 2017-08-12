import React, { Component } from 'react';
import {
  NavigatorIOS,
  StyleSheet
} from 'react-native';
import MainNavigationTabbar from '../containers/mainNavigationTabbar';
import TournamentListFilter from '../containers/tournamentListFilter';

const styles = StyleSheet.create({
  flex: { flex: 1 }
})

class Navigator extends Component {
  _showFilterView = () => {
    this.refs.navigator.push({
      component: TournamentListFilter,
      title: 'filtrera'
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='navigator'
        initialRoute={{
          component: MainNavigationTabbar,
          title: 'Säsongskalendern',
          rightButtonTitle: 'filtrera',
          onRightButtonPress: this._showFilterView
        }}
        style={styles.flex}
      />
    );
  }
}

export default Navigator;
