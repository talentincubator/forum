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
  courseUpdate:function(doc)
  {  
     Courses.update({name:doc.course},{$inc:{clickCount:1}});
     Courses.update({name:doc.course},{$push:{interestedUsers:doc.userId}}, function(error){
       if (error) {
         throw error;
       }
     });

     console.log('update happened');
  }
});
