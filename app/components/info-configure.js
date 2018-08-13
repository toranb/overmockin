import { connect } from 'ember-redux';
import { getConfiguration } from '../reducers/information/selectors';
import { toggle } from '../actions/information';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

const stateToComputed = state => ({
  configuration: getConfiguration(state)
});

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
};

export default connect(stateToComputed, dispatchToActions)(InfoConfigure);
