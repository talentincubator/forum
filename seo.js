Meteor.startup(function() {
  if(Meteor.isClient) {
    SEO.config({
      title: 'Talent Incubator',
      meta: {
        'description': 'Talent Incubator '
      },
      og: {
        'image': Meteor.absoluteUrl('images/favicons/favicon.ico')
      },
      ignore: {
        meta: ['fragment', 'viewport', 'msapplication-TileColor', 'msapplication-TileImage', 'msapplication-config'],
        link: ['stylesheet', 'apple-touch-icon', 'rel', 'shortcut icon', 'icon']
      }
    });
  }
});
