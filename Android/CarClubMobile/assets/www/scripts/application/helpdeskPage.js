	$("#idHelpDeskPage").live('pageinit',function(){
	
		$.mobile.loading('hide');
		
		$('#idHelpPrivacyPolicy').live('touchstart',function(){
			window.open('http://www.drivecarclub.com/Matter/PrivacyPolicy.pdf', '_system', 'location=yes');
		});
		
	});

	
	$("#idHelpDeskPage").live('pagebeforeshow',function(){
	
		$.mobile.loading('show');
		
		var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=helpdesk";
        var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <helpdesk xmlns="http://www.drivecarclub.com/"></helpdesk> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
		
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: helpSuccess,
            error: helpError
        });		
		
	});
	
function helpSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	//alert("*********************"+req.responseText);
	console.log("*********************"+req.responseText);
	
	var options="";
    var arrName=[];
    var arrEmailID=[];
    var arrContactNum=[];
       
         
	$(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('Name')
            .each(function(i){
            arrName.push($(this).text());			
            console.log("*************************"+arrName[i]);            
            });

            $(this).find('EmailID')
            .each(function(i){
            arrEmailID.push($(this).text());			
            console.log("*************************"+arrEmailID[i]);            
            });
            
           $(this).find('ContactNumber')
            .each(function(i){
            arrContactNum.push($(this).text());			
            console.log("*************************"+arrContactNum[i]);            
            });
            
        });
   
        /*for(i=0;i<arrContactNum.length;i++)
        {			
			//options = options + '<div data-role="fieldcontain" data-position="inline">	<label for="email" style="color:#045BA8;">Package Name:' +arrTarrifName[i]+	'</label><br>Rate: Rs. '+arrRate[i]+'<br>Extra HR Rate: Rs. '+arrExtraHRRate[i]+'<br>	Extra KM Rate: Rs. '+arrExtraKMRate[i]+'<br>	Service Type:'+sessionStorage.ServiceType+'<br>	<a data-role="button" href="#" id="idBookNowButton'+i+'" Tariff_Code="'+arrTarrifCode[i]+'" Package_Name="'+arrTarrifName[i]+'" Rate="'+arrRate[i]+'" Extra_Km_Rate="'+arrExtraKMRate[i]+'" Extra_Hr_Rate="'+arrExtraHRRate[i]+'" class="bookNowClass" data-transition="none">Book Now</a></div>';
			options = options + '<label for="telephone" style="color:black;">'++'</label>';
			
		} */ 
		
		options = '<label for="telephone" style="color:black;">'+arrContactNum[0]+'</label>';
		console.log("Options:"+options);
	    $('#idHelpTelephoneNum').append(options);
	    $('#idHelpTelephoneNum').trigger("create");
	    
		options = '<label for="telephone" style="color:black;"><a href="mailto:'+arrEmailID[0]+'">'+arrEmailID[0]+'</a></label>';
		console.log("Options:"+options);
	    $('#idHelpResEmail').append(options);
	    $('#idHelpResEmail').trigger("create");
	    
	    options = '<label for="telephone" style="color:black;">'+arrContactNum[1]+'</label>';
		console.log("Options:"+options);
	    $('#idHelpTechSupportNum').append(options);
	    $('#idHelpTechSupportNum').trigger("create");	    
	    
	   	options = '<label for="telephone" style="color:black;"><a href="mailto:'+arrEmailID[1]+'">'+arrEmailID[1]+'</a></label>';
		console.log("Options:"+options);
	    $('#idHelpSupportEmail').append(options);
	    $('#idHelpSupportEmail').trigger("create");
		
		options = '<label for="telephone" style="color:black;">'+arrContactNum[1]+'</label>';
		console.log("Options:"+options);
	    $('#idHelpHelpLine').append(options);
	    $('#idHelpHelpLine').trigger("create");
	    
		options = '<label for="telephone" style="color:black;"><a href="http://'+arrEmailID[4]+'" target="_blank">'+arrEmailID[4]+'</a></label>';
		console.log("Options:"+options);
	    $('#idHelpWebsite').append(options);
	    $('#idHelpWebsite').trigger("create");	    	    
	
		$.mobile.loading('hide');
    }

    function helpError(data, status, req) {
        /*alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);*/
        
        alert("Unable to fetch HelpDesk details. Please confirm if internet connection is active..");
        $.mobile.loading('hide');
    }	
	