validate_login = function (username, password){
	user = users.find({'username': username,
		'password': password}).count()
	console.log(user)
	if (user > 0){
		return true;
	}
	else {
		return false;
	}
};

find_trainers = function(trainer_type, specialization, cost, from_time, to_time){
	trainers = users.find({
		'$or': [{'trainer_type': trainer_type[0]},
			{'trainer_type': trainer_type[1]}],
		'trainer_type': {'$exists': true},
		'specialization': specialization,
		'cost': {'$gte': parseInt(cost)},
		'user_type': 'trainer',
		'availability': { '$elemMatch':{
			'from': {'$lte': from_time},
			'to':{'$gte': to_time}
			}
		}
		}).fetch()
	return trainers
};

