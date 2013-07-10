	$("#idCreateProfilePage").live('pageinit',function(){
		
		$('#idSave').live('touchstart',function(){
		
			localStorage.cNmae = $('#idCName').val();
			localStorage.name = $('#idName').val();
			localStorage.mobile = $('#idMobile').val();
			localStorage.email = $('#idEmail').val();
			
			//db.transaction(createTable, onCreateProfileError, onCreateProfileSuccess);	
			
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
		});	
		
		 $("#idWebServices").live('touchstart',function(){
		 
		 	//Bookings_History
            //var wsUrl = "http://www.drivecarclub.com/MyService/Service.asmx?op=Bookings_History";
            //var soapRequest ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Body> <Bookings_History xmlns="http://www.drivecarclub.com/"> <mobile>' + '919971793539' + '</mobile>  <company_code>' + '514' + '</company_code>   </Bookings_History> </soap:Body></soap:Envelope>';
                           console.log(soapRequest)
                           

            
            /*$.get('http://www.drivecarclub.com/MyService/Service.asmx/Bookings_History', { mobile: 919971793539, company_code: 514 }, function(data) {
			  $('.result').html(data);
			  alert("Load was performed."+$(data).find("Bookings_HistoryResponse").text());
			});*/

        });
		
	});
	


    
    function onCreateProfileSuccess()
	{
		console.log("Create Profile Query Success!");
	}

	function onCreateProfileError()
	{
		console.log("Create Profile Query Failed!");
	}
	
    // Populate the database 
    function createpProfile(tx)
    {
         tx.executeSql('DROP TABLE IF EXISTS PROFILE');
         tx.executeSql('CREATE TABLE IF NOT EXISTS PROFILE (id INTEGER PRIMARY KEY , mobile, cName, name, eMail)');
         tx.executeSql("INSERT INTO PROFILE ( mobile, cName, name, eMail) VALUES (?,?,?,?)", ['9273744039', 'Magneto', 'Sachin', 'sachin.mohite@gmail.com']);
    }//function createTable(tx)	
    
