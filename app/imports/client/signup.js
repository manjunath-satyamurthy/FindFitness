import { Template } from 'meteor/templating';

import '../ui/css/signup.css'

Template.signup.onCreated(function signupOnCreated() {
  console.log("signup");
});