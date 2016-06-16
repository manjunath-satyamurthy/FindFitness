import { Template } from 'meteor/templating';

import '../ui/css/login.css'
import '../api/collections.js'

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
			Router.go('search')
		}
		else {
			Router.go('search')
			alert("invalid login")
		}
	}
})
