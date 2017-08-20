import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  TabBarIOS
} from 'react-native'

import * as actions from './actions';

import laurelIcon from '../../../resources/laurel25x.png'
import playerIcon from '../../../resources/player-icon25x.png'
import infoIcon from '../../../resources/info-icon25x.png'
import TournamentListNavigator from '../navigator'
import RankingList from '../rankingList'
import FAQ from '../faq'

const tabs = [{
  title: 'Säsongskalendern',
  icon: playerIcon,
  id: 'tournamentListTab',
  component: TournamentListNavigator
}, {
  title: 'Ranking',
  icon: laurelIcon,
  id: 'rankingTab',
  component: RankingList
}, {
  title: 'FAQ',
  icon: infoIcon,
  id: 'faqTab',
  component: FAQ
}]

function MainNavigationTabbar({ selectedTab, actions }) {

  const renderTabs = () => tabs.map(tab => (
    <TabBarIOS.Item
      key={tab.id}
      title={tab.title}
      icon={tab.icon}
      selected={selectedTab === tab.id}
      onPress={() =>
        actions.toggleTab(tab.id)
      }
    >
      <tab.component />
    </TabBarIOS.Item>
  ))

  return (
    <TabBarIOS>
      {renderTabs()}
    </TabBarIOS>
  );
}

MainNavigationTabbar.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired
}

export default connect(state => ({
  selectedTab: state.mainNavigation.selectedTab,
}),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainNavigationTabbar);