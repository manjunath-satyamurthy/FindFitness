Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
}, {
	name: 'signup',
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


Router.route('/profilepicture', function(){
	this.render('profilepicture');
}, {
	name: 'profilepicture',
});

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

Router.onRun(function (){
	const route_path = Router.current().route.getName()
	$('.clickable').removeClass('active')
	$('#'+route_path).addClass('active')
    $('#simple-menu').click();
	this.next()
})

