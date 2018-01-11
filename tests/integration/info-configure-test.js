import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import waitFor from 'overmockin/tests/helpers/wait-for';
import { startMirage } from 'overmockin/initializers/ember-cli-mirage';
import { patchReducer, unpatchReducer } from 'overmockin/tests/helpers/patch-reducer';
import Immutable from 'seamless-immutable';

moduleForComponent('info-configure', 'Integration | Component | info configure', {
  integration: true,
  beforeEach() {
    const initState = {
      information: {
        configuration: {
          1: {
            id: '1',
            column: 'id',
            active: true
          },
          2: {
            id: '2',
            column: 'name',
            active: false
          }
        }
      }
    };
    this.server = startMirage();
    patchReducer(Immutable.from(initState));
    this.inject.service('redux');
  },
  afterEach() {
    this.server.shutdown();
    unpatchReducer();
  }
});

test('clicking checkbox will drive visible properties of selected item', function(assert) {
  assert.expect(8);

  this.render(hbs`{{info-configure}}`);

  assert.equal(this.$('[test-id=configOption] input[type=checkbox]').length, 2);
  assert.equal(this.$('[test-id=configOption]:eq(0) input[type=checkbox]').prop('checked'), true);
  assert.equal(this.$('[test-id=configOption]:eq(1) input[type=checkbox]').prop('checked'), false);

  this.server.post('/api/configuration/toggle/2', (db, request) => {
    assert.equal(request.method, 'POST');
  });

  const selector = '[test-id=configOption]:eq(1) input[type=checkbox]';
  return waitFor(() => this.$(selector).trigger('click'))().then(() => {
    assert.equal(this.$('[test-id=configOption]:eq(0) input[type=checkbox]').prop('checked'), true);
    assert.equal(this.$('[test-id=configOption]:eq(1) input[type=checkbox]').prop('checked'), true);

    const redux = this.get('redux');
    const configuration = redux.getState()['information']['configuration'];
    assert.equal(configuration['1']['active'], true);
    assert.equal(configuration['2']['active'], true);
  });
});
