Template.results.events({
	'click .show' (event){
		const is_active = $(event.currentTarget).parent().hasClass('active')
		console.log(is_active)
		if (!is_active){
			$('.results-list').removeClass('active')
			$(event.currentTarget).parent().addClass('active')
		}
		else {
			$(event.currentTarget).parent().removeClass('active')
		}
	},

	'click #back-search' (event){
		Router.go("/search");
	},

	'click .request-btn' (event){
		user = Session.get('user')
		trainerId = new Mongo.ObjectID(event.currentTarget.id)
		trainer = users.find({_id: trainerId}).fetch()[0]
		Meteor.startup(function() {
			is_requested = requests.find({'requester': user._id, 'requested': trainer._id}).fetch()
			if (is_requested.length > 0){
				navigator.notification.alert('Request already sent, plase wait for response')
			}
			else {
				navigator.notification.confirm('Confirm if you want to send a request to '+
				trainer.firstname, function(confirm){
					if (confirm == 1)
						{
							requests.insert({'requester': user._id, 
								'requested': trainer._id, 'status': 'waiting'})
						}
					$('.results-list').removeClass('active')
				}, 'Confirm Request', ['Confirm', 'Cancel'])
			}
			
		})
	},

	'click .chat-btn' (event){
		to_id = $(event.currentTarget).data('id')
		Router.go('chat', {}, {query: "to_id="+to_id})
	}
})