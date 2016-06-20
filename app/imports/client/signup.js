import { Template } from 'meteor/templating';


import '../ui/css/signup.css';

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

  // navigator.notification.confirm('Do you want to Create Account?', function(confirm){
  //   if (confirm == 1)
  //     {
          users.insert({
          acctype : acctype,
          username: username,
          email   : email,
          password : password
          })

        // }

      // }, 'Create Account', ['Confirm', 'Cancel'])
      
    })
  }
});



