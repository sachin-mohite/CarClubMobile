$("#idEditReservationPage").live('pageinit',function(){
	console.log("***************In idEditReservationPage: pageinit");	
	
	$('.cancelBookClass').live('touchstart',function(){
		
		console.log("*******************create profile::"+$(this).attr("BookingNum"));	
		
		sessionStorage.editBookingNum = $(this).attr("BookingNum");
		
		$.mobile.changePage("updateBooking.html", { transition: "none" });
				
	});

});

$("#idEditReservationPage").live('pagebeforeshow',function(){

	console.log("***************In idEditReservationPage:pagebeforeshow");
    
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
        success: editBookingSuccess,
        error: editBookingError
    });
    
});

function editBookingSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
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
        	options = options + '<div data-role="fieldcontain" data-position="inline">	<label for="email" style="color:#045BA8;">Booking Number:' +arrActualBkNum[i]+	'</label><br>Reporting Date:'+arrReportingDate[i]+'<br>Reporting Time:'+arrReportingTime[i]+'<br>	Reporting Address:'+arrReportingAdd[i]+'<br> <a data-role="button" href="#" id="idBookNowButton'+i+'" BookingNum="'+arrActualBkNum[i]+'" class="cancelBookClass">EDIT BOOKING</a></div>';
		}  
		console.log("Options:"+options);
	    $('#idEditBookingContainer').append(options);
	    $('#idEditBookingContainer').trigger("create");
}

function editBookingError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}