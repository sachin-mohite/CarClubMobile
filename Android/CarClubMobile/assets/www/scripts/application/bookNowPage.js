$("#idBookNowPage").live('pageinit',function(){
	
	//customCCExpDatePicker('idExpDate');
	$('#idExpDate').live('click', function() {
	    $('#idExpDate').datebox('open');
	});	
	
	$('#idBookNowdDone').live('touchstart',function(){
	
		$("#idBookNowdDone").unbind("touchstart");
		
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
		else
		{
			sessionStorage.CreditCardNo=$('#idCreditCardNo').val();
		}
		
		
		if(isValidMmYyyy($('#idExpDate').val())==false)
		{
			alert("Invalid date format. Please reenter the date and submit.");
			$('#idExpDate').select();
			return;
		}
		
		//Todo: confirm if lenth is 16
		if(sessionStorage.CreditCardNo != "")
		{
			localStorage.CreditCardNo = sessionStorage.CreditCardNo;
		}
		else
		{
			alert("Please confirm if Credit Card details are Valid");
			$('#idCreditCardNo').select();
			return;
		}
		
		var expDate = $('#idExpDate').val();		
		var yf=expDate.split("/")[1];           
		var mf=expDate.split("/")[0];
		
		sessionStorage.CreditCardExpiryMonth = mf;
		sessionStorage.CreditcarExpiryYear = yf;
		
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

$("#idBookNowPage").live('pageremove',function(){
	$.mobile.loading('show');
});
	
$("#idBookNowPage").live('pagebeforeshow',function(){

		if(sessionStorage.TarrifRate)
		{
			$("#idEstimatedCost").val("Rs. "+sessionStorage.TarrifRate);
		}	
		
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=GetLastCCDetails";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <GetLastCCDetails xmlns="http://www.drivecarclub.com/"> <mobile>'+localStorage.mobileNo+'</mobile></GetLastCCDetails> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: ccDetailsSuccess,
            error: ccDetailsError
        });
		
});

function onConfirm(buttonIndex)
{
   		
    if(buttonIndex==1)
    {
    	console.log("*************buttonIndex==1");
    	
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Create_Booking";
		var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Create_Booking xmlns="http://www.drivecarclub.com/"> <CCType>'+sessionStorage.CCType+'</CCType><Company_Code>' + sessionStorage.CompanyCode + '</Company_Code>	<ContactNo>'+sessionStorage.ContactNo+'</ContactNo>	<EmailID>'+sessionStorage.EmailID+'</EmailID><GuestName>'+sessionStorage.GuestName+'</GuestName><GuestCode>'+sessionStorage.GuestCode+'</GuestCode>	<CreditCardNo>'+sessionStorage.CreditCardNo+'</CreditCardNo><CreditCardExpiryMonth>'+sessionStorage.CreditCardExpiryMonth+'</CreditCardExpiryMonth>	<CreditcarExpiryYear>'+sessionStorage.CreditcarExpiryYear+'</CreditcarExpiryYear><CityCode>'+sessionStorage.CityCode+'</CityCode> <CategoryCode>'+sessionStorage.CategoryCode+'</CategoryCode> <CarTypeCode>'+sessionStorage.CarTypeCode+'</CarTypeCode><PickupHrs>'+sessionStorage.PickupHrs+'</PickupHrs> <PickupMin>'+sessionStorage.PickupMin+'</PickupMin>	<Address>'+sessionStorage.Address+'</Address>	<ReportingDate>'+sessionStorage.ReportingDate+'</ReportingDate>	<ServiceType>'+sessionStorage.ServiceTypeID+'</ServiceType> </Create_Booking> </soap:Body></soap:Envelope>';
		console.log(soapRequest)
		
	    $.mobile.loading('show');
	    
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
	   if($(req.responseText).find('NewDataSet').find('Status').text()!="")
	   {
			alert("Reservation done with Booking ID "+$(req.responseText).find('NewDataSet').find('Status').text());
	   }
	   else
	   {
			alert("We are not able to make this Reservation because of "+$(req.responseText).find('NewDataSet').find('Remarks').text());
	   }
	   
	   $.mobile.loading('hide'); 
	});	
    
	$.mobile.changePage("mainMenuPage.html", { transition: "none" });
}

function bookNowError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}       

function ccKeyUp(e)
{
	var len = $('#idCreditCardNo').val().length;
	
	console.log("****************Length:"+len);
	
	if(len==16)
	{
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=ValidateCreditCard";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <ValidateCreditCard xmlns="http://www.drivecarclub.com/"> <ccnumber>'+$('#idCreditCardNo').val()+'</ccnumber></ValidateCreditCard> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: ccSuccess,
            error: ccError
        });

	}

}

function ccKeyDown(e)
{

	var e = event || window.event;  // get event object
	var key = e.keyCode || e.which; // get key cross-browser

	//If backspace use it
	if(key==8)
	{
		return;
	}

	var len = $('#idCreditCardNo').val().length;
	console.log("****************Length:"+len);
	
	if(len==16)//sizteen digits already entered
	{
		alert("You cannot enter more than 16 digits as Credit Card Number");
        if (e.preventDefault) e.preventDefault(); //normal browsers
            e.returnValue = false; //IE 
		return;			
	}
}

function ccSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	//alert("*********************"+req.responseText);
	
	console.log("************success:"+$(req.responseText).find('NewDataSet').find('Status').text());
	
	if($(req.responseText).find('NewDataSet').find('Status').text()=="Invalid Card")
	{
		alert("It is not a Valid Credit Card Number. Please re-enter Credit Card Number..");
		$("#idCreditCardNo").select();
		return;  				
	}
	else
	{
		//Storing details in the local storage
    	sessionStorage.CreditCardNo = $(req.responseText).find('NewDataSet').find('Status').text();
	}		

}  

function ccError(data, status, req) {
    /*alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);*/
    
   	alert("Unable to Proceed. Please confirm if internet connection is active..");
   	return;
}	

	function ccDetailsSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
    	
    	console.log("************success:"+$(req.responseText).find('NewDataSet').find('Status').text());
    	    	
    	if($(req.responseText).find('NewDataSet').find('Status').text()=="True")
		{
			//Storing details in the local storage
	    	sessionStorage.CreditCardNo = $(req.responseText).find('NewDataSet').find('creditcardno').text();
	    	var ccExpiryDate = $(req.responseText).find('NewDataSet').find('creditcardexpirydate').text();
	    	
	    	localStorage.CreditCardExpiryMonth = ccExpiryDate.split("-")[1];
	    	localStorage.CreditcarExpiryYear = ccExpiryDate.split("-")[0];
	    	
	    	//Assigning details to objects
			if(sessionStorage.CreditCardNo)
			{
				$("#idCreditCardNo").val(""+sessionStorage.CreditCardNo);
			}
	
			if(localStorage.CreditcarExpiryYear || localStorage.CreditCardExpiryMonth)
			{
				$("#idExpDate").val(""+localStorage.CreditCardExpiryMonth+"/"+localStorage.CreditcarExpiryYear);
			}
			
			if($('#idCreditCardNo').val().length < 16)
			{
				alert("Credit Card Number can not be less 16 digits. Please enter valid Credit Card Number");
				//$('#idCreditCardNo').select();
			}
			  				
		}
		else
		{
			alert("No Credit Card Details available. Please enter it manually.");
			$("#idCreditCardNo").select();
			
		}
    }

    function ccDetailsError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
        
        alert("Unable to Proceed. Please confirm if Internet connection is active..");
    }	