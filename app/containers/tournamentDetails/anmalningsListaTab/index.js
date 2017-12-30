import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Separator from '../../../components/separator';
import Loading from '../../../components/loading';
import Anmalningslista from './anmalningslista';
import { fetchAnmalningslista } from './epic';

const HEADER_HEIGHT = 270;

class AnmalningslistaTab extends Component {
  constructor(args) {
    super(args);
    this.scrollToList = this.scrollToList.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAnmalningslista();
  }

  scrollToList(header) {
    if (header === 'Damer') {
      this.props.scrollTo(HEADER_HEIGHT);
    } else if (header === 'Herrar') {
      this.props.scrollTo(HEADER_HEIGHT + this.damerListHeight);
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <View>
        <Anmalningslista
          header="Damer"
          teams={this.props.damer}
          scrollToList={this.scrollToList}
          onLayout={(event) => {
            this.damerListHeight = event.nativeEvent.layout.height;
          }}
        />
        <Separator />
        <Anmalningslista
          header="Herrar"
          teams={this.props.herrar}
          scrollToList={this.scrollToList}
        />
      </View>
    );
  }
}

AnmalningslistaTab.propTypes = {
  damer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  herrar: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  scrollTo: PropTypes.func.isRequired,
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
