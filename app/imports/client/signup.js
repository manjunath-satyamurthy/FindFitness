import { Template } from 'meteor/templating';


import '../ui/css/signup.css';
import { users } from '../api/collections.js';

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'click .next':function(event){
		const path =  $('#account-type option:selected').val();
		// console.log(path);
      Router.go('/'+path);
      
      var clienttype = path;
      console.log(this.name);
      var fname = $('[name=firstname]').val();
      var lname = $('[name=lastname]').val();
      var dob   = $('[name=dob]').val();
      var loc   = $('[name=loc]').val();
      // console.log(fname);
      Session.set('fname');

    users.insert({
      clienttype : clienttype,
      fname : fname,
      lname : lname,
      dob : dob,
      // gender
      loc : loc

    });


	}
      
});

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

