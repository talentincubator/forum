Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@talentincubator.eu',
    password: '2e4d1d37aea5a244fa088e7f61e51573'
  });

  Meteor.methods({
    'sendContactEmail': function(receiverEmail, name ,senderEmail, subject, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: receiverEmail,
        from: name + ' <' + senderEmail + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: senderEmail, message: message})
      });
    }
  });
});
