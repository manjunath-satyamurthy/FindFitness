Template.messages.events({
	'click .message-list' (event){
		console.log("here")
		recipient_id = $(event.currentTarget).data('recipient')
		Router.go('chat', {}, {query: 'to_id='+recipient_id})
	}
})


Template.messages.helpers({
	defined: function(value){
		if (value != undefined){
			return true
		}
	},
})