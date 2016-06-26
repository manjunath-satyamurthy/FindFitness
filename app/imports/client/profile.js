//Profile Picture
Template.profilepic.events({
    'click .profilepic': function() {
        user = Session.get('user')
        var cameraOptions = {
            width: 600,
            height: 600,
            correctOrientation: true,
            // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
        };

        MeteorCamera.getPicture(cameraOptions, function(error, data) {
            Session.set("photo", data);
        });
    },
    'click .icon1': function() {
        photo = Session.get("photo");
        userid = Session.get('user');
        Meteor.startup(function() {
            navigator.notification.confirm('Do you want to save changes?', function(confirm) {
                if (confirm == 1) {
                    users.update({_id: user._id },
                        {
                            $set: {
                                pro_image: photo,
                            }
                        }
                    )
                    Session.set('user', users.find({_id: user._id}).fetch()[0])
                }
            })

        })
    }

});

Template.profilepic.helpers({
    photo: function() {
        return Session.get("photo");
    },

    defined: function(value, photo){
        return value != undefined && photo == undefined;
    },

    nothing_defined: function (value, photo){
        return value == undefined && photo == undefined;
    }
});

Template.perdetails.onRendered(function() {

    this.autorun(() => {
        if (GoogleMaps.loaded()) {

            $("#place").geocomplete().bind("geocode:result", function(event,
                result) {

                var lat = result.geometry.location.lat()
                var lng = result.geometry.location.lng()
                var name = result.address_components[0].long_name

                Session.set('lat', lat)
                Session.set('lng', lng)
                Session.set('name', name)
            });

        }
    });
});


//Personal Details
Template.perdetails.events({

    'click .perdetsave': function() {
        const firstname = $('[name=firstname]').val().trim();
        const lastname = $('[name=lastname]').val().trim();
        const dob = $('[name=dob]').val();
        const gender = $('#gender option:selected').val();
        var location = $('[name=place]').val();
        var user = Session.get('user');
        var lat = Session.get('lat')
        var lng = Session.get('lng')
        var name = Session.get('name')

        Meteor.startup(function() {
            navigator.notification.confirm('Do you want to save changes?', function(confirm) {
                if (confirm == 1) {
                    users.update({
                        _id: user._id
                    }, 
                    {
                        $set: 
                        {
                            firstname: firstname,
                            lastname: lastname,
                            dob: dob,
                            gender: gender,
                            location: {
                                name: name,
                                lat: lat,
                                lng: lng,
                                location: location
                            }
                        }
                    })

                }

            }, 'Save Changes', ['Save', 'Cancel'])

        })

        Session.set('user', users.find({_id: userid}).fetch()[0])
    }
});

Template.perdetails.helpers({
    equals: function(value) {
        return typeof(value) != 'undefined'
    },
    get_gender: function(value) {
        gender = 'undefined'
        user = Session.get('user')
        if (user.gender != undefined){
            gender = user.gender
        }
        return gender == value
    },
    get_acctype: function(acctype) {
        return acctype == Session.get('user').user_type
    },
});

//Professional Details
Template.prodetails.helpers({
    get_acctype: function(acctype) {
        return acctype == Session.get('user').user_type
    },

    get_string: function (datetime){
        return datetime.getHours()+":"+datetime.getMinutes()
    },

    has_specialization: function (splz){
        user = Session.get('user')
        if ($.inArray(splz, user.specialization)>= 0){
            return true 
        }
    },

    if_defined: function (value){
        if (value != undefined){
            return true
        }
    }
});

Template.prodetails.events({

    'click .icon1': function() {
        from = new Date('2016-01-01T'+$('[name=from]').val()+':00Z');
        to =  new Date('2016-01-01T'+$('[name=to]').val()+':00Z');
        user = Session.get('user');
        existing = false;
        availability = user.availability
        from_list = []
        to_list = []
        if (user.availability != undefined){
            for (i=0; i< availability.length; i++){
                if (from >= availability[i].from && to <= availability[i].to){
                    existing = true;
                }
            }
        }

        if (!existing) {
            users.update({_id: user._id}, {
                $push: {availability: {from: from, to: to}}
            })

            Session.set('user', users.find({_id: user._id}).fetch()[0])
        }

    },

    'click .prodetsave': function() {
        category = $('#user-category option:selected').val();
        experience = $('[name=experience]').val()
        trainer_spez = $($('#trainer-spez')[0]).val();
        cost = $('input[name=cost]').val();
        user = Session.get('user');

        Meteor.startup(function() {

            navigator.notification.confirm('Do you want to save changes?', function(confirm) {
                if (confirm == 1) {
                    users.update({
                        _id: user._id
                    }, {    
                        $addToSet: {specialization: {$each: trainer_spez},
                            trainer_type: {$each: ['personal', 'group']}},
                        $set: {
                            category: category,
                            experience: experience,
                            cost: parseInt(cost)
                        }
                    })
                }
            }, 'Save Changes', ['Save', 'Cancel'])

        })

        Session.set('user', users.find({_id: user._id}).fetch()[0])
    },

    'click .multiple-select': function (event){
        if ($(event.currentTarget).hasClass('selected')){
            $(event.currentTarget).removeClass('selected')
        }
        else {
            $(event.currentTarget).addClass('selected')
        }
    }
});