Template.requests.helpers({
	is_user: function (value) {
		return value == 'user'
	},

	defined: function(value){
		if (value != undefined){
			return true
		}
	},
})

Template.requests.events({
	'click .status-change' (event){
		user - Session.get('user')
		reqs = requests.find({'requested': user._id}).fetch()[0]
		Meteor.startup(function() {
			navigator.notification.prompt("Accept or Request Reject",
				function (reaction){
					status = ''
					if (reaction == 1){
						status = 'rejected'
					}
					else {
						status = 'accepted'
					}
					requests.update({_id: reqs._id}, {$set:{'status': status}})
				}, 'React - Request', ['Accept', 'Cancel'])
		})
	}
})