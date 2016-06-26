Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});

Template.signup.events({
	'submit .signup-form':function(event){
    event.preventDefault();
    const acctype  = $('#account-type option:selected').val();
    const username = $('[name=username]').val().toLowerCase().trim();
    const email    = $('[name=email]').val().toLowerCase().trim();
    const password = $('[name=password]').val().trim();

    if (acctype != 'none' && username != '' && password != ''){
      users.insert({
        user_type : acctype,
        username: username,
        email   : email,
        password : password
      })
    }

  Router.go('login')
  }
});



