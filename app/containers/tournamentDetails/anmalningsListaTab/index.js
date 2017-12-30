import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Separator from '../../../components/separator';
import Loading from '../../../components/loading';
import KortAnmalningslista from './kortAnmalningslista';
import { fetchAnmalningslista } from './epic';
import fullAnmalningslista from './fullAnmalningslista';

class AnmalningslistaTab extends Component {
  constructor(args) {
    super(args);
    this.seAll = this.seAll.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAnmalningslista();
  }

  seAll(header) {
    this.props.navigator.push({
      component: fullAnmalningslista,
      title: header,
      passProps: {
        teams: this.props.classes.find(c => c.name === header).teams,
      },
    });
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    const classes = this.props.classes.map(c => (
      <KortAnmalningslista key={c.name} header={c.name} teams={c.teams} seAll={this.seAll} />
    ));
    return (
      <View>
        {classes}
        <Separator />
      </View>
    );
  }
}

AnmalningslistaTab.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  navigator: PropTypes.shape().isRequired,
  actions: PropTypes.shape({
    fetchAnmalningslista: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    ...state.anmalningslista,
  }),
  dispatch => ({
    actions: bindActionCreators({ fetchAnmalningslista }, dispatch),
  }),
)(AnmalningslistaTab);
