import { Template } from 'meteor/templating';

import '../ui/css/login.css'
import '../api/collections.js'

Template.login.onCreated(function loginOnCreated() {
  console.log("login");
});

Template.login.events({
	'submit .login-form' (event){
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		is_login_valid = validate_login(username, password);
		if (is_login_valid){
			console.log("yea happy")
			Router.go('/test')
		}
		else {
			alert("invalid login")
		}
	}
})
