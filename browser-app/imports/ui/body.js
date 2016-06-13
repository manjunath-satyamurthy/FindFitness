import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze'
import './signup.html';
import './body.html';

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


Router.route('/register',function () {
	
    this.render('register');	
},{
	name: 'register'

});


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
        Router.go('/contentAndHeader');
    }
});    
     }

});

Accounts.createUser({
    email: email,
    password: password
}, function(error){
    if(error){
        console.log(error.reason); // Output error if registration fails
    } else {
        Router.go('/contentAndHeader'); // Redirect user if registration succeeds
    }
});

