Template.workout.helpers({
	workouts: function () {
		return Workouts.find({}, {sort: {period: -1}});
	}
});

Template.userworkout.helpers({
  week:function () {
    return  Math.floor(this.period/10);
  },
  meeting:function () {
    return this.period % 10;
  },
  period:function () {
    return this.period ;
  }
});

Template.workoutInsert.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var workout = {
      studying: $(e.target).find('[name=studying]').val(),
      excersices: $(e.target).find('[name=excersices]').val(),
      hoursstudying: $(e.target).find('[name=hoursstudying]').val(),
      meetingGrade: $(e.target).find('[name=meetingGrade]').val(),      
      meetingComments: $(e.target).find('[name=meetingComments]').val(),
      // test: $(e.target).find('[name=test]').val() || 0,
      period:  Number($(e.target).find('[name=period]').val()), 
    };
    


    // var errors = validatePost(post);
    // if (errors.title || errors.url)
    //   return Session.set('postSubmitErrors', errors);
    
    Meteor.call('workoutInsert', workout, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This has already been posted');
      else
        Router.go('workout', {_id: result._id});  
    });
  }
});