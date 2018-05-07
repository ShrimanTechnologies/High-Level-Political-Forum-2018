routes = [
  {
    path: '/',
    url: './index.html',
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
            componentUrl: './pages/myevents.html',
          },
          {
            context: {
              slideImages: slideImages,
			  slideTexts: slideTexts,
            },
          }
        );
    }
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  
  
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  
  {
    path: '/inviteevents/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/inviteevents.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  
  {
    path: '/myevents/',	
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
            componentUrl: './pages/myevents.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
            },
          }
        );
    }	
	
  },
  {
    path: '/officialevents/',	
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
			componentUrl: './pages/officialevents.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
            },
          }
        );
    }	
  },
  {
    path: '/specialevents/',
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
			componentUrl: './pages/specialevents.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
            },
          }
        );
    }	
  },
  {
    path: '/sideevents/',
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
			componentUrl: './pages/sideevents.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
            },
          }
        );
    }
  },  
  {
    path: '/event/:eventId/',
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
            componentUrl: './pages/event.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  myEventID: routeTo.params.eventId,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),			  
            },
          }
        );
    }
  },
  	
  {
    path: '/input/',
    componentUrl: './pages/input.html',
  },		
  {
    path: '/search/',
    componentUrl: './pages/search.html',
	options : {
		context: {
			hlpfevents: hlpfevents,
			myEventIDs: JSON.parse(localStorage.getItem('myEvents')),	
        },
    },
  },	
  {
    path: '/news/',
    componentUrl: './pages/news.html',
  },	
  {
    path: '/blog/',
    componentUrl: './pages/blog.html',
  },
  {
    path: '/panelists/',
    componentUrl: './pages/panelists.html',
	options : {
		context: {
			hlpfevents: hlpfevents,
			panelistEvents: panelistevents,
        },
    },
  },

  {
    path: '/panelist/:panelistId/',
	async: function (routeTo, routeFrom, resolve, reject) {
        resolve(
          {
            componentUrl: './pages/panelist.html',
          },
          {
            context: {
              hlpfevents: hlpfevents,
			  panelistId: routeTo.params.panelistId,
			  myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
			  panelistEvents: panelistevents.panelists.find(item => item.panelistId === routeTo.params.panelistId ) ,			  
            },
          }
        );
    }
  },
  
  {
    path: '/exhibitions/',
    componentUrl: './pages/exhibitions.html',
	options : {
		context: {
			exhibitions: exhibitions,
        },
    },
  },
  
  {
    path: '/participants/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/participants.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  {
    path: '/newscontent/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/newscontent.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  {
    path: '/news1/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/news.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
  
  
];


/*	

	/*
	
	
/*
	crossDomain : true,
    ContentType: 'application/x-www-form-urlencoded',

	headers: {
		'Authorization': 'sometokenvalue',
		'Access-Control-Allow-Origin': '*',
		'crossDomain': true,
		'origin': "*",
	},
	async: function (routeTo, routeFrom, resolve, reject) {
        app.request.get('https://sustainabledevelopment.un.org/hlpf/2018/blog',   function (data) {
			
        resolve(
          {
            componentUrl: './pages/blog.html',
          },
          {
            context: {
              hlpfevents: data,
            },
          }
        );
      });

    }
	* /
	
	
	
	
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/specialevents.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }  },
	

  
  {
    path: '/sideevents/',
    componentUrl: './pages/sideevents.html',
	options : {
		context: {
			hlpfevents: hlpfevents,
			myEventIDs: JSON.parse(localStorage.getItem('myEvents')),
        },
    },
  },
  * /
  {
    path: '/videos/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/videos.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  
  {
    path: '/photos/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/photos.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },
  
  
  {
    path: '/exhibitions/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/exhibitions.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
  },

    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/myevents.html',
          },
          // Custom template context
          {
            context: {
              //users: data,
			  hlpfevents: hlpfevents,
            },
          }
        );
      });
    }
	*/	/*

    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/officialevents.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
	  },  

	*/  
	
	
   /*
  {
    path: '/hrmstables/:RecName/',
  componentUrl: './pages/hrmstables.html'
	 
	componentUrl: './pages/hrmstables.html',
	on: {
        pageBeforeIn: function (event, page) {
          // do something before page gets into the view
		  
		  	  app.dialog.alert('Username: ' );

		  
        },
	 }
	
   url: './pages/hrmstables.html', 
 
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);	  
	  

      // User ID from request
      var recname = routeTo.params.RecName;
	  
	  app.dialog.alert('Username: ' + recname  );

      // Get external data and return template7 template
		app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=psrecdefn&cond1=RECNAME&val1='+recname, function (data) {
			
			
        // Hide Preloader
        //app.preloader.hide();
		
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/hrmstables.html',
          },
          // Custom template context
          {
            context: {
              peoplesoft: data,
            },
          }
        );
      });
    }
	
  },
  */
  /*
  
  {
    path: '/peoplebooks/',
    //url: './pages/peoplebooks.html',
	async: function (routeTo, routeFrom, resolve, reject) {
		// Requested route
      console.log(routeTo);
	  
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      //app.preloader.show();

      // User ID from request
      //var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got products data from request
        var products = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          peoplebooks: [
            {
              title: 'PeopleTools',
              url: 'http://framework7.io',
			  versions: [
				{
					title: 'PeopleTools 8.49',
					url: 'http://framework7.io',
				},
				{
					title: 'PeopleTools 8.56',
					url: 'http://framework7.io',
				},
			  ]
            },
          ]
        };
        // Hide Preloader
        //app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/peoplebooks.html',
          },
          {
            context: {
              products: products,
            }
          }
        );
      }, 100);
    },
	
  },
  
  
	
    async: function (routeTo, routeFrom, resolve, reject) {
      // Requested route
      console.log(routeTo);
	  
	  
      // Get external data and return template7 template
      app.request.json('http://webservices.shrimantech.com/peoplesoft/json.php?tbl=peoplesoft&limit=3', function (data) {
        resolve(
          // How and what to load: template
          {
            componentUrl: './pages/sideevents.html',
          },
          // Custom template context
          {
            context: {
              users: data,
            },
          }
        );
      });
    }
	*/