	$("#idMakeReservationPage").live('pageinit',function(){
		$('#idBack').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
		});
		
		$('#idBook').live('touchstart',function(){
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
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
            success: processSuccess,
            error: processError
        });
	});	
	
	
	function processSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
    	//alert("*********************"+req.responseText);
        
        var options="";
        var arrCity=[];
        var arrCityCode=[];
        
        /*$(req.responseText )
        .find('NewDataSet')
        .each(function(){
            var id = $(this).find('City_Name')
            .each(function(){
			options = options + '<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
            //console.log("*************************"+$(this).text());
            
            });
        });*/
        
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
    }

    function processError(data, status, req) {
        alert(req.responseText + " " + status);
        console.log("Data::"+data);
        console.log("Status::"+status);
        console.log("Request::"+req);
    } 
