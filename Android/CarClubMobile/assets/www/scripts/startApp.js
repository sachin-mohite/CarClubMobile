	var db = null;
	$(document).ready(function()
	{	
		db = window.openDatabase("TestDB", "1.0", "Test DB", 1000000);

		//db.transaction(populateDB, errorCB, null);
		//db.transaction(queryDB, errorCB, null);


	        
	        $.mobile.changePage("pages/profilePage.html", { transition: "slide" });
	});//$(document).ready(function()