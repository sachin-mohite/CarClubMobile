	$("#idMakeReservationPage").live('pageinit',function(){
		$('#idBack').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});
		
		$('#idBook').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});	
				
		
		$('#idMakeReservationNext').live('touchstart',function(){
			//Dummy
			sessionStorage.CCType = "Amex";
			sessionStorage.GuestCode = 291;
			sessionStorage.GuestName = localStorage.passangerName;
			sessionStorage.CategoryCode = "1";
			sessionStorage.bookedby = 127;
			
			
			//Actual
			sessionStorage.CityCode = $('#idCityselect').val();
			sessionStorage.CarTypeCode = $('#idCarType').val();
			sessionStorage.ServiceType = $('#idUsage :selected').text();
			sessionStorage.ServiceTypeID = $('#idUsage').val();
			sessionStorage.Address = $('#idArea').val();
			sessionStorage.ReportingDate  = $('#idDate').val();
			
			var pickUpTime = $('#idPickupTime').val().split(':');
			sessionStorage.PickupHrs = pickUpTime[0];
			sessionStorage.PickupMin = pickUpTime[1];
			
			//From User profile
			sessionStorage.ContactNo = localStorage.mobileNo;
			sessionStorage.CompanyCode = localStorage.companyName;
			sessionStorage.EmailID = localStorage.passangerEmail;
		
			$.mobile.changePage("selectPackage.html", { transition: "none" });
		});	
				
	     $('#idCityselect').bind('change', function(event, ui) {
			//alert("Changed Values:"+$('#idCityselect').val());			
			
			//Car type
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=CarType";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <CarType xmlns="http://www.drivecarclub.com/"> <Company_Code>' + '514' + '</Company_Code> <City_Code>'+$('#idCityselect').val()+'</City_Code>  </CarType> </soap:Body></soap:Envelope>';
	                       console.log(soapRequest)
			
	        $.ajax({
	            type: "POST",
	            url: wsUrl,
	            contentType: "text/xml",
	            dataType: "xml",
	            data: soapRequest,
	            success: carTypeSuccess,
	            error: carTypeError
	        });
		});	
		
	    $('#idCarType').bind('change', function(event, ui) {
			//alert("Changed Values:"+$('#idCarType').val());
			
		});
		
		$('#idUsage').bind('change', function(event, ui) {
			//alert("Changed Values:"+$('#idUsage').val());
			
		});
		
	});

	$("#idMakeReservationPage").live('pagebeforeshow',function(){
		//City
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=City";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <City xmlns="http://www.drivecarclub.com/"> <Company_Code>' + '514' + '</Company_Code>   </City> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: citySuccess,
            error: cityError
        });
        
		//Car type
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=CarType";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <CarType xmlns="http://www.drivecarclub.com/"> <Company_Code>' + '514' + '</Company_Code> <City_Code>'+$('#idCityselect').val()+'</City_Code>  </CarType> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: carTypeSuccess,
            error: carTypeError
        });
        
		//Usage
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Usage";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Usage xmlns="http://www.drivecarclub.com/"> <Company_Code>' + '514' + '</Company_Code> </Usage > </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: usageSuccess,
            error: usageError
        });        
	});	
	
	function citySuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
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
        
        sessionStorage.CityCode = arrCityCode[0];
    }

    function cityError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    } 
	
	function carTypeSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
        
        var options="";
        var arrCity=[];
        var arrCityCode=[];
        
        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('car_type')
            .each(function(i){
            arrCity.push($(this).text());			
            console.log("*************************"+arrCity[i]+i);            
            });
            
           $(this).find('car_type_code')
            .each(function(i){
            arrCityCode.push($(this).text());			
            console.log("*************************"+arrCityCode[i]+i);            
            });

        });
        
        for(i=0;i<arrCity.length;i++)
        options = options + '<option value="'+arrCityCode[i]+'">'+arrCity[i]+'</option>';
        console.log("Options:"+options);
        $('#idCarType').append(options);
        $("#idCarType").selectmenu('refresh');
                
        sessionStorage.CarTypeCode = arrCityCode[0];
    }

    function carTypeError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    } 
    
    function usageSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
        
        var options="";
        var arrCity=[];
        var arrCityCode=[];
        
        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('Service_Type')
            .each(function(i){
            arrCity.push($(this).text());			
            console.log("*************************"+arrCity[i]+i);            
            });
            
           $(this).find('Service_Type_ID')
            .each(function(i){
            arrCityCode.push($(this).text());			
            console.log("*************************"+arrCityCode[i]+i);            
            });

        });
        
        for(i=0;i<arrCity.length;i++)
        options = options + '<option value="'+arrCityCode[i]+'">'+arrCity[i]+'</option>';
        console.log("Options:"+options);
        $('#idUsage').append(options);
        $("#idUsage").selectmenu('refresh');
        
        sessionStorage.ServiceType = arrCity[0];
    }

    function usageError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    }
