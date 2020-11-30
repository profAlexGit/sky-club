import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | speakers/info', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:speakers/info');
    assert.ok(route);
  });
});
