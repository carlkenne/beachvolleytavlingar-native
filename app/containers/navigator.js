import React, { Component } from 'react';
import styled from 'styled-components/native';
import TournamentList from '../containers/tournamentList/index';
import TournamentListFilter from '../containers/tournamentListFilter/index';

const FlexedNavigatorIOS = styled.NavigatorIOS`
  flex: 1;
`;

class Navigator extends Component {
  constructor(args) {
    super(args);
    this._showFilterView = this._showFilterView.bind(this);
  }

  _showFilterView() {
    console.log('this.navigator: ', this.navigator);
    this.navigator.root.push({
      component: TournamentListFilter,
      title: 'filtrera',
    });
  }

  render() {
    return (
      <FlexedNavigatorIOS
        ref={nav => (this.navigator = nav)}
        initialRoute={{
          component: TournamentList,
          title: 'Säsongskalendern',
          rightButtonTitle: 'filtrera',
          onRightButtonPress: this._showFilterView,
        }}
      />
    );
  }
}

export default Navigator;
