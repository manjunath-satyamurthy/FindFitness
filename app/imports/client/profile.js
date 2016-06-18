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
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        // $('#place').geocomplete({

        // });
        $("#place").geocomplete().bind("geocode:result", function(event,
    result) {

        var lat = result.geometry.location.lat()
        var lng = result.geometry.location.lng()
        console.log(lat)
        console.log(lng)
      });

    }
  });
});

// Template.profile.onRendered(function profileOnRendered() {


// });

Template.prodetails.helpers({
      get_acctype: function (acctype) {
        return acctype == Session.get('acctype')
    }
});


Template.perdetails.events({

'click .perdetsave': function () {
// const name = event.currentTarget.getAttribute('name');
// console.log(name)
console.log(lat)
    const firstname   = $('[name=firstname]').val();
    const lastname    = $('[name=lastname]').val();
    const dob         = $('[name=dob]').val();
    const gender      = $('#gender option:selected').val();
    var   userid      = Session.get('userid');

    users.update(
    {_id: userid},
    {$set :
    {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      gender : gender,
   }})
// console.log(Session.get('username'))
}
});