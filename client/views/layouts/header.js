Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name;
    });
    
    return active && 'active';
  },
  	classroomstudent: function () {
		var url = Router.current().url;
		console.log(Router.current().url);
		if(Meteor.userId && url=="/classroom")
			return true;		
	}
});