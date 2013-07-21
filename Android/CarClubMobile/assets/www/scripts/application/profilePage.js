	$("#idCreateProfilePage").live('pageinit',function(){
		
		$('#idCreatProfileNext').live('touchstart',function(){

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
				localStorage.companyName = $('#idCName').val();
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
	

	$("#idCreateProfilePage").live('pagebeforeshow',function(){
		
		var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
			telephoneNumber.get(function(result) {
			        
			        if(result==null || result==""){
			        	console.log("result = Blank Response");
			        }
			        else{
			        	console.log("result = " + result);
			        	//Authentication
			        	result=919971793539;
			        	localStorage.mobileNo = result;
			        	
						var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Authentication";
				        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Authentication xmlns="http://www.drivecarclub.com/"> <mobile>'+result+'</mobile><company_code>' + '514' + '</company_code>   </Authentication> </soap:Body></soap:Envelope>';
				                       console.log(soapRequest)
						
				        $.ajax({
				            type: "POST",
				            url: wsUrl,
				            contentType: "text/xml",
				            dataType: "xml",
				            data: soapRequest,
				            success: function(data, status, req, xml, xmlHttpRequest, responseXML) { 
					            	console.log("************success:"+$(req.responseText).find('NewDataSet').find('Authentication').text());
					            	localStorage.authenticated = $(req.responseText).find('NewDataSet').find('Authentication').text();
					            	
					            	successTrail();					            	
				            	},
				            error: processError
				        });
			        }
			    }, function() {
			        console.log("error");
		});
		
		
		if(localStorage.mobileNo)
		{
			$("#idMobile").val(""+localStorage.mobileNo);
			$("#idMobile").attr("disabled", "disabled");		
		}

		if(localStorage.passangerName)
		{
			$("#idName").val(""+localStorage.passangerName);
		}
		
		//if(localStorage.companyName)
		{
			localStorage.companyCode = 514;
			//$("#idCName").val(""+localStorage.companyName);
			$("#idCName").val(""+localStorage.companyCode);
			$("#idCName").attr("disabled", "disabled");		
		}
		
		if(localStorage.passangerEmail)
		{
			$("#idEmail").val(""+localStorage.passangerEmail);
		}
							
	});

	
	function successTrail()
	{
		console.log("************successTrail::"+localStorage.authenticated);
		if(localStorage.authenticated=="TRUE")
		{
			$("#idMobile").val(""+localStorage.mobileNo);
			$("#idMobile").attr("disabled", "disabled");
		}
	}
	
	function processSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	alert("*********************"+req.responseText);

        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('Authentication')
            .each(function(i){
				
            console.log("*************************"+$(this).text());            
            });

        });
        
    }

    function processError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    } 
		
    
    function onCreateProfileSuccess()
	{
		console.log("Create Profile Query Success!");
	}

	function onCreateProfileError()
	{
		console.log("Create Profile Query Failed!");
	}
	
    // Populate the database 
    function createpProfile(tx)
    {
         tx.executeSql('DROP TABLE IF EXISTS PROFILE');
         tx.executeSql('CREATE TABLE IF NOT EXISTS PROFILE (id INTEGER PRIMARY KEY , mobile, cName, name, eMail)');
         tx.executeSql("INSERT INTO PROFILE ( mobile, cName, name, eMail) VALUES (?,?,?,?)", ['9273744039', 'Magneto', 'Sachin', 'sachin.mohite@gmail.com']);
    }//function createTable(tx)	
    
