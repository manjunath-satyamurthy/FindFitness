import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.login.onCreated(function loginOnCreated() {
  console.log("login");
});

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

Router.route('/', function () {
this.render('login');	// body...
}, {
	name:'login',
});

Router.route('/signup',function () {
this.render('signup');	// body...
}, {
	name: 'signup'
});

