const timeRange = {
	1: "00:00 - 00:30", 2: "00:30 - 01:00", 3: "01:00 - 01:30", 4: "01:30 - 02:00",
	5: "02:00 - 00:30", 6: "02:30 - 03:00", 7: "03:00 - 03:30", 8: "03:30 - 04:00",
	9: "04:00 - 40:30", 10: "04:30 - 05:00", 11: "05:00 - 05:30", 12: "05:30 - 06:00",
	13: "06:00 - 06:30", 14: "06:30 - 07:00", 15: "07:00 - 07:30", 16: "07:30 - 08:00",
	17: "08:00- 08:30", 18: "08:30 - 09:00", 19: "09:00 - 09:30", 20: "09:30 - 10:00",
	21: "10:00 - 10:30", 22: "10:30 - 11:00", 23: "11:00 - 11:30", 24: "11:30 - 12:00",
	25: "12:00 - 12:30", 26: "12:30 - 13:00", 27: "13:00 - 13:30", 28: "13:30 - 14:00",
	29: "14:00 - 14:30", 30: "14:30 - 15:00", 31: "15:00 - 15:30", 32: "15:30 - 16:00",
	33: "16:00 - 16:30", 34: "16:30 - 17:00", 35: "17:00 - 17:30", 36: "17:30 - 18:00",
	37: "18:00 - 18:30", 38: "18:30 - 19:00", 39: "19:00 - 19:30", 40: "19:30 - 20:00",
	41: "20:00 - 20:30", 42: "20:30 - 21:00", 43: "21:00 - 21:30", 44: "21:30 - 22:00",
	45: "22:00 - 22:30", 46: "22:30 - 23:00", 47: "23:00 - 23:30", 48: "23:30 - 00:00",
}

Template.search.onRendered(
	function OnSearchRendered() {
		Session.setDefault('page', 'trainer')
	}
)

Template.search.helpers({
	isPage: function (page) {
		return page == Session.get('page')
	},

    searchGestures: {
        'swiperight .search-content': function (event, templateInstance){
            if (event.center.x > 170){
                $('.search-nav').removeClass('active')
                $('#search-trainer').addClass('active')
                Session.set('page', 'trainer')
            }
        },
        'swipeleft .search-content': function (event, templateInstance){
        	if ($.sidr('status', 'sidr').opened == false){
	            $('.search-nav').removeClass('active')
	            $('#search-nutritionist').addClass('active')
	            Session.set('page', 'nutritionist')
        	}
        }
    }
})

Template.search.events({
	'click .search-nav' (event){
		const _id = event.currentTarget.id
		const target = event.currentTarget.getAttribute('data-page')
		$('.search-nav').removeClass('active')
		$('#'+_id).addClass('active')
		Session.set('page', target)
	}
})

Template.trainer.events({
	'click .uncheck-replace' (event){
		const name = event.currentTarget.getAttribute('name');
		$(event.currentTarget).hide()
		$('.custom-check[name='+name+']');
		$('.custom-check[name='+name+']').click();
		$('.check-replace[name='+name+']').show();
	},

	'click .check-replace' (event){
		const name = event.currentTarget.getAttribute('name');
		$(event.currentTarget).hide()
		$('.custom-check[name='+name+']').click();
		$('.uncheck-replace[name='+name+']').show();
	},

	'input #preferred-time' (event){
		value = $(event.currentTarget)[0].value
		$('#display-time').empty().append(timeRange[value])
	},

	'input #cost' (event){
		value = $(event.currentTarget)[0].value
		$('#display-cost').empty().append(10*value)
	},

	'click #search-btn' (event){
		Router.go('/results')
	}
})