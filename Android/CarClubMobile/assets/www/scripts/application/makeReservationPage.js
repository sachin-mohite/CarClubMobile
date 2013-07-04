	$("#idMakeReservationPage").live('pageinit',function(){
		$('#idBack').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
		});
		
		$('#idBook').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
		});		
		
	});
