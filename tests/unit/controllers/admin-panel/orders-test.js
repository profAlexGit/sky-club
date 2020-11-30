import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | admin-panel/orders', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:admin-panel/orders');
    assert.ok(controller);
  });
});
