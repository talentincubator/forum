CRM = new Mongo.Collection('crm');

CRM.allow({
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


Meteor.methods({
  importJSON: function(collection){
        console.log(collection);

        var data = JSON.parse(Assets.getText("users.json"));

        data.forEach(function (item, index, array) {
            CRM.insert(item);
        });
    
  }
});

Meteor.methods({
  updateCRM : function() {
  	var users = Meteor.users.find().fetch();
  	var subscribers = Subscribers.find().fetch();
  	var allusers = [];
  	allusers = users.concat(subscribers);
	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var date = curr_date + "/" + curr_month + "/"+ curr_year;

	function getEmail (user) {
  		if (user.email) {
  			return	user.email;}
  			return	allusers[i].emails[0].address;
 
  	}
	function getName (user) {
  		if (allusers[i].profile) {
  			return	allusers[i].profile.name;
  		}
  		return	userCRM.name;
 
  	}

  	function getUserCourses (user) {
  		if (user.profile) {
  			return user.profile.userIntCourses;
  		}
  		else if (user.course && !(user.profile) ){
  				return	[user.course];
  			}	
  		return	userCRM.courses;
  	}

  	function getUserType (user) {
  		if (!(userCRM.usertype)) {
  			if (user.email) {
  				return	"subscriber";
  			}
  		    return "user";
  		}
  		return userCRM.usertype;
  	}

  	for (var i in allusers) {
  		// name , email, type, info,courses1,course2,course3,course4,info,contact,
  		
  		var userCRM = CRM.findOne({email:getEmail(allusers[i])}) || {};
  		obj = {
  			name: getName(allusers[i]),
  			email: getEmail(allusers[i]) || userCRM.email,
  			usertype: userCRM.usertype || getUserType(allusers[i]),
  			info: userCRM.info || " ",
  			lastAction:userCRM.lastAction || " ",
  			lastActionData:userCRM.lastActionData || date,
  			courses:getUserCourses(allusers[i])
  		};
  		CRM.update({email:obj.email},obj,{upsert:true}, function(err) {
  			if (err) throw err;
   			 console.log("this was done - UPDATED");
  		});
	}
  }
});