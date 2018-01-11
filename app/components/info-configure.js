import { connect } from 'ember-redux';
import { toggle } from '../actions/information';

const stateToComputed = state => ({
  configuration: state.information.configuration
});

const dispatchToActions = {
  toggle
};

export default connect(stateToComputed, dispatchToActions)();
