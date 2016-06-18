Router.route('/', function () {
  this.render('login');
});

Router.route('/signup', function(){
	this.render('signup');
}, {
	name: 'signup',
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
	query = this.params.query

	selected = []
	if (query.personal == 'true'){
		selected.push('personal')
	}
	if (query.group == 'true'){
		selected.push('group')
	}

	from_time = new Date('2016-01-01T'+query.from+':00Z')
	to_time = new Date('2016-01-01T'+query.to+':00Z')

	available_trainers = find_trainers(
		selected, query.splz, query.cost, from_time, to_time)

  	this.render('results',{
  		data: {
  			results: available_trainers,
  			results_count: available_trainers.length
  		}});
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
	$('.clickable').removeClass('active')
	$('#'+route_path).addClass('active')
    $('#simple-menu').click();
	// this.next()
})

