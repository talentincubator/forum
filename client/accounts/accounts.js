Meteor.startup(function() {
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
    }
    ]
  });
});
