Meteor.startup(function() {
   Houston.add_collection(Meteor.users);
   Houston.add_collection(Houston._admins);
   Houston.add_collection(CRM);

  if (Courses.find({}).count() === 0) {
    var classes = ['js101', 'meteor101', 'node101', 'mongodb101', 'angular101', 'html101','python101','data101','data202'];
    _.each(classes, function(course) {
      Courses.insert({
        name: course,
        clickCount: 0,
        studentsInterested:[],
        activeStudents: [],
        prof: []
      });
    });
  }
});
