import { connect } from 'ember-redux';
import { getConfiguration } from '../reducers/information/selectors';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';
import { toggle } from '../actions/information';

const stateToComputed = state => ({
  configuration: getConfiguration(state)
});

// const dispatchToActions = dispatch => ({
//   toggle: (id) => dispatch({ type: 'TOGGLE_CONFIG_ASYNC', id })
// });

const dispatchToActions = {
  toggle
};

class InfoConfigure extends Component {
  get layout() {
    return hbs`
      {{#each-in configuration as |key option|}}
        <div test-id="configOption">
          <label for={{key}}>{{option.column}}</label>
          <input onclick={{action "toggle" key}} id={{key}} type="checkbox" checked={{option.active}}>
        </div>
      {{/each-in}}
    `
  }
}

export default connect(stateToComputed, dispatchToActions)(InfoConfigure);
