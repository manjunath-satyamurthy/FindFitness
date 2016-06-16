import { Template } from 'meteor/templating';


import '../ui/css/signup.css';
import { users } from '../api/collections.js';

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'submit .signup-form':function(event){
    const acctype  = $('#account-type option:selected').val();
    const username = $('[name=username]').val();
    const email    = $('[name=email]').val();
    const password = $('[name=password]').val();

    users.insert({
      acctype : acctype,
      username: username,
      email   : email,
      password : password

    });
	}
      
});

// Load the Google Maps API on startup
  Meteor.startup(() => {
    GoogleMaps.load({
      key: 'AIzaSyAK_vkvxDH5vsqGkd0Qn-dDmq-rShTA7UA',
      libraries: 'places'
    });
  });


  Template.signup.onRendered(function () {

    this.autorun(() => {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        $('#place').geocomplete({

        });

      }
    });

  });


