import { connect } from 'ember-redux';

const stateToComputed = state => ({
  all: state.information.all
});

export default connect(stateToComputed)();
