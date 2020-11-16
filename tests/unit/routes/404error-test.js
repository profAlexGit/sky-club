import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | 404error', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:404error');
    assert.ok(route);
  });
});
