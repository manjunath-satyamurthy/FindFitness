import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


import './signup.html';

import './body.html';
import './trainer.html';
import './nutritionist.html';



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

 


Router.route('/trainer',function () {
  
    this.render('trainer');  
},{
  name: 'trainer'

});

Router.route('/nutritionist',function () {
  
    this.render('nutritionist');  
},{
  name: 'nutritionist'

});

Template.signup.events({
    'click #myp': function(event){

    Router.go('trainer');     
    }
});

//Router.route(‘/profile’,{
 //waitOn: function () {
 //return Meteor.subscribe(‘images’)
// },
// action: function () {
// if (this.ready())
 //this.render(‘profile’);
 //else
// this.render(‘Loading’);
 //}
//});




Template.trainer.helpers({
  editing: function(){
    return Session.equals('reg', this._id);
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










// Template.signup.helpers({
//     photo: function () {
//       return Session.get("photo");
//     }
  // });

  Template.signup.events({
    'click .profile': function () {
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

Template.signup.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      dob: dob,
      address: address
       // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});







