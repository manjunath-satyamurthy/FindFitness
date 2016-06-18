import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '../ui/css/profile.css'
import '../api/dbapi.js'

//Profile Picture
  Template.profilepic.events({
    'click .profilepic': function () {
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

  Template.profilepic.helpers({
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


  Template.perdetails.onRendered(function () {

    this.autorun(() => {
      if (GoogleMaps.loaded()) {

        $('#place').geocomplete({
        });
      }
    });

  });


Template.prodetails.helpers({
    // return Meteor.profile().fname;
      get_acctype: function (acctype) {
        return acctype == Session.get('acctype')
    }
});
