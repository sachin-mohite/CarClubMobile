	var db = null;
	$(document).ready(function()
	{	
		db = window.openDatabase("TestDB", "1.0", "Test DB", 1000000);

		//db.transaction(populateDB, errorCB, null);
		//db.transaction(queryDB, errorCB, null);
		
		$.mobile.defaultPageTransition   = 'none';
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.buttonMarkup.hoverDelay = 0;
		
		var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
			telephoneNumber.get(function(result) {
			        console.log("result = " + result);
			    }, function() {
			        console.log("error");
		});
		
		$.mobile.changePage('#idCreateProfilePage');
		
	});//$(document).ready(function()