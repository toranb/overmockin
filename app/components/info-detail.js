import { connect } from 'ember-redux';
import { all, activeItem } from '../reducers/information';
import { computed } from '@ember/object';
import Component from '@ember/component';

const stateToComputed = state => ({
  items: all(state),
  item: activeItem(state)
});

const InfoDetailComponent = Component.extend({
  width: computed(function() {
    const items = this.get('items');
    return items ? (Object.keys(items).length / 10) * 100 : 0;
  })
});

export default connect(stateToComputed)(InfoDetailComponent);
