Meteor.startup(function() {
  if (Meteor.client) {
     SEO.config({
      title: 'Talent Incubator School of Coding',
      meta: {
        'description': 'Academy of coding, javascript, nodejs, angular, meteor, python, data analysis'
      },
      og: {
        'image': "http://talentincubator.eu/images/favicons/favicon.ico",
        'type':'website',
        'title':'Talent Incubator School of Coding',
        'description':'Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers',
        'site_name':'Talent Incubator School',
        'url':'http://talentincubator.eu/'
      },
      twitter: {
        'card':'Talent Incubator School of coding',
        'image': "http://talentincubator.eu/images/favicons/favicon.ico",
        'title':'Talent Incubator School of Coding',
        'description':'Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers',
        'site':'Talent Incubator School of Coding',
        'url':'http://talentincubator.eu/'
      },      
      ignore: {
        link: ['stylesheet', 'apple-touch-icon', 'rel', 'shortcut icon', 'icon']
      },
     auto: {
      twitter: true,
      og: true,
      set: ['image','description', 'url', 'title']
    }
    });

Meta.config({
  options: {
    title: "Default Title",
    suffix: "Suffix",
    namespace: "project"
  }
});

Meta.set('image', "http://talentincubator.eu/images/logo.png");
Meta.set('type','website');
Meta.set('title','Talent Incubator - School of Coding');
Meta.set('description','Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers');
Meta.set('site_name','Talent Incubator School');
Meta.set('url','https://talentincubator.eu/');
}
  });

  // <meta name="description" content="Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers"/>

  // <!-- Open Graph Meta Tags -->
  // <meta property="og:type" content="website"/>
  // <meta property="og:title" content="Talent Incubator School"/>
  // <meta property="og:description" content="Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers"/>
  // <meta property="og:site_name" content="Talent Incubator School"/>
  // <meta property="og:url" content="https://talentincubator.eu/"/>
  // <meta property="og:image" content="http://talentincubator.eu/images/logo.png"/>

  // <!-- Twitter Card Meta Tags -->
  // <meta name="twitter:card" content="Talent Incubator School of coding"/>
  // <meta name="twitter:title" content="Talent Incubator School"/>
  // <meta name="twitter:description" content="Κέρδισε πραγματική γνώση, σε ταχύρυθμα απογευματινά μαθήματα, γράφοντας κώδικα μαζί με developers"/>
  // <meta name="twitter:image" content="http://talentincubator.eu/images/logo.png"/>
  // <meta name="twitter:site" content=""/>
  // <meta name="twitter:creator" content="@ssavvidis"/>