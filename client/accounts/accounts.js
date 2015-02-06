Meteor.startup(function() {
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    logo: '/images/logo.png',
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: '/profile',
    language: 'en',
    showSignupCode: false,
    extraSignUpFields: [
    {
      field: "username",
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
