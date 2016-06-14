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

  Template.profilepicture.helpers({
    photo: function () {
      return Session.get("photo");
    }
  });

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


  // Template.strainer.helpers({
  //   photo: function () {
  //     return Session.get("photo");
  //   }
  // });

  // Template.strainer.events({
  //   'click .profile-picture': function () {
  //     var cameraOptions = {
  //     width: 600,
  //     height: 600,
  //     correctOrientation: true,
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     targetWidth:400, 
  //     targetHeight:400,
  //     allowEdit: true,
  //     };

  //     MeteorCamera.getPicture(cameraOptions, function (error, data) {
  //       Session.set("photo", data);
  //     });
  //   }
  // });

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



