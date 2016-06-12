Template.app_layout.onRendered(function layoutONRendered() {    
    $('#simple-menu').sidr({
        body: '#layout-body'
    });
    $('html').css("overflow", "hidden")
    const route_path = Router.current().route.getName()
    $('.clickable').removeClass('active')
    $('#'+route_path).addClass('active')
    console.log("here too")
});

Template.app_layout.events({
    'click .clickable' (event){
        const redirect_path = $(event.target).find('a').attr('href');
        Router.go(redirect_path);
    }
})

