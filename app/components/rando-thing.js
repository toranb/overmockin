import { connect } from 'ember-redux';
import { get } from '@ember/object';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import { computed } from '@ember-decorators/object';

const stateToComputed = (state, attrs) => ({
  rand: `X ${attrs.name}!`
});

class RandoDetail extends Component {

  @computed('rand')
  get other() {
    const rand = get(this, 'rand');
    return `${rand} ... Y`;
  }

  get layout() {
    return hbs`
      <div class="wat">
        <span>{{other}}</span>
      </div>
    `
  }
}

export default connect(stateToComputed)(RandoDetail);
