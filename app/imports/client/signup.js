import { Template } from 'meteor/templating';


import '../ui/css/signup.css';
import { users } from '../api/collections.js';

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'submit .signup-form':function(event){
		// const path =  $('#account-type option:selected').val();
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
// Template.signup.events({
//   'submit .signup-form' (event){
//     event.preventDefault();
//     // const acctype  = event.target.acctype.value;
//     const username = $('[name=username]').val();
//     const email    = $('[name=email]').val();
//     const password = $('[name=password]').val();

//     users.insert({
//       acctype : acctype,
//       username: username,
//       email   : email,
//       password : password

//     });
//   }
// })

//Profile Picture
  Template.profilepicture.events({
    'click .profile-picture': function () {
      var cameraOptions = {
      width: 600,
      height: 600,
      correctOrientation: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });

  Template.profilepicture.helpers({
      photo: function () {
      return Session.get("photo");
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

  Template.suser.helpers(function(){
    return Session.get('fname');
    console.log('fname');

  })

