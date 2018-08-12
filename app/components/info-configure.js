import { connect } from 'ember-redux';
import { getConfiguration } from '../reducers/information/selectors';
import { toggle } from '../actions/information';

const stateToComputed = state => ({
  configuration: getConfiguration(state)
});

const dispatchToActions = {
  toggle
};

export default connect(stateToComputed, dispatchToActions)();
