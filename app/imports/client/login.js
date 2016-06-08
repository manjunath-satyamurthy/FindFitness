import { Template } from 'meteor/templating';

import '../ui/css/login.css'

Template.login.onCreated(function loginOnCreated() {
  console.log("login");
});