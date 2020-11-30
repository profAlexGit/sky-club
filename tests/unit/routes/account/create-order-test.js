import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/create-order', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/create-order');
    assert.ok(route);
  });
});
