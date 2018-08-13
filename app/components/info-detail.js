import { connect } from 'ember-redux';
import { all, activeItem } from '../reducers/information';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import { computed } from '@ember-decorators/object';

const stateToComputed = state => ({
  items: all(state),
  item: activeItem(state)
});

class InfoDetail extends Component {

  @computed('items')
  get width() {
    const items = this.get('items');
    return items ? (Object.keys(items).length / 10) * 100 : 0;
  }

  get layout() {
    return hbs`
      {{#each-in item as |key value|}}
        <div test-id="{{key}}Info">{{key}}: {{value}}</div>
      {{/each-in}}
      <div class="progress">
        <div style="width: {{width}}%" test-id="progress" class="progress-bar"></div>
      </div>
      {{#link-to "information.detail.configure" item.id test-id="configureLink"}}configure{{/link-to}}
    `
  }
}

export default connect(stateToComputed)(InfoDetail);
