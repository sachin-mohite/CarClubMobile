	$("#idMakeReservationPage").live('pageinit',function(){
	        
        customDatePicker('idDate');
        customTimePicker('idPickupTime');
		
		$('#idBack').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});
		
		$('#idBook').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});	
		
		$('#idMakeReservationNext').live('touchstart',function(){
			
			//validations
			if($('#idDate').val()=="" || $('#idPickupTime').val()=="" || $('#idArea').val()=="")
			{
				alert("Please enter all the fields..");
				return;
			}
			
			if(isValidateHhMm($('#idPickupTime').val())==false)
			{
				alert("Invalid time format. Please reenter the time and submit.");
				return;
			}
			
			var myArray = ['00','15','30','45'],
			needle = $('#idPickupTime').val().split(':')[1],
			index = indexOf.call(myArray, needle); // 1	
			
			if( index==-1)
			{
				alert("Minutes can contain only 00/15/30/45.");
				return;
			}
			
			
			/*if(isValidDate($('#idDate').val())==false)
			{
				alert("Invalid date format. Please reenter the date and submit.");
				return;
			}*/
						
			//Dummy
			sessionStorage.CCType = "Amex";
			
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
			sessionStorage.CompanyCode = localStorage.companyCode;
			sessionStorage.EmailID = localStorage.passangerEmail;
			sessionStorage.GuestCode = localStorage.GuestCode;
			sessionStorage.GuestName = localStorage.passangerName;	
			
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=CarCategory";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <CarCategory xmlns="http://www.drivecarclub.com/"><Car_TypeCode>' + sessionStorage.CarTypeCode + '</Car_TypeCode> </CarCategory> </soap:Body></soap:Envelope>';
	                       console.log(soapRequest)
			
	        $.ajax({
	            type: "POST",
	            url: wsUrl,
	            contentType: "text/xml",
	            dataType: "xml",
	            data: soapRequest,
	            success: function (data, status, req, xml, xmlHttpRequest, responseXML)
	            {
	            	sessionStorage.CategoryCode = $(req.responseText).find('NewDataSet').find('Car_Category_Code').text();
	            }
	            ,
	            error: authenticationError
	        });	
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
		
		$('#idArea').val("");
		
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
        $('#idCityselect').empty();
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
        $('#idCarType').empty();
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
        $('#idUsage').empty();
        $('#idUsage').append(options);
        $("#idUsage").selectmenu('refresh');
        
        sessionStorage.ServiceType = arrCity[0];
        
        $.mobile.loading('hide');
    }

    function usageError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
        $.mobile.loading('hide');
    }
    
    
	/*function checkdate(input){
	    var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
	    var returnval=false;
	    if (!validformat.test(input.value))
	        alert("Invalid Date Format. Please correct and submit again.")
	    else{ //Detailed check for valid date ranges
	        var monthfield=input.value.split("/")[0]
	        var dayfield=input.value.split("/")[1]
	        var yearfield=input.value.split("/")[2]
	        var dayobj = new Date(yearfield, monthfield-1, dayfield)
	        if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
	            alert("Invalid Day, Month, or Year range detected. Please correct and submit again.")
	        else
	            returnval=true
	    }
	    if (returnval==false) input.select()
	        return returnval
	} */   
	
	function changeDateFormat(thiss)
	{
		console.log("****************"+$(thiss).val());
		
		if(checkInput($(thiss).attr('type')))
		{
			console.log("*********************Supported:"+$(thiss).attr('type'));
		}
		else
		{
			console.log("*********************Not Supported:"+$(thiss).attr('type'));
		}
	}

