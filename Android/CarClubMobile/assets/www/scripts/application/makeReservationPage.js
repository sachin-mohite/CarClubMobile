	$("#idMakeReservationPage").live('pageremove',function(){
		$.mobile.loading('show');
		$(".ui-loader").show();
	});
	
	$("#idMakeReservationPage").live('pageinit',function(){
				
		//initUserProfile();
		
		var today;
	        
		if(sessionStorage.ReportingDate==undefined || sessionStorage.ReportingDate=="")
		{
			today = new Date();
		    var dd = today.getDate();
		    var mm = today.getMonth()+1; //January is 0!	
		    var yyyy = today.getFullYear();
		    if(dd<10){
		    	dd='0'+dd;
		    } 
		    
		    if(mm<10){
		    	mm='0'+mm;
		    }
		    
		    today = dd+'/'+mm+'/'+yyyy;		
		    
		    sessionStorage.ReportingDate=today;
		     
		}
		
		console.log("***********************Date::"+today);

		$('#idDate').trigger('datebox', {'method':'set', 'value':today});
		
        //customDatePicker('idDate');
		$('#idDate').live('click', function() {
		    $('#idDate').datebox('open');
		});
		    
        customTimePicker('idPickupTime');
		/*$('#idPickupTime').live('click', function() {
		    $('#idPickupTime').datebox('open');
		});*/
		
		$('#idBook').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "none" });
		});	
		
		$('#idMakeReservationNext').live('click',function(){
			
			$("#idMakeReservationNext").unbind("click");
			
			//validations
			if($('#idDate').val()=="" || $('#idPickupTime').val()=="" || $('#idArea').val()=="")
			{
				alert("Please enter all the fields..");
				return true;
			}
			
			if(isValidateHhMm($('#idPickupTime').val())==false)
			{
				alert("Invalid time format. Please reenter the time and submit.");
				return true;
			}
			
			var myArray = ['00','15','30','45'],
			needle = $('#idPickupTime').val().split(':')[1],
			index = indexOf.call(myArray, needle); // 1	
			
			if( index==-1)
			{
				alert("Minutes can contain only 00/15/30/45.");
				return true;
			}
			
			
			/*if(isValidDate($('#idDate').val())==false)
			{
				alert("Invalid date format. Please reenter the date and submit.");
				return;
			}*/
			
			//var d1 = dstrToUTC($('#idDate').val(), $('#idPickupTime').val());
	 		//var d2 = Math.floor(new Date().getTime());
	 		var selDate = $('#idDate').val().split("/");
	 		var selTime = $('#idPickupTime').val().split(":");
	 		selDate = new Date(selDate[2], selDate[1]-1, selDate[0], selTime[0], selTime[1], 0);
	 		//selDate = selDate.getTime();
	 		
	 		var currDate = new Date();
	 		
	 		var nTotalDiff = selDate.getTime() - currDate.getTime();
	 		
	 		var hoursDiff = Math.floor(nTotalDiff/1000/60/60);	 		
	 		
	 		//console.log("d1:"+d1+";d2:"+d2);
	 		console.log("selDate:"+selDate+";currDate:"+currDate+";hoursDiff:"+hoursDiff);
	 		
	 		if(hoursDiff<4)
	 		{
	 			alert("Lead to make reservation is 4 hours, Please call 011-44171717");
	 			return true;
	 		}
						
			//Dummy
			sessionStorage.CCType = "Amex";
			
			//Actual
			sessionStorage.CityCode = $('#idCityselect').val();
			sessionStorage.CityName = $("select[id=idCityselect] option:selected").text();
			console.log("****************City Name::"+sessionStorage.CityName);
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
	            error: carCategoryCodeError
	        });	
	        
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=DuplicateCheck";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <DuplicateCheck xmlns="http://www.drivecarclub.com/"><companycode>' + sessionStorage.CompanyCode + '</companycode> <guestcode>' + sessionStorage.GuestCode + '</guestcode><reportingdate>' + sessionStorage.ReportingDate + '</reportingdate></DuplicateCheck> </soap:Body></soap:Envelope>';
	                       console.log(soapRequest)
			
	        $.ajax({
	            type: "POST",
	            url: wsUrl,
	            contentType: "text/xml",
	            dataType: "xml",
	            data: soapRequest,
	            success: function (data, status, req, xml, xmlHttpRequest, responseXML)
	            {
	            	//sessionStorage.CategoryCode = $(req.responseText).find('NewDataSet').find('Car_Category_Code').text();
	            	if($(req.responseText).find('NewDataSet').find('BookingStatus').text()=="Booking Dose Not Exists")
	            	{
	            		$.mobile.changePage("selectPackage.html", { transition: "none" });
	            	}
	            	else
	            	{
	            		alert("This Booking already exists. Please confirm Date/Time..");
	            		return true;
	            	}
	            }
	            ,
	            error: duplicateBookingCheckError
	        });	
	        
			
		});	
				
	     $('#idCityselect').bind('change', function(event, ui) {
			//alert("Changed Values:"+$('#idCityselect').val());			
			
			//Car type
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=CarType";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <CarType xmlns="http://www.drivecarclub.com/"> <Company_Code>' + sessionStorage.CompanyCode + '</Company_Code> <City_Code>'+$('#idCityselect').val()+'</City_Code>  </CarType> </soap:Body></soap:Envelope>';
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
		
		if(sessionStorage.Address!="")
		{
			 $('#idArea').val(sessionStorage.Address);		
		}
		else
		{
			$('#idArea').val("");		
		}
		
		if(sessionStorage.ReportingDate!="")
		{
			$('#idDate').trigger('datebox', {'method':'set', 'value':sessionStorage.ReportingDate});
		}
		
		if(sessionStorage.PickupHrs!=undefined && sessionStorage.PickupHrs !="" && sessionStorage.PickupMin!="")
		{
			$('#idPickupTime').val(sessionStorage.PickupHrs+':'+sessionStorage.PickupMin);
		}

		
		//City
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=City";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <City xmlns="http://www.drivecarclub.com/"> <Company_Code>' + sessionStorage.CompanyCode + '</Company_Code>   </City> </soap:Body></soap:Envelope>';
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
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <CarType xmlns="http://www.drivecarclub.com/"> <Company_Code>' + sessionStorage.CompanyCode + '</Company_Code> <City_Code>'+$('#idCityselect').val()+'</City_Code>  </CarType> </soap:Body></soap:Envelope>';
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
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Usage xmlns="http://www.drivecarclub.com/"> <Company_Code>' + sessionStorage.CompanyCode + '</Company_Code> </Usage > </soap:Body></soap:Envelope>';
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
        
        if(sessionStorage.CityCode!="")
        {
			// Grab a select field
			var el = $('#idCityselect');
			
			// Select the relevant option, de-select any others
			el.val(sessionStorage.CityCode).attr('selected', true).siblings('option').removeAttr('selected');     	
        }
        else
        {
	        sessionStorage.CityCode = arrCityCode[0];
	        sessionStorage.CityName = arrCity[0];        
        }
        
        $("#idCityselect").selectmenu('refresh');
    }

    function cityError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/

		alert("Unable to fetch city. Please confirm if Internet connection is active..");
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
        
        if(sessionStorage.CarTypeCode!="")
        {
			// Grab a select field
			var el = $('#idCarType');
			
			// Select the relevant option, de-select any others
			el.val(sessionStorage.CarTypeCode).attr('selected', true).siblings('option').removeAttr('selected');     	
        }
        else
        {
        	sessionStorage.CarTypeCode = arrCityCode[0];
        }
        
        $("#idCarType").selectmenu('refresh');
 
    }

    function carTypeError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
		alert("Unable to fetch Car Types. Please confirm if Internet connection is active..");
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
        
        if(sessionStorage.ServiceTypeID!="")
        {
			// Grab a select field
			var el = $('#idUsage');
			
			// Select the relevant option, de-select any others
			el.val(sessionStorage.ServiceTypeID).attr('selected', true).siblings('option').removeAttr('selected');     	
        }
        else
        {
 	        sessionStorage.ServiceTypeID = arrCityCode[0]; 
 	        sessionStorage.ServiceType = arrCity[0];       
        }        
        $("#idUsage").selectmenu('refresh');
        
        $.mobile.loading('hide');
    }

    function usageError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
		alert("Unable to fetch Usages. Please confirm if Internet connection is active..");
        $.mobile.loading('hide');
    }
    
    
    function carCategoryCodeError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
		alert("Unable to fetch Car Category Codes. Please confirm if Internet connection is active..");
        $.mobile.loading('hide');
    }  
    
	function duplicateBookingCheckError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
		alert("Unable to check Duplicate Booking. Please confirm if Internet connection is active..");
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

