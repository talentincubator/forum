Template.subscriberClassic.events({
	'submit .subscriber-form': function (e) {
		e.preventDefault();
		var target = e.target; 
		var subscription = {};
		subscription.email = $(target).find('#emailform').val(); // fetch the input value
		subscription.course = $(target).find('#courseform').val(); // fetch the input value

		Meteor.call('insertSubscriber', subscription, function(err, id){
			if(err){ 
				Session.set('subscribeStatus', {
					message: err.reason,
					class: 'alert-danger'
				});
				console.log(err);			
			}else{
				console.log('successfully inserted subscriber: '+id);
				$(target).find('input').val("");
				Session.set('subscribeStatus', {
					message: '<b>Ευχαριστούμε</b>! Περιμενε στο email σου δωρεαν υλικο',
					class: 'alert-success'
				});
			}
		});

		Meteor.call('sendContactEmail', 
   			'flexprogram@talentincubator.eu',
            subscription.email,
            subscription.email,
            "New Subscription "+ subscription.course,
            "Email:"+ subscription.email+ " Course:"+subscription.course +" Date"+ new Date()
            );      
	
}});

Template.subscriberClassic.helpers({
	status: function () {
		// ...
		return Session.get('subscribeStatus');
	},
	message: function(){
		return Session.get('subscribeStatus').message;
	},
	class: function(){
		return Session.get('subscribeStatus').class;
	}
});