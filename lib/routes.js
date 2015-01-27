Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});


PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('forumPosts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment});
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment});
  }
});

Router.route('intro', {
   path: '/intro'
});

Router.route('about', {
   path: '/about'
});

Router.route('programs', {
   path: '/programs',
   waitOn: function() {
     return [Meteor.subscribe('courses')];
   }
});

Router.route('home', {
    path: '/'
});
Router.route('services', {
    path: '/services'
});
Router.route('applications', {
    path: '/applications'
});

Router.route('forum/', {
  name: 'postsList',
  controller: NewPostsController
});

Router.route('forum/new/:postsLimit?', {name: 'newPosts'});

Router.route('forum/best/:postsLimit?', {name: 'bestPosts'});


Router.route('forum/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('forum/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('forum/submit', {
  name: 'postSubmit'
});

Router.route('reports/new', {name: 'workoutInsert'});

Router.route('reports', {
  name: 'workout',
  waitOn: function() {
    return  Meteor.subscribe('workouts');
}
});

Router.route('/api/:api', function(){
  var result = this.params.api;
  console.log(result);
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  this.response.end('Found some posts...  ' + JSON.stringify( (function () {
      if (result == "Workouts")
        return Workouts.find().fetch();
      if (result == "Users")
        return Meteor.users.find({}).fetch().pretty();
  })()
  ));
}, {where: 'server'});



Router.route('dashboard', {
    path: '/dashboard',
    loginRequired: 'entrySignIn',
    waitOn: function() {
      return this.subscribe("items");
    },
    data: {
      items: Items.find({})
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Dashboard | ' + SEO.settings.title
      });
    }
  });

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

 Router.route('profile', {
    path: '/profile',
    data: function() {
      return Meteor.user();
    }
  });

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction('requireLogin', {only: 'postSubmit'});
