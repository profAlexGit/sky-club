import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | admin-panel/create-meeting', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin-panel/create-meeting');
    assert.ok(route);
  });
});
