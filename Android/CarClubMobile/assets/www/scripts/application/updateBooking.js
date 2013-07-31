	$("#idUpdateBookingPage").live('pageinit',function(){
		
		$('#idDate').live('click', function() {
		    $('#idDate').datebox('open');
		});
		
		customTimePicker('idPickupTime');
		
		$('#idUpdateBookingNext').live('touchstart',function(){
			
			console.log("************************idUpdateBookingPage:idUpdateBookingNext");
			
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
			
			
			if(isValidDate($('#idDate').val())==false)
			{
				alert("Invalid date format. Please reenter the date and submit.");
				return;
			}			
			
			var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=updateBookings";
	        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <updateBookings xmlns="http://www.drivecarclub.com/"> <Actual_bk_num>' + sessionStorage.editBookingNum + '</Actual_bk_num>  <reportingdate>' + $("#idDate").val() + '</reportingdate>  <reportingtime>' + $("#idPickupTime").val() + '</reportingtime>  <reportingaddress>' + $("#idArea").val() + '</reportingaddress>   </updateBookings> </soap:Body></soap:Envelope>';
	                       console.log(soapRequest)
			
	        $.ajax({
	            type: "POST",
	            url: wsUrl,
	            contentType: "text/xml",
	            dataType: "xml",
	            data: soapRequest,
	            success: updateBookingSuccess,
	            error: updateBookingError
	        });
		
        });
		
	});	
	
	$("#idUpdateBookingPage").live('pagebeforeshow',function(){
		console.log("******************idUpdateBookingPage:pagebeforeshow");
		
		var options = "";
		
		options = '<label for="labelBooking" style="color:#045BA8;">Booking ID:'+sessionStorage.editBookingNum+'</label>';
		
		console.log("Options:"+options);
	    $('#labelBookingNum').append(options);
	    $('#labelBookingNum').trigger("create");
	    
	    
	    $('#idDate').trigger('datebox', {'method':'set', 'value':sessionStorage.ReportingDate});
	    //$('#idDate').val(sessionStorage.ReportingDate);
	    $('#idPickupTime').val(sessionStorage.ReportingTime);
	    $('#idArea').val(sessionStorage.Address);
	    $('#idUpdateBookingBody').trigger("create");
	
	});
	
	function updateBookingSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
    	console.log("*********************"+req.responseText);

	    $(req.responseText )
	    .find('updateBookingsResult')
	    .each(function(){
	       console.log("*************************"+$(this).text());
	       
	       if($(this).text()=="True")
	       {
				alert("Edit Booking done..");
	       }
	       else
	       {
				alert("We are not able to Update this booking..");
	       }
	       
	    });	

       $.mobile.changePage("mainMenuPage.html", { transition: "none" });        
    }

    function updateBookingError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    } 