Template.header.helpers({
	classroomstudent: function () {
		var url = Router.current().url;
		console.log(Router.current().url);
		if(Meteor.userId && url=="/classroom")
			return true;		
	}
});
