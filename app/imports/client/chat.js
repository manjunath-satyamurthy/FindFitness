Template.chat.onRendered(function onChatRendered (){
	$(".chat-body")[0].scrollTop = $(".chat-body")[0].scrollHeight  
});

Template.chat.helpers({
	is_user_message: function (value){
		user = Session.get('user')
		console.log(value._str == user._id._str)
		return value == user._id
	}
})

Template.chat.events({
	'click #send-msg-btn' (event){
		user = Session.get('user')
		message = $('input[name=typed-chat]').val().trim()
		if (message != ''){
			$('input[name=typed-chat]').val('')
			console.log($(event.currentTarget).data('recipientid'), 'recipientid');
			recipient_id = $(event.currentTarget).data('recipientid')
			existing_conversation = messageMap.find({from: user._id, to_list: recipient_id}).fetch().length
			messages.insert({from: user._id, to: recipient_id, message: message })
		}

		$(".chat-body")[0].scrollTop = $(".chat-body")[0].scrollHeight  
	},

	'click #back-messages' (event){
		Router.go('messages')
	}
})