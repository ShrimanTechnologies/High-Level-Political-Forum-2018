// Dom7
var $$ = Dom7;

// Framework7 App main instance
var appF7  = new Framework7({
  root: '#app', // App root element
  id: 'com.shrimaninc.hlpf', // App bundle ID
  name: 'High-Level Political Forum', // App name
  crossDomain: true,
  origin: "*",  
  theme: 'auto', // Automatic theme detection
  // App root data
  template7Pages: true, //enable Template7 rendering for pages
  
  
   notification: {
		title: 'HLPF 2018',
		closeTimeout: 2000,
   },
    view: {
        stackPages: true, //empilhar paginas para mostrar no mesmo arquivo HTML    
        pushState: true, //voltar com o botão físico
        animateWithJS: true,
    },

  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});


// Init/Create main view
var mainView = appF7.views.create('.view-main', {
  url: '/'
});


var mySwiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 4000,
  },
});
function alertDismissed() {
    // do something
}

appF7.on('pageInit',  function (page) {
//	localStorage.setItem('myEvents',"[]");

	document.addEventListener("backbutton", yourCallbackFunction, false);
	if (! localStorage.myEventCount) {	
		localStorage.myEventCount = 0;
	}
	if (! localStorage.myEvents) {	
		localStorage.setItem('myEvents',"[]");
	}
	$$('.addToMyEvent').on('click', function () {
		var addEventNotification = appF7.notification.create({
			icon: '<i class="icon demo-icon"><img src="./img/logo.png" width="18"/></i>',
			title: 'HLPF 2018',
			subtitle: ' Event <i><b>"' + $$(this).attr('title') + '"</b></i> added successfully.' ,
			closeButton: true,
		});
		
		//var addEventNotification = navigator.notification.alert(' Event "' + $$(this).attr('title') + '" added successfully.' ,     alertDismissed,  'Event Added','Ok');
		addEvent($$(this).attr('event') );
		
		//To Show/Display Icon in Events Selection Page
		$('#'+$$(this).attr('event')+ ' .addToMyEvent').hide( );
		$('#'+$$(this).attr('event')+ ' .removeMyEvent').show( "fast", function() { });

		//To Show/Display in Event Page
		$('#addToMyEvent').hide(  );
		$('#removeMyEvent').show( "fast", function() { });

		addEventNotification.open();		
		if(localStorage.myEventCount!=0){
			$("#myEventCountsDiv").html('My Events (' + localStorage.myEventCount + ')');
		}else{
			$("#myEventCountsDiv").html('My Events ');
		}
	});	
	$$('.removeMyEvent').on('click', function () {
		//var removeEventNotification = navigator.notification.alert(' Event "' + $$(this).attr('title') + '" successfully removed from your events list.' ,  alertDismissed,'Event Removed','Ok');
		var removeEventNotification = appF7.notification.create({
			icon: '<i class="icon demo-icon"><img src="./img/logo.png" width="18"/></i>',
			title: 'HLPF 2018',
			subtitle: ' Event <i><b>"' + $$(this).attr('title') + '"</b></i> successfully removed from your events list.' ,
			closeButton: true,
		});
		removeEvent(  $$(this).attr('event') );
		
		//To Show/Display Icon in Events Selection Page
		$('#'+$$(this).attr('event')+ ' .removeMyEvent').hide( );
		$('#'+$$(this).attr('event')+ ' .addToMyEvent').show( "fast", function() { });
		
		//To Show/Display in Event Page
		$('#removeMyEvent').hide(  );
		$('#addToMyEvent').show( "fast", function() { });
		removeEventNotification.open();

		if(localStorage.myEventCount!=0){
			$("#myEventCountsDiv").html('My Events (' + localStorage.myEventCount + ')');
		}else{
			$("#myEventCountsDiv").html('My Events ');
		}		
	});
	$$('.deleteMyEvent').on('click', function () {
		//var removeEventNotification = navigator.notification.alert(' Event "' + $$(this).attr('title') + '" successfully removed from your events list.' ,  alertDismissed,'Event Removed','Ok');
		var removeEventNotification = appF7.notification.create({
			icon: '<i class="icon demo-icon"><img src="./img/logo.png" width="18"/></i>',
			title: 'HLPF 2018',
			subtitle: ' Event <i><b>"' + $$(this).attr('title') + '"</b></i> successfully removed from your events list.' ,
			closeButton: true,
		});
		removeEvent(  $$(this).attr('event') );
		removeEventNotification.open();

		$('#'+$$(this).attr('event')).hide( "slow", function() { });
		$("#myEventCountsDiv").html('My Events ('+localStorage.myEventCount+')');
		
	});
	
	if(localStorage.myEventCount!=0){
		$("#myEventCountsDiv").html('My Events (' + localStorage.myEventCount + ')');
	}else{
		$("#myEventCountsDiv").html('My Events ');
	}
	
	$$('.shareEvent').on('click', function () {
		//alert( 'Event Id -' + $$(this).attr('event') + ' \n Event Descr -'  +  $$(this).attr('title') + ' is going to be shared with others..' );
		var options = {
			message: "High-Level Political Forum 2018 - Event Invitation " + $$(this).attr('data'), 
			subject: 'High-Level Political Forum 2018 - Event Invitation ', // fi. for email
			//files: ['', ''], // an array of filenames either locally or remotely
			url: 'https://sustainabledevelopment.un.org/hlpf/2018',
			chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
			//appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
		};

		var onSuccess = function(result) {
			console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
			console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
		};

		var onError = function(msg) {
			console.log("Sharing failed with message: " + msg);
		};		
		
		window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

	});	


	$$('#blogURL').on('click', function () {
	});
	
	if (page.name == 'search'){

	// create searchbar
	var searchbar = appF7.searchbar.create({
		el: '.searchbar',
		searchContainer: '.list',
		searchIn: '.item-title, .item-subtitle',
		searchList: '.list-block-search',
		on: {
			enable: function () {
				console.log('Searchbar enabled');
			},
			search(sb, query, previousQuery) {
				console.log(query, previousQuery);
			}
		}
	});	
	}
	
	if (page.name == 'news'){
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}
	
	

});

