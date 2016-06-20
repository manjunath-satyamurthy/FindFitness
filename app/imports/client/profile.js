import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '../ui/css/profile.css'
import '../api/dbapi.js'

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});


//Profile Picture
  Template.profilepic.events({
    'click .profilepic': function () {
      user = Session.get('user')
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
    },
    'click .icon1': function(){
      var photo = Session.get("photo");
      var userid = Session.get('userid');
          users.update(
          {_id: userid},
          {$set :
          {
            pro_image: photo,
          }})
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


//Personal Details
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

    Meteor.startup(function() {

    navigator.notification.confirm('Do you want to save changes?', function(confirm){
    if (confirm == 1)
      {
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

        }

      }, 'Save Changes', ['Save', 'Cancel'])
      
    })

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

//Professional Details
Template.prodetails.helpers({
      get_acctype: function (acctype) {
        console.log(Session.get('acctype'))
        return acctype == Session.get('acctype')
    },
});

Template.prodetails.events({

    'click .icon1': function(){
        const from = $('[name=from]').val();
        const to = $('[name=to]').val();
        var userid = Session.get('userid');
        var result = users.find({'_id' : userid}, {'from': from},
        {'to': to}).fetch();
        console.log(result[0].availability.from)
        if((result.availability.from == $('[name=from]').val()) && (result.availability.to == 'to')){
          console.log('success')
        }
        // users.update({_id: userid}, 
        //     {$push : 
        //     {availability : { from: from, to: to }
        //     }
        //     },
        //     {upsert : true}
        // ),
        // users.update({_id: userid}, 
        //     {$set : 
        //     {availability : { from: from, to: to }
        //     },
        //     $setOnInsert:{

        //     }
        //     },
        //     {upsert : true}
        // ),

        Session.set('user', users.find({_id: userid}).fetch()[0])
 },

'click .prodetsave': function () {
    const category = $('#user-category option:selected').val();
    const experience = $('[name=experience]').val()
    var trainer_spez = $('#trainer_spez').val();
    var nut_spez = $('#nut-specialization').val()
    const cost = $('[name=cost]').val();
    var   userid = Session.get('userid');

    Meteor.startup(function() {

    navigator.notification.confirm('Do you want to save changes?', function(confirm){
    if (confirm == 1)
      {
            users.update(
            {_id: userid},
            {$set :
            {
              category: category,
              experience: experience,
              specialization: trainer_spez,
              specialization : nut_spez,
              cost :cost
           }})

        }

      }, 'Save Changes', ['Save', 'Cancel'])
      
    })

    Session.set('user', users.find({_id: userid}).fetch()[0])
  }
});
