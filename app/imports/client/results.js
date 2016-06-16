Template.results.events({
	'click .results-list' (event){
		const is_active = $(event.currentTarget).hasClass('active')
		if (!is_active){
			$(event.currentTarget).addClass('active')
		}
		else {
			$(event.currentTarget).removeClass('active')
		}
	}
})