function onMyFrameLoad() {
	//$('#hlpfBlogFrameContents').load('https://sustainabledevelopment.un.org/hlpf/2018/blog');
	//alert('testing loading contents');
	
}

function yourCallbackFunction() {
   		var cpage = mainView.activePage;
   		var cpagename = 'HomePageURLCheckString' ;
   		if (($$('#myhtml').hasClass('with-panel-left-cover'))) { // #leftpanel and #rightpanel are id of both panels.
			appF7.panel.close(true);
       		return false;
   		} else if ($$('.modal-in').length > 0) {
			appF7.popup.close(true);
       		return false;
   		} else if (cpagename.includes('index.html')) {				
			appF7.dialog.confirm('Are you sure you want to exit?','HLPF 2018 - Alert!', function () {
				navigator.appF7.exitApp();
			});
	    } else if ( mainView.history.length == 1) {				
			//app.dialog.alert( mainView.history.length );
	    }else {
	        mainView.router.back();
   		}	
}

function yourCallbackFunction1(){
 // alert(window.location);
 }
function addEvent(eventId)
{
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('myEvents'));
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(eventId);
    // Alert the array value
	b = jQuery.unique(a);
	localStorage.myEventCount = a.length;
    //alert(a + ' '  + localStorage.myEventCount);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('myEvents', JSON.stringify(b));

}
function removeEvent(eventId)
{
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('myEvents'));
    // Push the new data (whether it be an object or anything else) onto the array
    // a.push(eventId);
	a = a.filter(item => item !== eventId)
    // Alert the array value
	b = jQuery.unique(a);
	localStorage.myEventCount = a.length;
    //alert(a + ' '  + localStorage.myEventCount);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('myEvents', JSON.stringify(b));
	
}

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
console.log('test');	 
  // Close login screen
  appF7.loginScreen.close('#my-login-screen');

  // Alert username and password
  appF7.dialog.alert('Username: ' + username + '<br> asd asdf asd fasdf Password: ' + password);
});

// Create full-layout notification
var notificationFull = appF7.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'This is a subtitle',
  text: 'This is a simple notification message',
  closeTimeout: 3000,
});


/*
document.addEventListener('pageInit', function (e) {
	app.dialog.alert('test popup here '   );
	
    page = e.detail.page;
    if (page.name === 'index') {
        $$.ajax({
            ...
        })
    }
	
});
*/
//app.onPageInit('*', function(){
//if (page.name === 'index') onHomeInit();
//});

/*

app.on('pageInit', '.page[data-page="officialevents"]', function (page) {
	app.dialog.alert('test popup here ' + page.name );
	     if (page.name === 'PAGENAME') {

    
		 }
	//$$('form-ajax-submit').on('submitted', function (e) {
	//$$('form.ajax-submit').on('form:success', function (e) {
	//$$('form.form-ajax-submit').on('formajax:success', function (e) {		
});
 */
/*
app.on('formAjaxSuccess', function (formEl, data, xhr) {
	// mainView.router.loadContent(e.detail.data);
	
	mainView.router.load({
        url: './pages/hrmstables.html',
		context: {
				peoplesoft: xhr.response
			}
	});
			console.log('update');
		
		
		Template7.data['url: ./pages/hrmstables.html'] = { peoplesoft: xhr.response }
*/	

/*
    setTimeout(function () {
		console.log('update');
		mainView.router.load({
			reload: true,
			reloadPrevious: false, /* You can also set this to false * /
            content: './pages/hrmstables.html',
			context: {
				peoplesoft: xhr.response
			}
		});
		
	//$$("tabledata").html();
	
		console.log(xhr.response);
	}, 3000);
  //});
	
	//app.dialog.alert(xhr.responseText);
});
*/



/* 
app.onPageInit('PAGENAME', function (page) {
  app.dialog.alert('test popup here '  );
	//$$.get('https://sustainabledevelopment.un.org/index.php?page=view&type=20000&nr=2192&menu=2993', {}, function (data) {        
//        $$('#PAGEPlaceHolder').html(data);          
    //});     
});

*/