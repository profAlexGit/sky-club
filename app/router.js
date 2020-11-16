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
  this.route('books');
  this.route('404error', {path: "*path"});
  this.route('error404', {path: "*path"});
  this.route('speakers');
});
