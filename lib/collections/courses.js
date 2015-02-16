Courses = new Mongo.Collection('courses');

Courses.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Courses.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
}
);

Meteor.methods({
  courseUpdate:function(course,userId)
  {  
     Courses.update({name:course},{$inc:{clickCount:1},$push:{interestedUsers:userId}}, function(error){
       if (error) {
         throw error;
       }
     });
     var date = new Date();
     var user = Meteor.user();

     // Meteor.users.update({_id:userId},{$push:{interestedCourses:course}}, function(error){
     //   if (error) {
     //     throw error;
     //   }
     // });

    Meteor.call('sendContactEmail',
            'flexprogram@talentincubator.eu',
            user.profile.name,
            user.emails[0].address,
            "TI: Interested User in "+ course,
            "Name:"+ user.profile.name+ "/n Course:"+course,function(error){
       if (error) {
         throw error;
       }
       console.log('email sent');
     });  
    
    console.log('update happened');

  }
  });