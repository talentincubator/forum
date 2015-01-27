Subscribers = new Meteor.Collection('subscribers');

Meteor.methods({
	insertSubscriber: function(subscription){
		var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		if(reg.test(subscription.email)){
			var date = new Date().getTime(); // in epoch milliseconds
			return Subscribers.insert({email: subscription.email, course:subscription.course, joined: date});
		} else {
			throw new Meteor.Error(422, 'Invalid Email. Please try again.');
		}
			
	}
});