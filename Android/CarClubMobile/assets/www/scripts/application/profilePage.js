	$("#idCreateProfilePage").live('pageinit',function(){
		
		/*$('#idSave').live('touchstart',function(){
		
			localStorage.cNmae = $('#idCName').val();
			localStorage.name = $('#idName').val();
			localStorage.mobile = $('#idMobile').val();
			localStorage.email = $('#idEmail').val();
			
			//db.transaction(createTable, onCreateProfileError, onCreateProfileSuccess);	
			
			$.mobile.changePage("mainMenuPage.html", { transition: "slide" });
		});*/	
		
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
