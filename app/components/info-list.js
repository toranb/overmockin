import { connect } from 'ember-redux';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

const stateToComputed = state => ({
  all: state.information.all
});

class InfoList extends Component {
  get layout() {
    return hbs`
      {{#each-in all as |key info|}}
        {{#link-to "information.detail" info.id test-id="detailLink"}}{{info.name}}{{/link-to}}
      {{/each-in}}
    `
  }
}

export default connect(stateToComputed)(InfoList);
