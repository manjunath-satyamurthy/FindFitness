import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze'
 
import './body.html';

// Template.login.events({
//     'click .forms': function(){
// 	background-color : blue;     
//     }
// });


Router.route('/', function () {
	name: 'login',
    this.render('login');
});

Router.route('/signup',function () {
	name: 'signup',
    this.render('signup');	
});

Router.route('/search',function () {
	name: 'search',
    this.render('search');	
});



Router.route('/contentAndHeader',function () {
	name: 'contentAndHeader',
    this.render('contentAndHeader');	
});

Router.route('/navigationBar',function () {
	name: 'navigationBar',
    this.render('navigation');	
});



/*
Template.login.events({
	'click button'(event, instance){
		console.log(Blaze.currentView);
		Blaze.remove(Template.login);
		console.log(Template.login)
	}
})
*/
