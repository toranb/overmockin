import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { patchReducer } from 'overmockin/tests/helpers/patch-reducer';
import { computed } from '@ember/object';
import InfoDetailComponent from 'overmockin/components/info-detail';

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

module('Integration | Component | info detail', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    patchReducer(this, initState);
  });

  test('should render item with all fields provided', async function(assert) {
    assert.expect(3);

    await render(hbs`{{info-detail}}`);

    assert.equal(find('[test-id=idInfo]').textContent, 'id: 2');
    assert.equal(find('[test-id=nameInfo]').textContent, 'name: two');
    assert.equal(find('[test-id=configureLink]').textContent, 'configure');
  });

  test('should display all as inline style based on % of 10 items max', async function(assert) {
    assert.expect(1);

    const StubDetailComponent = InfoDetailComponent.extend({
      width: computed(function() {
        return '20';
      })
    });
    this.owner.register('component:info-detail', StubDetailComponent);

    await render(hbs`{{info-detail}}`);

    assert.equal(find('[test-id=all]').getAttribute('style'), 'width: 20%');
  });

});
