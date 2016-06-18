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
  			'pageTitle': 'Search',
  			'user': Session.get('user')
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
  			'pageTitle': 'Subscriptions',
  			'user': Session.get('user')
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
  			'pageTitle': 'Messages',
  			'user': Session.get('user')
  		}
 	})

  	this.render('messages');
	},
	{
		name: 'messages',
	}
);

Router.route('/requests', function () {
	
	user = Session.get('user')
	if (user.user_type == 'user'){
		var query = {
			'requester': user._id,
		}
	}
	else {
		var query = {
			'requested': user._id
		}
	}
	
	reqs = requests.find(query).fetch()

	for (i=0; i< reqs.length; i++){
		if (reqs[i].status == 'waiting'){
			reqs[i]['pay'] = 'inactive'
		}
		if (user.user_type == 'user'){
			reqs[i]['related'] = users.find({_id: reqs[i].requested}).fetch()[0]
		}
		else {
			reqs[i]['related'] = users.find({_id: reqs[i].requester}).fetch()[0]	
		}
		
	}

	this.layout('app_layout', {
  		data: {
  			'pageTitle': 'Requests',
  			'requests': reqs,
  			'requests_count': reqs.length,
  			'user': Session.get('user')
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
  			'pageTitle': 'Profile',
  			'user': Session.get('user')
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
	self = this;

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

	user = Session.get('user')

	get_distances = function(index){
		if (index >= 0){
			GoogleDistance.get({
				origin: user.location.lat+','+user.location.lng,
				destination: available_trainers[index].location.lat+','+
					available_trainers[index].location.lng
			}, function (err, data){
				if (!err){
					available_trainers[index]['distance'] = data.distance
					index -= 1
					get_distances(index)
				}
			})
		}
		else {
		  	self.render('results',{
		  		data: {
		  			results: available_trainers.sort(function(a, b) {
		  				return a.distance - b.distance
		  			}),
		  			results_count: available_trainers.length
		  		}});
		}
	}

	get_distances(available_trainers.length-1)

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
})

