Workouts = new Mongo.Collection("workouts");


Workouts.attachSchema(new SimpleSchema({
    userId: {
        type: String,
    },    
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z-]/,
        optional: false
    },
    studying: {
        type: String,
        regEx: /^[0-9]{1,3}$/,
         optional: false
    },
    excersices: {
        type: String,
        regEx: /^[0-9]{1,3}$/,
         optional: false
    },
    hoursstudying: {
        type: String,
        regEx: /^[0-9]{1,2}$/,
         optional: false
    },
    meetingGrade: {
        type: String,
        regEx: /^[0-9]{1,2}$/,
        optional: false
    },   
        meetingComments: {
        type: String,
        regEx: /^[a-z0-9A-Z_]/,
        optional: true
    },     
    test: {
        type: String,
        optional: true
    },
        createdAt: {
        type: Date
    },
        period: {
        type: Number,
        regEx: /^[0-9]{3}$/
    }
    // ,
    // country: {
    //     type: Schema.UserCountry,
    //     optional: true
    // }
}));

Workouts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'studying', 'excersices','hoursstudying','meetingGrade').length > 0);
  }
});

Meteor.methods({
  workoutInsert: function(postAttributes, error) {
    check(postAttributes, {
      studying: String,
      excersices: String,
      hoursstudying: String,
      meetingGrade: String,
      meetingComments:String,      
      period: Number,
    });

    var user = Meteor.user();
    var assignment = _.extend(postAttributes, {
      userId: user._id, 
      username: user.profile.name ,
      createdAt: new Date(),
      // submitted: new Date(),
      // commentsCount: 0,
      // upvoters: [], 
      // votes: 0
    });

  var postWithSamePeriod = Workouts.findOne({userId:assignment.userId, period:assignment.period});
    if (postWithSamePeriod) {
      return {
        postExists: true,
        _id: postWithSamePeriod._id
      };
    }
      if (error)
        return throwError(error.reason);

    if (error) {
        console.log(error);
    }
     console.log(assignment);
  	return Workouts.insert(assignment);
  }
});



// Schema.User = new SimpleSchema({
//     username: {
//         type: String,
//         regEx: /^[a-z0-9A-Z_]{3,15}$/
//     },
//     emails: {
//         type: [Object],
//         // this must be optional if you also use other login services like facebook,
//         // but if you use only accounts-password, then it can be required
//         optional: true
//     },
//     "emails.$.address": {
//         type: String,
//         regEx: SimpleSchema.RegEx.Email
//     },
//     "emails.$.verified": {
//         type: Boolean
//     },
//     createdAt: {
//         type: Date
//     },
//     profile: {
//         type: Schema.UserProfile,
//         optional: true
//     },
//     services: {
//         type: Object,
//         optional: true,
//         blackbox: true
//     }
//     // Add `roles` to your schema if you use the meteor-roles package.
//     // Note that when using this package, you must also specify the
//     // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
//     // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
//     // You can't mix and match adding with and without a group since
//     // you will fail validation in some cases.
//     // roles: {
//     //     type: Object,
//     //     optional: true,
//     //     blackbox: true
//     // }
// });

// Meteor.users.attachSchema(Schema.User);



