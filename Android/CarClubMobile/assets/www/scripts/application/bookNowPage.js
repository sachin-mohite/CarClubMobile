$("#idBookNowPage").live('pageinit',function(){
	
	$('#idBookNowdDone').live('touchstart',function(){
		console.log("********************idBookNowdDone");
		
		//validations
		if($('#idExpDate').val()=="" || $('#idCreditCardNo').val()=="")
		{
			alert("Please enter all the fields..");
			return;
		}
				
		if(isNaN($('#idCreditCardNo').val())){
			alert("Only numbers are allowed in  Credit Card feild");
			$('#idCreditCardNo').select();
			return;
		}
		
		if(isValidMmYyyy($('#idExpDate').val())==false)
		{
			alert("Invalid date format. Please reenter the date and submit.");
			$('#idExpDate').select();
			return;
		}
		
				
		var expDate = $('#idExpDate').val();
		
		var yf=expDate.split("/")[1];           
		var mf=expDate.split("/")[0];
		
		sessionStorage.CreditCardNo = $('#idCreditCardNo').val();
		sessionStorage.CreditCardExpiryMonth = mf;
		sessionStorage.CreditcarExpiryYear = yf;
		
		localStorage.CreditCardNo = sessionStorage.CreditCardNo;
		localStorage.CreditCardExpiryMonth = sessionStorage.CreditCardExpiryMonth;
		localStorage.CreditcarExpiryYear = sessionStorage.CreditcarExpiryYear;
		
		navigator.notification.confirm(
							'Do you really want to Book?',  // message
							onConfirm,              // callback to invoke with index of button pressed
							'Confirm Booking',            // title
							'Book, Cancel'          // buttonLabels
						);	

    });
	
});

$("#idBookNowPage").live('pagebeforeshow',function(){

		if(sessionStorage.TarrifRate)
		{
			$("#idEstimatedCost").val("Rs. "+sessionStorage.TarrifRate);
		}		
		
		if(localStorage.CreditCardNo)
		{
			$("#idCreditCardNo").val(""+localStorage.CreditCardNo);
		}

		if(localStorage.CreditcarExpiryYear || localStorage.CreditCardExpiryMonth)
		{
			$("#idExpDate").val(""+localStorage.CreditcarExpiryYear+"/"+localStorage.CreditCardExpiryMonth);
		}
});

function onConfirm(buttonIndex)
{
   		
    if(buttonIndex==1)
    {
    	console.log("*************buttonIndex==1");
    	
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Create_Booking";
		var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Create_Booking xmlns="http://www.drivecarclub.com/"> <CCType>'+sessionStorage.CCType+'</CCType><Company_Code>' + sessionStorage.CompanyCode + '</Company_Code>	<ContactNo>'+sessionStorage.ContactNo+'</ContactNo>	<EmailID>'+sessionStorage.EmailID+'</EmailID><GuestName>'+sessionStorage.GuestName+'</GuestName><GuestCode>'+sessionStorage.GuestCode+'</GuestCode>	<CreditCardNo>'+sessionStorage.CreditCardNo+'</CreditCardNo><CreditCardExpiryMonth>'+sessionStorage.CreditCardExpiryMonth+'</CreditCardExpiryMonth>	<CreditcarExpiryYear>'+sessionStorage.CreditcarExpiryYear+'</CreditcarExpiryYear><CityCode>'+sessionStorage.CityCode+'</CityCode> <CategoryCode>'+sessionStorage.CategoryCode+'</CategoryCode> <CarTypeCode>'+sessionStorage.CarTypeCode+'</CarTypeCode><PickupHrs>'+sessionStorage.PickupHrs+'</PickupHrs> <PickupMin>'+sessionStorage.PickupMin+'</PickupMin>	<Address>'+sessionStorage.Address+'</Address>	<ReportingDate>'+sessionStorage.ReportingDate+'</ReportingDate>	<ServiceType>'+sessionStorage.ServiceTypeID+'</ServiceType> <bookedby>'+sessionStorage.bookedby+'</bookedby>	</Create_Booking> </soap:Body></soap:Envelope>';
		console.log(soapRequest)
		
	    $.ajax({
	        type: "POST",
	        url: wsUrl,
	        contentType: "text/xml",
	        dataType: "xml",
	        data: soapRequest,
	        success: bookNowSuccess,
	        error: bookNowError
	    });
	    
	    $.mobile.changePage("mainMenuPage.html", { transition: "none" });	    

    }//if(buttonIndex==1)
   	else
   	{
   		sessionStorage.CreditCardNo = "";
		sessionStorage.CreditCardExpiryMonth = "";
		sessionStorage.CreditcarExpiryYear = "";
   	}
    
}//function onConfirm(buttonIndex)


function bookNowSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	
	console.log("*********************"+req.responseText);
	
    $(req.responseText )
    .find('Create_BookingResult')
    .each(function(){
       console.log("*************************"+$(this).text());
    });	
    
   if($(this).text()!="")
   {
		alert("Reservation done..");
   }
   else
   {
		alert("We are not able to make this Reservation..");
   }

	$.mobile.changePage("mainMenuPage.html", { transition: "none" });
}

function bookNowError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}         