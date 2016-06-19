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

        $("#place").geocomplete().bind("geocode:result", function(event,
    result) {

        var lat = result.geometry.location.lat()
        var lng = result.geometry.location.lng()
        var name = result.address_components[0].long_name

        Session.set('lat',lat)
        Session.set('lng',lng)
        Session.set('name',name)
      });

    }
  });
});



Template.prodetails.helpers({
      get_acctype: function (acctype) {
        return acctype == Session.get('acctype')
    }
});

Template.perdetails.events({

'click .perdetsave': function () {
    console.log(lat)
    const firstname   = $('[name=firstname]').val();
    const lastname    = $('[name=lastname]').val();
    const dob         = $('[name=dob]').val();
    const gender      = $('#gender option:selected').val();
    var   location    = $('[name=place]').val();
    var   userid      = Session.get('userid');
    var   lat         = Session.get('lat')
    var   lng         = Session.get('lng')
    var   name        = Session.get('name')

    users.update(
    {_id: userid},
    {$set :
    {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      gender : gender,
      location :{name : name,
            lat      : lat,
            lng      : lng,
            location : location}
   }})

    Session.set('user', users.find({_id: userid}).fetch()[0])
  }
});

Template.perdetails.helpers({
    equals: function(value){
      console.log(value)
      return typeof(value) != 'undefined'
    },
    get_gender: function (gender) {
    return gender == Session.get('gender')
    },
});


Template.prodetails.helpers({
      get_acctype: function (acctype) {
        return acctype == Session.get('acctype')
    },
});
