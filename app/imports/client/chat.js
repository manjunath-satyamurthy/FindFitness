Template.chat.onRendered(function onChatRendered (){
	$(".chat-body")[0].scrollTop = $(".chat-body")[0].scrollHeight  
});

Template.chat.helpers({
	is_user_message: function (value){
		user = Session.get('user')
		console.log(value._str == user._id._str)
		return value._str == user._id._str
	}
})

Template.chat.events({
	'click #send-msg-btn' (event){
		user = Session.get('user')
		message = $('input[name=typed-chat]').val().trim()
		if (message != ''){
			$('input[name=typed-chat]').val('')
			recipient_id = new Mongo.ObjectID($(event.currentTarget).data('recipientid'))
			existing_conversation = messageMap.find({from: user._id, to_list: recipient_id}).fetch().length
			if (existing_conversation == 0){
				messageMap_id = messageMap.find({from: user._id}).fetch()[0]
				if (messageMap_id){
					messageMap.update({_id: messageMap_id._id},
						{from: user._id, $push: {to_list: recipient_id}}, {upsert: true})
				}
				else {
					messageMap.insert({from: user._id, to_list: [recipient_id]})
				}
				
			}
			messages.insert({from: user._id, to: recipient_id, message: message })
		}

		$(".chat-body")[0].scrollTop = $(".chat-body")[0].scrollHeight  
	},

	'click #back-messages' (event){
		Router.go('messages')
	}
})