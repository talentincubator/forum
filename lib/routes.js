Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  EntrySignOut:'',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  },
 onAfterAction: function() {

  if(typeof SEO === 'object'){
      SEO.set({
        title:  SEO.settings.title,
        meta: {
          'description': SEO.settings.title.description
        },
        og: {
        'title': SEO.settings.og.title,
        'description': SEO.settings.og.description,
        'image': SEO.settings.og.image,
        'type':SEO.settings.og.type,
        'site_name':SEO.settings.og.site_name,
        'url':SEO.settings.og.url
        }
      });
    }  
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
   path: '/'
});

Router.route('/flexcurriculum.html', function(){
   Router.go('intro');
  }
);
Router.route('/curriculum.html', function(){
   Router.go('programs');
  }
);


Router.route('about', {
   path: '/about'
});

Router.route('programs', {
   path: '/programs',
   waitOn: function() {
     return [Meteor.subscribe('courses')];
   }
});


Router.route('programs/:course', {
   name: 'singlecourse',
   waitOn: function() {
     return [Meteor.subscribe('courses')];
   }
});

Router.route('home', {
    path: '/classroom'
});
Router.route('services', {
    path: '/services'
});
Router.route('applications', {
    path: '/applications'
});

Router.route('/classroom/forum', {
  name: 'postsList',
  controller: NewPostsController
});

Router.route('/classroom/forum/new/:postsLimit?', {name: 'newPosts'});

Router.route('/classroom/forum/best/:postsLimit?', {name: 'bestPosts'});


Router.route('/classroom/forum/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/classroom/forum/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/classroom/forum/submit', {
  name: 'postSubmit'
});

Router.route('/classroom/reports/new', {name: 'workoutInsert'});

Router.route('/classroom/reports', {
  name: 'workout',
  waitOn: function() {
    return  Meteor.subscribe('workouts');
}
});

Router.route('/api/:collection/:col?/:val?/', function(){

  var collection = this.params.collection;
  var col = this.params.col;
  var val = this.params.val;
  var doc = {};
  doc[col] = val;
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (this.request.method == 'GET') {
  this.response.end(JSON.stringify( (function () {
      if (collection == "Workouts"){
        return Workouts.find(doc).fetch(); 
      }
      if (collection == "crm")
        return CRM.find(doc).fetch();      
      if (collection == "Users")
        return Meteor.users.find(doc).fetch();
      if (collection == "Subscribers")
        return Meteor.subscribers.find(doc).fetch();      
  })()
  ));
  }else if (this.request.method == 'OPTIONS') {
    this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    this.response.end("OPTIONS Response With Parameter");
  }

  
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
        title:  SEO.settings.title,
        meta: {
          'description': SEO.settings.title.description
        },
        og: {
          'title': SEO.settings.og.title,
          'description': SEO.settings.og.description,
         'image': SEO.settings.og.image,
        'type':SEO.settings.og.type,
        'site_name':SEO.settings.og.site_name,
        'url':SEO.settings.og.url
        }
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
    template: 'profile',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });


 // Router.route('profile', {
 //    path: '/profile',
 //    data: function() {
 //      return Meteor.user();
 //    }
 //  });

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction('requireLogin', {only: 'postSubmit'});
