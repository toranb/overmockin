import { connect } from 'ember-redux';
import { all, activeItem } from '../reducers/information';
import Component from '@ember/component';
import { computed } from '@ember-decorators/object';

const stateToComputed = state => ({
  items: all(state),
  item: activeItem(state)
});

class InfoDetailComponent extends Component {

  @computed
  get width() {
    const items = this.get('items');
    return items ? (Object.keys(items).length / 10) * 100 : 0;
  }

}

export default connect(stateToComputed)(InfoDetailComponent);
