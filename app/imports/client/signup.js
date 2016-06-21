import { Template } from 'meteor/templating';

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'submit .signup-form':function(event){
    const acctype  = $('#account-type option:selected').val();
    const username = $('[name=username]').val();
    const email    = $('[name=email]').val();
    const password = $('[name=password]').val();

  Meteor.startup(function() {
          users.insert({
          user_type : acctype,
          username: username,
          email   : email,
          password : password
          })
    })

  Router.go('/')
  }
});



