import Model, {attr} from '@ember-data/model';

export default class UserModel extends Model {
	@attr('string') email;
	@attr('string') username;
    @attr('string') lastName;
    @attr('string') firstName;
	@attr('string') password;
	@attr('string') passwordConfirmation;
}
