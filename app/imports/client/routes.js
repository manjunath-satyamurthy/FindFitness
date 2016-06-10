Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
}, {
	name: 'signup',
});

Router.route('/test', function () {
  this.render('app_layout');
}, {
	name: 'test',
});