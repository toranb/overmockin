import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import waitFor from 'overmockin/tests/helpers/wait-for';
import { startMirage } from 'overmockin/initializers/ember-cli-mirage';
import { patchReducer, unpatchReducer } from 'overmockin/tests/helpers/patch-reducer';
import Immutable from 'seamless-immutable';
import * as informationActions from 'overmockin/actions/information';
import sinon from 'sinon';

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

test('clicking checkbox will fire toggle action when checkbox clicked', function(assert) {
  assert.expect(1);

  const actionSpy = sinon.spy(informationActions, 'toggle');

  this.render(hbs`{{info-configure}}`);

  const selector = '[test-id=configOption]:eq(1) input[type=checkbox]';
  return waitFor(() => this.$(selector).trigger('click'))().then(() => {
    assert.ok(actionSpy.calledOnce, 'The toggle action was called once');
    actionSpy.restore();
  });
});
