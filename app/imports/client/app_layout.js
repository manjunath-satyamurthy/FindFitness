Template.app_layout.onRendered(function layoutONRendered() {
  $('#simple-menu').sidr({
  	body: '#layout-body'
  });
  $('html').css("overflow", "hidden")
  console.log("hello")
});
