import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { patchReducer } from 'overmockin/tests/helpers/patch-reducer';
import * as informationActions from 'overmockin/actions/information';
import sinon from 'sinon';

const initState = {
  information: {
    itemz: [],
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

module('Integration | Component | info configure spy test', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    patchReducer(this, initState);
  });

  test('clicking the checkbox will fire toggle action', async function(assert) {
    assert.expect(1);

    const actionStub = sinon.stub(informationActions, 'toggle');
    actionStub.returns(() => () => {});

    await render(hbs`{{info-configure}}`);

    await click('[test-id=configOption]:nth-of-type(2) input[type=checkbox]');

    assert.ok(actionStub.calledOnce, 'The toggle action was called once');
    actionStub.restore();
  });
});





