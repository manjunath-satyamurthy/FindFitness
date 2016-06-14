import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze'
import './signup.html';
import './body.html';

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

Router.route('/navigationBar',function () {
	
    this.render('navigation');	
},{
	name: 'navigationBar'

});


Router.route('/register',function () {
	
    this.render('register');	
},{
	name: 'register'

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




Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('/contentAndHeader');
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
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
         Meteor.loginWithPassword(email, password);
    }
});


Meteor.loginWithPassword(email, password, function(error){
     if(error){
        console.log(error.reason);
    } else {
        Router.go("/");
    }
});


Accounts.createUser({
    email: email,
    password: password
}, function(error){
    if(error){
        console.log(error.reason); // Output error if registration fails
    } else {
        Router.go("contentAndHeader"); // Redirect user if registration succeeds
    }
});









Template.signup.helpers({
    photo: function () {
      return Session.get("photo");
    }
  });

  Template.signup.events({
    'click .profile': function () {
      var cameraOptions = {
      width: 600,
      height: 600,
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






