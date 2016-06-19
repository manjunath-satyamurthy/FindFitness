import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '../ui/css/login.css'
import '../api/dbapi.js'

Template.login.onCreated(function loginOnCreated() {

});

Template.login.onRendered(function loginOnRendered() {
  $('html').css("overflow-y", "visible")
  $('html').css("overflow-x", "hidden")

});

Template.login.events({
	'submit .login-form' (event){
		window.scrollTo(0,0);
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		is_login_valid = validate_login(username, password);
		if (is_login_valid){
			var result = users.find({'username': username},
			{'password': password}).fetch();
			var acctype = result[0].acctype;
			var userid = result[0]._id;
			var gender = result[0].gender;
			Session.set('user', result[0])
			Session.set('acctype',acctype)
			Session.set('username',username)
			Session.set('userid',userid)
			Session.set('gender',gender)
			Router.go('search')
		}
		else {
			Router.go('search')
			alert("invalid login")

		}
	}
})


