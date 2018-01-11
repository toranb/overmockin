import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { patchReducer, unpatchReducer } from 'overmockin/tests/helpers/patch-reducer';
import { computed } from '@ember/object';
import InfoDetailComponent from 'overmockin/components/info-detail';
import Immutable from 'seamless-immutable';

moduleForComponent('info-detail', 'Integration | Component | info detail', {
  integration: true,
  beforeEach() {
    const initState = {
      information: {
        selectedItem: 2,
        all: {
          1: {
            id: '1',
            name: 'one'
          },
          2: {
            id: '2',
            name: 'two'
          }
        },
        configuration: {
          1: {
            id: '1',
            column: 'id',
            active: true
          },
          2: {
            id: '2',
            column: 'name',
            active: true
          }
        }
      }
    };
    patchReducer(Immutable.from(initState));
    this.inject.service('redux');
  },
  afterEach() {
    unpatchReducer();
  }
});

test('should render item with all fields provided', function(assert) {
  this.render(hbs`{{info-detail}}`);

  assert.equal(this.$('[test-id=idInfo]').text().trim(), 'id: 2');
  assert.equal(this.$('[test-id=nameInfo]').text().trim(), 'name: two');
  assert.equal(this.$('[test-id=configureLink]').text().trim(), 'configure');
});

test('should display all as inline style based on % of 10 items max', function(assert) {
  let StubDetailComponent = InfoDetailComponent.extend({
    width: computed(function() {
      return '20';
    })
  });
  this.registry.register('component:info-detail', StubDetailComponent);

  this.render(hbs`{{info-detail}}`);

  assert.equal(this.$('[test-id=all]').attr('style'), 'width: 20%');
});
