Meteor.startup(function() {
  
  Meteor.absoluteUrl.defaultOptions.rootUrl = "http://talentincubator.eu";

  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    logo: '',
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: '/profile',
    language: 'en',
    showSignupCode: false,
    extraSignUpFields: [
    {
      field: "name",
      label: "Your Username",
      type: "text",
      required: true
    },
    {
      
      field:"role",
      label:"",
      name:"viewer",
      type: "hidden",
      required: true
    }
    ]
  });
});
