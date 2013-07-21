$("#idCancelBookingPage").live('pageinit',function(){
	console.log("***************In idCancelBookingPage: pageinit");	
	
	$('.cancelBookClass').live('touchstart',function(){
		
		console.log("*******************create profile::"+$(this).attr("BookingNum"));	
		
		sessionStorage.cancelBookingNum = $(this).attr("BookingNum");
		
		navigator.notification.confirm(
				'Do you really want to cancel Booking '+sessionStorage.cancelBookingNum+''?',  // message
				onCancelBookConfirm,              // callback to invoke with index of button pressed
				'Cancel Booking',            // title
				'Yes, No'          // buttonLabels
			);	
		
	});

});

$("#idCancelBookingPage").live('pagebeforeshow',function(){

	console.log("***************In idCancelBookingPage:pagebeforeshow");
    
	//Future Bookings
	var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Bookings_History";
    var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Bookings_History xmlns="http://www.drivecarclub.com/"> <mobile>' + localStorage.mobileNo + '</mobile> <company_code>'+localStorage.companyCode+'</company_code> </Bookings_History> </soap:Body></soap:Envelope>';
                   console.log(soapRequest)
	
    $.ajax({
        type: "POST",
        url: wsUrl,
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: cancelBookingSuccess,
        error: cancelBookingError
    });
    
});

function cancelBookingSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	//alert("*********************"+req.responseText);
	console.log("*********************"+req.responseText);
	
		var options="";
        var arrActualBkNum=[];
        var arrReportingDate=[];
        var arrReportingTime=[];
        var arrReportingAdd=[];
        ///var arrExtraHRRate=[];        
        
        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('Actual_Bk_Num')
            .each(function(i){
            	arrActualBkNum.push($(this).text());			
            	console.log("*************************"+arrActualBkNum[i]);            
            });

            $(this).find('ReportingDate')
            .each(function(i){
            	arrReportingDate.push($(this).text());			
            	console.log("*************************"+arrReportingDate[i]);            
            });
            
           $(this).find('ReportingTime')
            .each(function(i){
            	arrReportingTime.push($(this).text());			
            	console.log("*************************"+arrReportingTime[i]);            
            });
            
			$(this).find('ReportingAddress')
            .each(function(i){
            	arrReportingAdd.push($(this).text());			
            	console.log("*************************"+arrReportingAdd[i]);            
            });

        });
   
        for(i=0;i<arrReportingAdd.length;i++)
        {			
			//options = options + '<div data-role="fieldcontain" data-position="inline">	<label for="email" style="color:#045BA8;">Booking Number:' +arrActualBkNum[i]+	'</label><br>Reporting Date:'+arrReportingDate[i]+'<br>Reporting Time:'+arrReportingTime[i]+'<br>	Reporting Address:'+arrReportingAdd[i]+'<br><a data-role="button" href="#" id="idBookNowButton'+i+'" Tariff_Code="'+arrTarrifCode[i]+'" Package_Name="'+arrTarrifName[i]+'" Rate="'+arrRate[i]+'" Extra_Km_Rate="'+arrExtraKMRate[i]+'" Extra_Hr_Rate="'+arrExtraHRRate[i]+'" class="bookNowClass" data-transition="none">Book Now</a></div>';
        	options = options + '<div data-role="fieldcontain" data-position="inline">	<label for="email" style="color:#045BA8;">Booking Number:' +arrActualBkNum[i]+	'</label><br>Reporting Date:'+arrReportingDate[i]+'<br>Reporting Time:'+arrReportingTime[i]+'<br>	Reporting Address:'+arrReportingAdd[i]+'<br> <a data-role="button" href="#" id="idBookNowButton'+i+'" BookingNum="'+arrActualBkNum[i]+'" class="cancelBookClass">CANCEL BOOKING</a></div>';
		}  
		console.log("Options:"+options);
	    $('#idCancelBookingContainer').append(options);
	    $('#idCancelBookingContainer').trigger("create");
}

function cancelBookingError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}   

function onCancelBookConfirm(buttonIndex)
{
   		
    if(buttonIndex==1)
    {
    	console.log("*************buttonIndex==1");
    	
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Cancel_Booking";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Cancel_Booking xmlns="http://www.drivecarclub.com/"> <bookingid>'+sessionStorage.cancelBookingNum+'</bookingid><roc>' + 'Cancelation Reason' + '</roc>   </Cancel_Booking> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
	    $.ajax({
	        type: "POST",
	        url: wsUrl,
	        contentType: "text/xml",
	        dataType: "xml",
	        data: soapRequest,
	        success: cancelConfirmSuccess,
	        error: cancelConfirmError
	    });
	    
	    $.mobile.changePage("mainMenuPage.html", { transition: "none" });	    

    }//if(buttonIndex==1)
   	else
   	{
   		sessionStorage.cancelBookingNum = "";
   	}
    
}//function onConfirm(buttonIndex)

function cancelConfirmSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	
	console.log("*********************"+req.responseText);
	
    $(req.responseText )
    .find('Cancel_BookingResult')
    .each(function(){
       console.log("*************************"+$(this).text());
    });	
    
    alert("Your booking is canceled..");
    $.mobile.changePage("mainMenuPage.html", { transition: "none" });
	
}

function cancelConfirmError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}     