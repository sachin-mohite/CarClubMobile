	$("#idCreateProfilePage").live('pageinit',function(){
		
		$('#idCreatProfileNext').live('touchstart',function(){

			if($('#idMobile').val() !="")
			{		
				localStorage.mobileNo = $('#idMobile').val();			
			}
			else
			{
				alert("Please enter Mobile Number.");
				$('#idMobile').select()
				return true;
			}
						
			if($('#idName').val() !="")
			{
				localStorage.passangerName = $('#idName').val();			
			}
			else
			{
				alert("Please enter Your Name.");
				$('#idName').select();
				return true;
			}			
			
			if($('#idCName').val()!="")
			{
				localStorage.companyName = $('#idCName').val();
			}
			else
			{
				alert("Please enter valid Mobile number. We are not able to verify your identity.");
				$('#idCName').select();
				return true;
			}

		
			if($('#idEmail').val() !="")
			{		
				localStorage.passangerEmail = $('#idEmail').val();
			}
			else
			{
				alert("Please enter Email Id.");
				$('#idEmail').select();
				return true;
			}
			
			setTimeout(function() {
		        // Pass functionParam to function - $(this) will 
		        // be out of scope when the function is called
		        $.mobile.changePage("mainMenuPage.html", { transition: "none" });
		    }, 300);
		    
			
		});	

	});
	

	$("#idCreateProfilePage").live('pagebeforeshow',function(){
	
		console.log("*************idCreateProfilePage==pagebeforeshow");
		
		var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
			telephoneNumber.get(function(result) {
			        
			        if(result==null || result==""){
			        	console.log("result = Blank Response");
			        	//alert("Application is unable to fetch mobile number from the handset. Please enter it manually.");			        	
			        	$("#idMobile").select();
			        	return true;			        	
			        }
			        else{
			        	console.log("result = " + result);
			        	//Authentication
			        	localStorage.mobileNo = "91"+result;
			        	
			        	alert("We fetched "+localStorage.mobileNo+" as your mobile number. Sending it for the Authentication.");
			        	$("#idMobile").val(""+localStorage.mobileNo);
			        	
						var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Authentication";
				        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Authentication xmlns="http://www.drivecarclub.com/"> <mobile>'+localStorage.mobileNo+'</mobile><company_code>' + localStorage.companyCode + '</company_code>   </Authentication> </soap:Body></soap:Envelope>';
				                       console.log(soapRequest)
						
				        $.ajax({
				            type: "POST",
				            url: wsUrl,
				            contentType: "text/xml",
				            dataType: "xml",
				            data: soapRequest,
				            success: authenticationSuccess,
				            error: authenticationError
				        });
			        }
			    }, function() {
			        console.log("error");
		});
							
	});
	
	
	function onProfileConfirm(buttonIndex)
	{
		console.log("*************buttonIndex=="+buttonIndex);
	   		
	    if(buttonIndex==1)
	    {
	    	console.log("*************buttonIndex==1");
			navigator.app.exitApp();
	    }//if(buttonIndex==1)
	   	else
	   	{
	   		console.log("*************buttonIndex==0");
		    //$.mobile.changePage("profilePage.html", { transition: "none" });
		    //$('#idCreateProfilePage').trigger('create');
		    //window.location.reload(true);
		    //$.mobile.changePage("profilePage.html", { transition: "none" });
		    //refreshPage();
		    refreshPage1(idCreateProfilePage);
	   	}
	    
	}//function onConfirm(buttonIndex)    
    
	function mobileKeyUp(e)
	{
		var len = $('#idMobile').val().length;
		
		console.log("****************Length:"+len);
		
		localStorage.mobileNo = $('#idMobile').val();
		
		if(len==12 && WSInProgress==false)
		{
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Authentication";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Authentication xmlns="http://www.drivecarclub.com/"> <mobile>'+localStorage.mobileNo+'</mobile></Authentication> </soap:Body></soap:Envelope>';
	                       console.log(soapRequest)
			
	        $.ajax({
	            type: "POST",
	            url: wsUrl,
	            contentType: "text/xml",
	            dataType: "xml",
	            data: soapRequest,
	            success: authenticationSuccess,
	            error: authenticationError
	        });
	        
	        WSInProgress = true;

		}

	}
	
	function mobileKeyDown(e)
	{
	
		var e = event || window.event;  // get event object
    	var key = e.keyCode || e.which; // get key cross-browser
    
    	//If backspace use it
    	if(key==8)
    	{
    		return true;
    	}
    
		var len = $('#idMobile').val().length;
		console.log("****************Length:"+len);
		
		if(len==12)//ten digits already entered
		{
			alert("You cannot enter more than 12 digits as Mobile number");
	        if (e.preventDefault) e.preventDefault(); //normal browsers
	            e.returnValue = false; //IE 
			return true;			
		}
	}
	
	function authenticationSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
    	WSInProgress = false;
    	
    	console.log("************success:"+$(req.responseText).find('NewDataSet').find('Authentication').text());
    	localStorage.authenticated = $(req.responseText).find('NewDataSet').find('Authentication').text();
    	
    	if(localStorage.authenticated=="TRUE")
		{
			//Storing details in the local storage
	    	localStorage.mobileNo = $(req.responseText).find('NewDataSet').find('GuestMobile').text();
	    	localStorage.passangerName = $(req.responseText).find('NewDataSet').find('GuestName').text();
	    	localStorage.companyName = $(req.responseText).find('NewDataSet').find('Company_name').text();
	    	localStorage.companyCode = $(req.responseText).find('NewDataSet').find('CompanyCode').text();
	    	localStorage.passangerEmail = $(req.responseText).find('NewDataSet').find('GuestEmailID').text();
	    	localStorage.GuestCode = $(req.responseText).find('NewDataSet').find('GuestCode').text();
	    	
	    	//Assigning details to objects
			if(localStorage.mobileNo)
			{
				$("#idMobile").val(""+localStorage.mobileNo);
				$("#idMobile").attr("disabled", "disabled");		
			}
	
			if(localStorage.passangerName)
			{
				$("#idName").val(""+localStorage.passangerName);
			}
			
			if(localStorage.companyName)
			{
				$("#idCName").val(""+localStorage.companyName);
				$("#idCName").attr("disabled", "disabled");		
			}
			
			if(localStorage.passangerEmail)
			{
				$("#idEmail").val(""+localStorage.passangerEmail);
			}
			
			$('#idCreatProfileNext').removeAttr('disabled');    				
		}
		else
		{
			//alert("It is not a registered Mobile number. Please enter valid mobile number..");
			//$("#idMobile").select();
			//return true;
			navigator.notification.confirm(
							'Your number is not register. Go to website for registration.',  // message
							onInvalidNumConfirm,              // callback to invoke with index of button pressed
							'Unable to Proceed',            // title
							'Ok, Cancel'          // buttonLabels
						);
		}		

    }
    
    function onInvalidNumConfirm(buttonIndex)
	{
		console.log("*************buttonIndex=="+buttonIndex);
	   		
	    if(buttonIndex==1)
	    {
	    	console.log("*************buttonIndex==1");
	    	window.open('http://www.drivecarclub.com', '_blank', 'location=yes');	    	
			
	    }//if(buttonIndex==1)
	   	else
	   	{
	   		console.log("*************buttonIndex==0");	 
	   		$("#idMobile").select(); 		
	   	}
	    
	}//function onConfirm(buttonIndex)  
	

    function authenticationError(data, status, req) {
    
    	WSInProgress=false;
    	
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
        
        //alert("Unable to Proceed. Please confirm if internet connection is active..");
        
		navigator.notification.confirm(
					'Please reload after activating the internet or Close the application.',  // message
					onProfileConfirm,              // callback to invoke with index of button pressed
					'Unable to Proceed',            // title
					'Close, Reload'          // buttonLabels
				);
    }	