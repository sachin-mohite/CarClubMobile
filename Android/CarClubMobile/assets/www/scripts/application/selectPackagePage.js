$("#idSelectPackagePage").live('pageinit',function(){
	console.log("***************In idSelectPackagePage: pageinit");	
	
	$('.bookNowClass').live('touchstart',function(){
		
		//console.log("*******************create profile::"+$(this).attr("indx"));	
		
		sessionStorage.TarrifRate = $(this).attr("Rate");
		
		$.mobile.changePage("bookNowPage.html", { transition: "none" });
		
	});

});

$("#idSelectPackagePage").live('pagebeforeshow',function(){

	console.log("***************In idSelectPackagePage:pagebeforeshow");
	
	$.mobile.loading('show');
	
	//City
	//var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Package";
    //var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Package xmlns="http://www.drivecarclub.com/"> <Company_Code>' + localStorage.companyCode + '</Company_Code><Car_Type_Code>'  +sessionStorage.CarTypeCode+ '</Car_Type_Code><City_Code>' +sessionStorage.CityCode+ '</City_Code><Service_type>'+sessionStorage.ServiceType+'</Service_type></Package> </soap:Body></soap:Envelope>';
    //               console.log(soapRequest)
    
    var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Package";
    var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Package xmlns="http://www.drivecarclub.com/"> <Company_Code>' + localStorage.companyCode + '</Company_Code> <Car_Type_Code>'+sessionStorage.CarTypeCode+'</Car_Type_Code><City_Code>'+sessionStorage.CityCode+ '</City_Code><Service_type>'+sessionStorage.ServiceType+'</Service_type> </Package> </soap:Body></soap:Envelope>';
                       console.log(soapRequest)
	
    $.ajax({
        type: "POST",
        url: wsUrl,
        contentType: "text/xml",
        dataType: "xml",
        data: soapRequest,
        success: selectPackageSuccess,
        error: selectPackageError
    });
    
});

function selectPackageSuccess(data, status, req, xml, xmlHttpRequest, responseXML) {
	//alert("*********************"+req.responseText);
	console.log("*********************"+req.responseText);
	
	var options="";
    var arrTarrifCode=[];
    var arrTarrifName=[];
    var arrRate=[];
    var arrExtraKMRate=[];
    var arrExtraHRRate=[];        
        
    if($(req.responseText).find('NewDataSet').find('STATUS').text()=="NO PACKAGE AVAILABLE")
    {
    	options = '<div data-role="fieldcontain" data-position="inline"><label style="color:#045BA8;">You dont have any package to show..</label></div>';
    	$('#idPackageContents').append(options);
	    $('#idPackageContents').trigger("create"); 
    }   
    else
    {          
        
        $(req.responseText )
        .find('NewDataSet')
        .each(function(){
            $(this).find('Tariff_Code')
            .each(function(i){
            arrTarrifCode.push($(this).text());			
            console.log("*************************"+arrTarrifCode[i]);            
            });

            $(this).find('Package_Name')
            .each(function(i){
            arrTarrifName.push($(this).text());			
            console.log("*************************"+arrTarrifName[i]);            
            });
            
           $(this).find('Rate')
            .each(function(i){
            arrRate.push($(this).text());			
            console.log("*************************"+arrRate[i]);            
            });
            
			$(this).find('Extra_Hr_Rate')
            .each(function(i){
            arrExtraHRRate.push($(this).text());			
            console.log("*************************"+arrExtraHRRate[i]);            
            });
            
           $(this).find('Extra_Km_Rate')
            .each(function(i){
            arrExtraKMRate.push($(this).text());			
            console.log("*************************"+arrExtraKMRate[i]);            
            });

        });
   
        for(i=0;i<arrTarrifCode.length;i++)
        {			
			options = options + '<div data-role="fieldcontain" data-position="inline">	<label for="email" style="color:#045BA8;">Package Name:' +arrTarrifName[i]+	'</label><br>Rate: Rs. '+arrRate[i]+'<br>Extra HR Rate: Rs. '+arrExtraHRRate[i]+'<br>	Extra KM Rate: Rs. '+arrExtraKMRate[i]+'<br>	Service Type:'+sessionStorage.ServiceType+'<br>	<a data-role="button" href="#" id="idBookNowButton'+i+'" Tariff_Code="'+arrTarrifCode[i]+'" Package_Name="'+arrTarrifName[i]+'" Rate="'+arrRate[i]+'" Extra_Km_Rate="'+arrExtraKMRate[i]+'" Extra_Hr_Rate="'+arrExtraHRRate[i]+'" class="bookNowClass" data-transition="none">Book Now</a></div>';
		}  
		console.log("Options:"+options);
	    $('#idPackageContents').append(options);
	    $('#idPackageContents').trigger("create");
	    
	}
	
	$.mobile.loading('hide');
}

function selectPackageError(data, status, req) {
    alert(req.responseText + " " + status);
    console.log("Data::"+data);
    console.log("Status::"+status);
    console.log("Request::"+req);
}         