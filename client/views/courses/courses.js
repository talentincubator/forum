Template.share.helpers({
  url: function (){
    var uri = Router.current().url;
    var host = Meteor.absoluteUrl();
    if (uri[0] =="/") 
      return host.substring(0, host.lastIndexOf('/')) + decodeURIComponent(uri);
    return  decodeURIComponent(uri);
  }
});


Template.singlecourse.helpers({
  myTemplate: function (){
    return Router.current().params.course;
  }
});


Template.footer.helpers({
  login : function() {
    var uri = Router.current().url;
    if (uri =="/sign-in" || uri =="/sign-up" || uri =="/forgot-password") {
      return false;
    }
    return true;
  },
  url: function (){
    var uri = Router.current().url;
    return decodeURIComponent(uri);
  }
});

Template.programs.helpers({
  url: function (){
    var uri = Router.current().url;
    return decodeURIComponent(uri);
  },
  js101: function() {
    return "js101";
  }
});

Template.programs.rendered = function(){
if (Meteor.user()) {
  var userIntCourses = Meteor.user().profile.userIntCourses;
  Session.set('userIntCourses',userIntCourses);
  (function(event,template){
  var coursenodes =  $('.coursebutton');
  _.each(coursenodes, function(btn){
    var node = $(btn);
    if (!(userIntCourses.indexOf(node.context.attributes[1].value) === -1) ) {
    node.fadeOut();
    }
  });
  })();
  }
};



Template.programs.events({
  "click .coursebutton": function(event, template){
    var course = event.currentTarget.attributes[1].value;
    var userIntCourses = Meteor.user().profile.userIntCourses || [];
    if (Meteor.user().profile.role=="viewer") {
      Meteor.user().profile.role = "intStudent";
    }
    if (course && !(course in userIntCourses)) {
      Meteor.call('courseUpdate', course, Meteor.userId(), function(){
        console.log('call made');
      });
      Meteor.users.update(Meteor.userId(), {$push:{"profile.userIntCourses": course}});
      $(event.currentTarget).fadeOut();
    }

  }
});


//VERIFY THE EMAIL ADDRESS
Template.intro.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message == 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.');
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.');
      }
    });
  }
};