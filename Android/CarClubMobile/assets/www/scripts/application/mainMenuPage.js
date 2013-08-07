	$("#idMainMenuPage").live('pageinit',function(){
		$.mobile.loading('hide');
		$(".ui-loader").hide();
		
		$('#idMakeReserv').live('click',function(){
			initUserProfile();	
		});
	});
	
	$("#idMainMenuPage").live('pagebeforeshow',function(){
		$.mobile.loading('hide');
	});


	$("#idMainMenuPage").live('pageremove',function(){
		$.mobile.loading('show');
		$(".ui-loader").show();
	});
	