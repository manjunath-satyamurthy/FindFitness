import { Template } from 'meteor/templating';

import '../ui/css/signup.css'

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'click .next'(event){
		const path =  $('#account-type option:selected').val()
		console.log(path)
		Router.go('/'+path)
	}
})

// Template.signup.events({
// 	'change select'(event){
// 		const path = event.target.value
// 		console.log(path)
// })





