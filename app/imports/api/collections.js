import { Mongo } from 'meteor/mongo';

export const users = new Mongo.Collection('users');


validate_login = function (username, password){
	user = users.find({'username': username,
		'password': password}).count()
	alert(user);
	if (user > 0){
		return true;
	}
	else {
		return false;
	}
};