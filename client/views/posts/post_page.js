Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  submitted: function() {
  	return this.submitted.UTC();
  }
});