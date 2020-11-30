import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | account/create-order', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:account/create-order');
    assert.ok(controller);
  });
});
