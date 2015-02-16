Template.profile.helpers({
  profileFields: function() {
    return [
      { name: "firstName", required: true },
      { name: "lastName", required: true },
      { name: "name", required: true },
      { name: "organizationWorking", required: false },
      { name: "position", required: false },
      { name: "location", required: false },
      { name: "professionalSkills", required: false, type: 'text_area' },
      { name: "linkedinUrl", required: false },
      { name: "twitterHandle", required: false }
    ];
  }
});

Template.profile.events({
  'submit form': function(event) {
    event.preventDefault();
    var data = SimpleForm.processForm(event.target); 
    var moredata = _.extend(data, {
    name: data.name || Meteor.user().profile.name});
    Meteor.users.update(Meteor.userId(), {$set: {profile: moredata}});
    Router.go('home');  
  }
});



Template._profileField.helpers({
  profile: function() {
    if (Meteor.user()) {
      return Meteor.user().profile;
    }
  },

  isTextField: function() {
    return this.type !== 'file' && this.type !== 'text_area';
  },

  isTextArea: function() {
    return this.type === 'text_area';
  },

  isCheckbox: function() {
    return this.type === 'checkbox';
  },

  isFileField: function() {
    return this.type === 'file';
  }
});
