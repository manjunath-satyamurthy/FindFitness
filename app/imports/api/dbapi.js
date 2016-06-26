validate_login = function (username, password){
	user = users.find({'username': username,
		'password': password}).count()
	if (user > 0){
		return true;
	}
	else {
		return false;
	}
};

set_user_session = function(username, password){
	user = users.find({'username': username,
		'password': password}).fetch()[0]
	Session.set('user', user)
	return user
}

find_trainers = function(trainer_type, specialization, cost, from_time, to_time){
	trainers = users.find({
		'$or': [{'trainer_type': trainer_type[0]},
			{'trainer_type': trainer_type[1]}],
		'trainer_type': {'$exists': true},
		'specialization': specialization,
		'cost': {'$lte': parseInt(cost)},
		'user_type': 'trainer',
		'availability': { '$elemMatch':{
			'from': {'$lte': from_time},
			'to':{'$gte': to_time}
			}
		}
		}).fetch()
	console.log(trainers)
	return trainers
};


