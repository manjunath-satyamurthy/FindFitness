import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { EndUser } from '../api/enduser.js';

import './signup.html';
import './body.html';
import './trainerProfile.html';
import './register.html';
import './search.html';
import './login.html';
import './nutritionistProfile.html';
import './chat.html';
import './result.html';



// Meteor.publish(“images”, function(){ return Images.find(); });

// Template.login.events({
//     'click .forms': function(){
// 	background-color : blue;     
//     }
// });


Router.route('/', function () {

    this.render('login');
},
{
	name: 'login'
});


 Router.route('/signup',function () {
	
    this.render('signup');	
},
{
	name: 'signup'
});


Router.route('/search',function () {
	
    this.render('search');	
},
{
	name: 'search'
});

Router.route('/contentAndHeader',function () {
	
    this.render('contentAndHeader');	
},
{
	name: 'contentAndHeader'
});

Router.route('/trainerProfile',function () {
  
    this.render('trainerProfile');  
},{
  name: 'trainerProfile'

});

Router.route('/register',function () {
	
    this.render('register');	
},{
	name: 'register'

});

Router.route('/nutritionistProfile',function () {
    
    this.render('nutritionistProfile');    
},{
    name: 'nutritionistProfile'

});

Router.route('/nutritionist',function () {
    
    this.render('nutritionist');    
},{
    name: 'nutritionist'

});

Template.signup.events({
    'click #myp': function(event){

    Router.go('trainerProfile');     
    }
});

Router.route('/result',function () {
    
    this.render('result');    
},{
    name: 'result'

});

// Template.search.events({
//     'focus #buttonsearchHead1': function(event, template){
//         template.$("#buttonsearchHead1").css("border-bottom", "2px solid #ccc");
//     }
// });

Template.nutritionist.events({
    'click #searchHead1': function(event){
        Router.go('search');
    }
});

Template.search.events({
    'click #searchHead2': function(event){
        Router.go('nutritionist');
    }
});



// result page
Template.result.events({
    'click .results-list' (event){
        const is_active = $(event.currentTarget).hasClass('active')
        if (!is_active){
            $('.results-list').removeClass('active')
            $(event.currentTarget).addClass('active')
        }
        else {
            $(event.currentTarget).removeClass('active')
        }
    },

    'click #back-search' (event){
        Router.go("/search");
    }
})

//use handlebars for signup

//for geolocation

Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyAK_vkvxDH5vsqGkd0Qn-dDmq-rShTA7UA',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});


Template.search.onRendered(function () {

    this.autorun(() => {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        // Example 1 - Autocomplete only
        $('#geoLocation').geocomplete({

        });
      }
    });

  });


// Template.signup.helpers({
//     photo: function () {
//       return Session.get("photo");
//     }
  // });

Template.signup.onRendered(function () {

    this.autorun(() => {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        // Example 1 - Autocomplete only
        $('[name=address]').geocomplete({

        });
      }
    });

  });


Template.nutritionist.onRendered(function () {

    this.autorun(() => {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        // Example 1 - Autocomplete only
        $('#geoLocation').geocomplete({

        });
      }
    });

  });
//geolocation end






// Template.register.events({
//     'click #registerButton': function(event){
//         event.preventDefault();
//         var email = $('[name=email]').val();
//         var password = $('[name=password]').val();
//         Accounts.createUser({
//         email: email,
//         password: password
//     }, function(error){
//         if(error){
//             console.log(error.reason); // Output error if registration fails
//     }   else {
//             Router.go('/search'); // Redirect user if registration succeeds
//     }
// });
//     }
// });

Template.contentAndHeader.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});


// Template.login.events({
//     'click #loginButton': function(event){
//     	console.log("one");
//         event.preventDefault();
//         var email = $('[id = username]').val();
//         var password = $('[id = password]').val();
//          Meteor.loginWithPassword(email, password, function(error){
//     // console.log("You initiated the login process.");
//      if(error){
//         console.log(error.reason);
//     } else {
//         Router.go('/search');
//     }
// });    
//      }

// });


Template.trainerProfile.helpers({
  editing: function(){
    return Session.equals('reg', this._id);
  } 
});

Template.trainerProfile.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  },
  'click .editItem': function(){
    Session.set('reg', this._id);
  }
});

Template.trainerProfile.helpers({
    photo:function(){
        return Session.get("photo");
    }

});

  Template.trainerProfile.events({
    'click .profile1': function () {
      var cameraOptions = {
      width: 220,
      height: 220,
      correctOrientation: true,
      targetWidth:220, 
      targetHeight:220,
      allowEdit: true,
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });

Template.nutritionistProfile.helpers({
  editing: function(){
    return Session.equals('reg', this._id);
  } 
});

Template.nutritionistProfile.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  },
  'click .editItem': function(){
    Session.set('reg', this._id);
  }
});

Template.nutritionistProfile.helpers({
    photo:function(){
        return Session.get("photo");
    }

});

  Template.nutritionistProfile.events({
    'click .profile2': function () {
      var cameraOptions = {
      width: 220,
      height: 220,
      correctOrientation: true,
      targetWidth:220, 
      targetHeight:220,
      allowEdit: true,
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });

Template.signup.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  },
  'click .editItem': function(){
    Session.set('reg', this._id);
  }
});


Template.signup.helpers({
    photo:function(){
        return Session.get("photo");
    }

});

  Template.signup.events({
    'click .profile': function () {
      var cameraOptions = {
      width: 220,
      height: 220,
      correctOrientation: true,
      targetWidth:220, 
      targetHeight:220,
      allowEdit: true,
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });

  Template.signup.helpers({
  editing: function(){
    return Session.equals('reg', this._id);
  } 
});

Template.signup.onRendered(function () {
  $("div#trainer").hide();
  });

Template.signup.events({
  'change select#usertype': function(event){
     var selectedVal = $(event.target).val();
     Session.set('selectedVal', selectedVal);
     if(selectedVal == 'trainer'){
      $("div#trainer").show();
     }
     else if(selectedVal == 'nutritionist'){
      $("div#trainer").show();
     }
     else{
      $("div#trainer").hide();
     }
  }
});

// Template.signup.events({
//     'click .btn': function(event){
//       event.preventDefault();
//       var selectedVal = Session.get('selectedVal');
//       console.log(selectedVal);
//      if(selectedVal == 'trainer'){
//         Router.go('trainerProfile');
//       }
//       else if(selectedVal == 'nutritionist'){
//         Router.go('nutritionistProfile');
//       }
//       else{
//         Router.go('search');
//       }
//     }
// });


// for signup

Template.signup.events({
  'click .btn': function(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    var userType = Session.get('selectedVal');
    var firstName =$('[name=firstname]').val();
    var lastName =$('[name=lastname]').val();
    var email =$('[name=email]').val();
    var password =$('[name=password]').val();
    var DOB = $('[name=dob]').val();
    var address =$('[name=address]').val();
    var phoneNumber =$('[name=tel]').val();
    var location =$('[name=loc]').val();
    var experience = $('[name=exp]').val();
    var specialization =$('[name=spec]').val();
    
    // Insert user fields into the end user collection
    EndUser.insert({
        userType,
        firstName,
        lastName,
        email,
        password,
        DOB,
        address,
        phoneNumber,
        location,
        experience,
        specialization,
      createdAt: new Date(), // current time
    });
  }
});