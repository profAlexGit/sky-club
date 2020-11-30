import EmberRouter from '@ember/routing/router';
import config from 'sky-club/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('meets', {path: 'meeting-plan'});
  this.route('about');
  this.route('archive', {path: 'past-meetings'});
  this.route('authorization', {path: 'auth'});
  this.route('books', function() {
    this.route('edit', {path: '/:id/edit'});
    this.route('create');
  });
  this.route('error404', {path: "*path"});
  this.route('speakers', function() {
    this.route('edit', {path: '/:id/edit'});
    this.route('create');
    this.route('info', {path: '/:id/info'});
  });
  this.route('meetings');
  this.route('account', function() {
    this.route('create-order');
    this.route('edit-order', {path: '/:id/edit-order'});
  });
  this.route('admin-panel', function() {
    this.route('orders');
    this.route('create-meeting');
  });
  this.route('register');
  this.route('login');
});
