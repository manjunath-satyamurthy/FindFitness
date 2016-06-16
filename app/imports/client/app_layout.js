Template.app_layout.onRendered(function layoutONRendered() {    
    $('#simple-menu').sidr({
        body: '#layout-body',
        timing: 'cubic-bezier(0.32,1.25,0.375,1.15)',
    });
    $('html').css("overflow", "hidden")
    const route_path = Router.current().route.getName()
    $('.clickable').removeClass('active')
    $('#'+route_path).addClass('active')
});

Template.app_layout.events({
    'click .clickable' (event){
        const redirect_path = $(event.target).find('a').attr('href');
        Router.go(redirect_path);
    }
})

Template.app_layout.helpers({
    layoutGestures: {
        'swiperight #layout-body': function (event, templateInstance){
            if (event.center.x < 170){
                $.sidr('open', 'sidr')
            }
        },
        'swipeleft #layout-body': function (event, templateInstance){
            $.sidr('close', 'sidr')
        }
    }
})
