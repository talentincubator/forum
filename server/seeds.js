Meteor.startup(function() {
  if (Courses.find({}).count() === 0) {
    var classes = ['js101', 'meteor101', 'node101', 'mongodb101', 'angular101', 'html101'];
    _.each(classes, function(course) {
      Courses.insert({
        name: course,
        clickCount: 0,
        activeStudents: 0,
        prof: ""
      });
    });
  }
});
