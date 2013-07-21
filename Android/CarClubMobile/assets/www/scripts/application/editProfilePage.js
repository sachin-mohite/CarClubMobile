	$("#idEditProfilePage").live('pageinit',function(){
		
		$('#idEditProfileUpdate').live('touchstart',function(){

			if($('#idMobile').val() !="")
			{		
				localStorage.mobileNo = $('#idMobile').val();			
			}
			else
			{
				alert("Please enter Mobile Number.");
				return;
			}
						
			if($('#idName').val() !="")
			{
				localStorage.passangerName = $('#idName').val();			
			}
			else
			{
				alert("Please enter Your Name.");
				return;
			}			
			
			if($('#idCName').val()!="")
			{
				localStorage.companyCode = $('#idCName').val();
			}
			else
			{
				alert("Please enter Company Name.");
				return;
			}

		
			if($('#idEmail').val() !="")
			{		
				localStorage.passangerEmail = $('#idEmail').val();
			}
			else
			{
				alert("Please enter Email Id.");
				return;
			}
			
			//db.transaction(createTable, onCreateProfileError, onCreateProfileSuccess);	
			
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});	
		
		 $("#idWebServices").live('touchstart',function(){
		 
		 	//Bookings_History
            //var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Bookings_History";
            //var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Bookings_History xmlns="http://www.drivecarclub.com/"> <mobile>' + '919971793539' + '</mobile>  <company_code>' + '514' + '</company_code>   </Bookings_History> </soap:Body></soap:Envelope>';
                           console.log(soapRequest)

        });
		
	});
	
	$("#idEditProfilePage").live('pagebeforeshow',function(){

		if(localStorage.mobileNo)
		{
			$("#idMobile").val(""+localStorage.mobileNo);
			//$("#idMobile").attr("disabled", "disabled");		
		}

		if(localStorage.passangerName)
		{
			$("#idName").val(""+localStorage.passangerName);
			//$("#idName").attr("disabled", "disabled");	
		}
		
		if(localStorage.companyCode)
		{
			$("#idCName").val(""+localStorage.companyCode);
			//$("#idCName").attr("disabled", "disabled");		
		}
		
		/*if(localStorage.companyName)
		{
			$("#idCName").val(""+localStorage.companyName);
			//$("#idCName").attr("disabled", "disabled");		
		}*/	
			
		if(localStorage.passangerEmail)
		{
			$("#idEmail").val(""+localStorage.passangerEmail);
			//$("#idEmail").attr("disabled", "disabled");			
		}
		
	});