Meteor.startup(function() {
  Meteor.absoluteUrl.defaultOptions.rootUrl = "http://talentincubator.eu";

  Meteor.call('updateCRM', function (err, result) {
    if (err) throw err;
    console.log("CRM UPDATED");
  });
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    logo: '',
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: '/profile',
    verifyEmail: true,
    // verifyEmailRoute: '/checkmail',
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




