Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
}, {
	name: 'signup',
});