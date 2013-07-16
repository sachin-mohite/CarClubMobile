	$("#idCreateProfilePage").live('pageinit',function(){
		
		$('#idSave').live('touchstart',function(){
		
			localStorage.cNmae = $('#idCName').val();
			localStorage.name = $('#idName').val();
			localStorage.mobile = $('#idMobile').val();
			localStorage.email = $('#idEmail').val();
			
			//db.transaction(createTable, onCreateProfileError, onCreateProfileSuccess);	
			
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
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
						var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Authentication";
				        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Authentication xmlns="http://www.drivecarclub.com/"> <mobile>'+result+'</mobile><Company_Code>' + '514' + '</Company_Code>   </Authentication> </soap:Body></soap:Envelope>';
				                       console.log(soapRequest)
						
				        $.ajax({
				            type: "POST",
				            url: wsUrl,
				            contentType: "text/xml",
				            dataType: "xml",
				            data: soapRequest,
				            success: processSuccess,
				            error: processError
				        });
			        }
			    }, function() {
			        console.log("error");
		});
		
		
	});
	
	function processSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
        
        var options="";
        var arrCity=[];
        var arrCityCode=[];
        
        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('City_Name')
            .each(function(i){
            arrCity.push($(this).text());			
            console.log("*************************"+arrCity[i]+i);            
            });
            
           $(this).find('City_Code')
            .each(function(i){
            arrCityCode.push($(this).text());			
            console.log("*************************"+arrCityCode[i]+i);            
            });

        });
        
        for(i=0;i<arrCity.length;i++)
        options = options + '<option value="'+arrCityCode[i]+'">'+arrCity[i]+'</option>';
        console.log("Options:"+options);
        $('#idCityselect').append(options);
        $("#idCityselect").selectmenu('refresh');
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
    
