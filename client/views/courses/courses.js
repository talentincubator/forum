Template.programs.helpers({
  get: function(){

  }
});

Template.programs.rendered = function(){
  console.log(Meteor.user());
  var userIntCourses = Meteor.user().profile.userIntCourses;
  Session.set('userIntCourses',userIntCourses);
  (function(event,template){
  var coursenodes =  $('.coursebutton');
  console.log(coursenodes);
  _.each(coursenodes, function(btn){
    var node = $(btn);
    console.log(node);
    if (!(userIntCourses.indexOf(node.context.attributes[1].value) === -1) ) {
    node.fadeOut();
    }
  });
  })();
};



Template.programs.events({
  "click .coursebutton": function(event, template){
    var course = event.currentTarget.attributes[1].value;
    if (course) {
      console.log('clicked');
      var doc = {course:course, userId: Meteor.userId() };
      Meteor.call('courseUpdate', doc, function(){
        console.log('call made');
      });
      Meteor.users.update(Meteor.userId(), {$push:{"profile.userIntCourses": course}});
      console.log(event);
      console.log($(event.currentTarget));
      $(event.currentTarget).fadeOut();
    }

  }
});
