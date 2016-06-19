import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { EndUser } from '../api/enduser.js';

import './signup.html';

import './trainer.html';
import './nutritionist1.html';
import './chat.html';
import './message.html';



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

Router.route('/trainer',function () {
  
    this.render('trainer');  
},{
  name: 'trainer'

});

Router.route('/register',function () {
	
    this.render('register');	
},{
	name: 'register'

});

Router.route('/nutritionist1',function () {
    
    this.render('nutritionist1');    
},{
    name: 'nutritionist1'

});

Template.signup.events({
    'click #myp': function(event){

    Router.go('trainer');     
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

Template.trainer.helpers({
  editing: function(){
    return Session.equals('reg', this._id);
  } 
});

Template.search.events({
    'click #searchHead2': function(event){
        Router.go('nutritionist');
    }
});

Template.trainer.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  },
  'click .editItem': function(){
    Session.set('reg', this._id);
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

// for signup
// Template.signup.events({
//   'click .btn'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();
    
//     if( $('[name=UserType]').val() == 'Client'){
//     // Get value from form element
//     var userType = $([]).val();
//     var firstName =
//     var lastName =
//     var email =
//     var password =
//     var DOB = 
//     var address =
//     // Insert user fields into the end user collection
//     EndUser.insert({
//         userType,
//         firstName,
//         lastName,
//         email,
//         password,
//         DOB,
//         address,
//       createdAt: new Date(), // current time
//     });
// }
//     else($('[name=UserType]').val() == 'Trainer'){
//         // Get value from form element
//     var userType = $([]).val();
//     var firstName =
//     var lastName =
//     var email =
//     var password =
//     var DOB = 
//     var address =
//     var specialization =
//     var experience =  
//     // Insert user fields into the end user collection
//     EndUser.insert({
//         userType,
//         firstName,
//         lastName,
//         email,
//         password,
//         DOB,
//         address,
//         specialization,
//         experience,
//       createdAt: new Date(), // current time
//     });
//     }
//   },
// });

Template.trainer.helpers({
    photo:function(){
        return Session.get("photo");
    }

});

  Template.trainer.events({
    'click .profile1': function () {
      var cameraOptions = {
      width: 600,
      height: 700,
      correctOrientation: true,
      targetWidth:400, 
      targetHeight:400,
      allowEdit: true,
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });


Template.signup.helpers({
  tasks() {
    return Tasks.find({});
  },
});


Template.register.events({
    'click #registerButton': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('/search');
    }
});


Template.contentAndHeader.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});


Template.login.events({
    'click #loginButton': function(event){
    	console.log("one");
        event.preventDefault();
        var email = $('[id = username]').val();
        var password = $('[id = password]').val();
         Meteor.loginWithPassword(email, password, function(error){
    // console.log("You initiated the login process.");
     if(error){
        console.log(error.reason);
    } else {
        Router.go('/search');
    }
});    
     }

});



// Accounts.createUser({
//     email: email,
//     password: password
// }, function(error){
//     if(error){
//         console.log(error.reason); // Output error if registration fails
//     } else {
//         Router.go('/contentAndHeader'); // Redirect user if registration succeeds
//     }
// });









Router.route('/chat', function () {

    this.render('chat');
},
{
  name: 'chat'
});

Router.route('/message', function () {

    this.render('message');
},
{
  name: 'message'
});

Template.trainer.events({
  'click .btn'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    var specialization = $('[name=specialization]').val();
    var experience = $('[name=experience]').val();
    var availabletime = $('[name=availabletime]').val();
    var cost = $('[name=cost]').val();
    var pog = $('[name=pog]').val();
    var pog1 = $('[name=pog]').val();
    
    // Insert user fields into the end user collection
    EndUser.insert ({
        specialization: specialization,
        experience: experience,
        availabletime: availabletime,
        cost: cost,
        pog: pog,
        pog1: pog1,
      createdAt: new Date(), // current time
    });
    Session.get(selectedPlayer);
    <p>selectedPlayer</p>
  }
});



    }
});
