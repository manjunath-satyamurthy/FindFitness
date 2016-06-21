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
			user = set_user_session(username, password)

			if (user.user_type == 'user'){
				Router.go('search')
			}
			else {
				Router.go('requests')
			}
		}
		else {
			Router.go('chat')
		}
	}
})
