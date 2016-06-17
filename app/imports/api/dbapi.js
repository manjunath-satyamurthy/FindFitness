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

find_trainers = function(query){
	
};