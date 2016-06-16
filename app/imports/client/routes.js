Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
}, {
	name: 'signup',
});

// Router.route('/suser', function(){
// 	this.render('suser');
// }, {
// 	name: 'suser',
// });

// Router.route('/strainer', function(){
// 	this.render('strainer');
// }, {
// 	name: 'strainer',
// });

// Router.route('/snutritionist', function(){
// 	this.render('snutritionist');
// }, {
// 	name: 'snutritionist',
// });


Router.route('/search', function () {
	
	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Search'
  		}
 	})

  	this.render('search');
	},
	{
		name: 'search',
	}
);

Router.route('/subscriptions', function () {
	
	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Subscriptions'
  		}
 	})

  	this.render('subscriptions');
	},
	{
		name: 'subscriptions',
	}
);

Router.route('/messages', function () {
	
	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Messages'
  		}
 	})

  	this.render('messages');
	},
	{
		name: 'messages',
	}
);

Router.route('/requests', function () {
	
	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Requests'
  		}
 	})

  	this.render('requests');
	},
	{
		name: 'requests',
	}
);

Router.route('/profile', function () {
	
	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Profile'
  		}
 	})

  	this.render('profile');
	},
	{
		name: 'profile',
	}
);

Router.route('/results', function () {
  	this.render('results');
	},
	{
		name: 'results',
	}
);


Router.route('/logout', function () {
  this.render('login');
}, {
	name: 'logout',
});

Router.route('/perdetails', function(){
	this.render('perdetails');
}, {
	name: 'perdetails',
});

Router.route('/prodetails', function(){
	this.render('prodetails');
}, {
	name: 'prodetails',
});

Router.route('/profilepic', function(){
	this.render('profilepic');
}, {
	name: 'profilepic',
});

Router.route('/accdetails', function(){
	this.render('accdetails');
}, {
	name: 'accdetails',
});

Router.onRun(function (){
	const route_path = Router.current().route.getName()
	console.log(route_path)
	$('.clickable').removeClass('active')
	$('#'+route_path).addClass('active')
    $('#simple-menu').click();
	this.next()
})

