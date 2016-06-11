Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
	layout.template('layout')
}, {
	name: 'signup',
});

Router.route('/test', function () {
  this.render('app_layout');
}, {
	name: 'test',
});

Router.route('/suser', function(){
	this.render('suser');
}, {
	name: 'suser',
});

Router.route('/strainer', function(){
	this.render('strainer');
}, {
	name: 'strainer',
});

Router.route('/snutritionist', function(){
	this.render('snutritionist');
}, {
	name: 'snutritionist',
});

