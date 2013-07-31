	$("#idEditProfilePage").live('pageinit',function(){
		
		$('#idEditProfileUpdate').live('touchstart',function(){
			$("#idEditProfileUpdate").unbind("touchstart");
			
			if($("#idEditProfileUpdate").val()=="UPDATE")
			{
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
				
				var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=SaveProfile";
			    var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <SaveProfile xmlns="http://www.drivecarclub.com/"> <Companyname>' + localStorage.companyCode + '</Companyname> <MobileNo>'+localStorage.mobileNo+'</MobileNo><EmailID>'+localStorage.passangerEmail+ '</EmailID><GuestName>'+localStorage.passangerName+'</GuestName> </SaveProfile> </soap:Body></soap:Envelope>';
			                       console.log(soapRequest)
				
			    $.ajax({
			        type: "POST",
			        url: wsUrl,
			        contentType: "text/xml",
			        dataType: "xml",
			        data: soapRequest,
			        success: editProfileSuccess,
			        error: editProfileError
			    });
				
				setTimeout(function() {
			        // Pass functionParam to function - $(this) will 
			        // be out of scope when the function is called
			        $.mobile.changePage("mainMenuPage.html", { transition: "none" });
			    }, 300);
			}
			else
			{
				setTimeout(function() {
			        // Pass functionParam to function - $(this) will 
			        // be out of scope when the function is called
			        $.mobile.changePage("mainMenuPage.html", { transition: "none" });
			    }, 300);							
			}
			
		});	
		
	
	});
	
	$("#idEditProfilePage").live('pagebeforeshow',function(){

		if(localStorage.mobileNo)
		{
			$("#idMobile").val(""+localStorage.mobileNo);
			//$("#idMobile").attr("disabled", "disabled");		
		}

		if(localStorage.passangerName)
		{
			$("#idName").val(""+localStorage.passangerName);
			//$("#idName").attr("disabled", "disabled");	
		}
		
		/*if(localStorage.companyCode)
		{
			$("#idCName").val(""+localStorage.companyCode);
			//$("#idCName").attr("disabled", "disabled");		
		}*/
		
		if(localStorage.companyName)
		{
			$("#idCName").val(""+localStorage.companyName);
			$("#idCName").attr("disabled", "disabled");		
		}	
			
		if(localStorage.passangerEmail)
		{
			$("#idEmail").val(""+localStorage.passangerEmail);
			//$("#idEmail").attr("disabled", "disabled");			
		}
		
		$.mobile.loading('hide');
		
	});
	
function editProfileSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	//alert("*********************"+req.responseText);
	console.log("*********************"+req.responseText);
	
	alert(""+$(req.responseText).find('NewDataSet').find('Profile_Saved').text());
	
}

function editProfileError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
} 

function editProfileKeyUp(thiss)
{
		if(localStorage.passangerName!=$("#idName").val() || localStorage.passangerEmail!=$("#idEmail").val())
		{
			$("#idEditProfileUpdate").val("UPDATE");
			//$("#idEditProfileUpdate").attr("value", "UPDATE");
			$("#idEditProfileUpdate").button("refresh");
		}		
		
}