	var db = null;
	var WSInProgress=false;
	var confirmInProgress=false;
	var prevPageID="";
	
	//reset type=date inputs to text
	$( document ).bind( "mobileinit", function(){
		$.mobile.page.prototype.options.degradeInputs.date = true;
	});	

	
	$(document).ready(function()
	{
	
		$(document).bind('backbutton', onPressBack);
		
		//var networkState = navigator.network.connection.type;
	
		/*if (networkState == Connection.NONE){
		  alert('No Internet Connection..');
		  //Todo: Render splash screen
		}
		else
		{*/
			if(!localStorage.mobileNo || localStorage.mobileNo === "" || !localStorage.passangerName || localStorage.passangerName === "" || !localStorage.companyName || localStorage.companyName === "" || !localStorage.passangerEmail || localStorage.passangerEmail === "") {
	    		$.mobile.changePage("pages/profilePage.html", { transition: "none" });
			}
			else {
				$.mobile.changePage("pages/editprofilePage.html", { transition: "none" });
				$.mobile.loading('show');
			}		
		//}
		
	});//$(document).ready(function()
	
	function onPressBack()
	{
			//exit when back button pressed on home screen

			console.log("*************************prevPageID:"+prevPageID);
	    	var activePage = $.mobile.activePage.attr('id');
		    if (activePage == "idCreateProfilePage" || activePage == "idEditProfilePage" && prevPageID!="") {
	            navigator.app.exitApp();
	        } 
	        else if (activePage == "idUpdateBookingPage" ){
				$.mobile.changePage("editReservationPage.html", { transition: "none" });	        
	        }
	        else if (activePage == "idMakeReservationPage" ){
				$.mobile.loading('hide');	        
	        }	        
	        else{
	            navigator.app.backHistory();
	        }
		   
	}
	
	function clearBooking()
	{
		sessionStorage.CCType = "";
		sessionStorage.CompanyCode = "";
		sessionStorage.ContactNo = "";
		sessionStorage.EmailID = "";
		sessionStorage.GuestName = "";
		sessionStorage.GuestCode = "";
		sessionStorage.CreditCardNo = "";
		sessionStorage.CreditCardExpiryMonth = "";
		sessionStorage.CreditcarExpiryYear = "";
		sessionStorage.CityCode = "";
		sessionStorage.CityName = "";
		sessionStorage.CategoryCode = "";
		sessionStorage.CarTypeCode = "";
		sessionStorage.PickupHrs = "";
		sessionStorage.PickupMin = "";
		sessionStorage.Address = "";
		sessionStorage.ReportingDate  = "";
		sessionStorage.ServiceType = "";
	}
	
	function initUserProfile()
	{
		sessionStorage.authenticated = localStorage.authenticated;
		sessionStorage.ContactNo = localStorage.mobileNo;
		sessionStorage.GuestName = localStorage.passangerName;
		sessionStorage.companyName = localStorage.companyName;
		sessionStorage.CompanyCode = localStorage.companyCode;
		sessionStorage.EmailID = localStorage.passangerEmail;
		sessionStorage.GuestCode = localStorage.GuestCode;		
	}
	
	function clearProfile()
	{
		localStorage.authenticated = "";
		localStorage.mobileNo = "";
		localStorage.passangerName = "";
		localStorage.companyName = "";
		localStorage.companyCode = "";
		localStorage.passangerEmail = "";
		localStorage.GuestCode = "";
	
	}
	
	//Common Functions
	function isValidDate(s) {
	    // format D(D)/M(M)/(YY)YY
	    var dateFormat = /^\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}$/;
	
	    if (dateFormat.test(s)) {
	        // remove any leading zeros from date values
	        s = s.replace(/0*(\d*)/gi,"$1");
	        var dateArray = s.split(/[\.|\/|-]/);
	      
	        // correct month value
	        dateArray[1] = dateArray[1]-1;
	
	        // correct year value
	        if (dateArray[2].length<4) {
	            // correct year value
	            dateArray[2] = (parseInt(dateArray[2]) < 50) ? 2000 + parseInt(dateArray[2]) : 1900 + parseInt(dateArray[2]);
	        }
	
	        var testDate = new Date(dateArray[2], dateArray[1], dateArray[0]);
	        if (testDate.getDate()!=dateArray[0] || testDate.getMonth()!=dateArray[1] || testDate.getFullYear()!=dateArray[2]) {
	            return false;
	        } else {
	            return true;
	        }
	    } else {
	        return false;
	    }
	}
	
	function isValidMmYyyy(dValue) {
		  var result = false;
		  dValue = dValue.split('/');
		  var patternMM = /^\d{2}$/;
		  var patternYYYY = /^\d{4}$/;

		
		  if (dValue[0] < 1 || dValue[0] > 12)
			return false;
		
		  if (!patternMM.test(dValue[0]) || !patternYYYY.test(dValue[1]))
			return false;
		
		  if (dValue[2])
			return false;

	 	return true;
		  
	}
	
    function isValidateHhMm(s) {
        var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(s);

        if (isValid) {
            //inputField.style.backgroundColor = '#bfa';
            return true;
        } else {
        	return false;
            //inputField.style.backgroundColor = '#fba';
        }

        return isValid;
    }	
    
    var indexOf = function(needle) {
	    if(typeof Array.prototype.indexOf === 'function') {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function(needle) {
	            var i = -1, index;
	
	            for(i = 0; i < this.length; i++) {
	                if(this[i] === needle) {
	                    index = i;
	                    break;
	                }
	            }
	
	            return index;
	        };
	    }
	
	    return indexOf.call(this, needle);
	};	
	
	function checkInput(type) {
	    var input = document.createElement("input");
	    input.setAttribute("type", type);
	    return input.type == type;
	}
	
  function customTimePicker(inputId)
    {
        
		$('#'+inputId).scroller({
            preset: 'time',
            theme: 'default',
            display: 'modal',
            timeFormat: 'HH:ii',
            stepMinute: 15,
            mode: 'Clickpick',
            ampm: false,
            timeWheels:'HHii'

        });
    }
   
   function customDatePicker(inputId)
   {
   
   		console.log("***************"+inputId);
       $('#'+inputId).scroller({
           preset: 'date',
           /*invalid: {
               daysOfWeek: [0, 6],
               daysOfMonth: ['5/1', '12/24', '12/25']
           },*/
           dateFormat: "dd/mm/yyyy",
           theme: 'Android ICS Light',
           display: 'modal',
           mode: 'Clickpick',
           showOnFocus:'true'
       });
   }	
   
   function customCCExpDatePicker(inputId)
   {
   
   		console.log("***************"+inputId);
       $('#'+inputId).scroller({
           preset: 'date',
           /*invalid: {
               daysOfWeek: [0, 6],
               daysOfMonth: ['5/1', '12/24', '12/25']
           },*/
	        dateOrder: 'mmyy',
	        dateFormat: 'mm/yyyy',
           theme: 'Android ICS Light',
           display: 'modal',
           mode: 'Clickpick',
			maxDate:null,
           showOnFocus:'true'
       });
   }	   
   
function dstrToUTC(ds, time) {
	 var dsarr = ds.split("/");

	 var dd = parseInt(dsarr[0],10);
	 var mm = parseInt(dsarr[1],10);
	 var yy = parseInt(dsarr[2],10);
	 
	 if(time!="")
	 {
		 var tmarr = time.split(":");
		 return Date.UTC(yy,mm-1,dd,tmarr[0],tmarr[1],0);	 
	 }
	 else
	 {
	 	return Date.UTC(yy,mm-1,dd,0,0,0);	 
	 }
	 
}

function timediff(ds1,ds2) {
	 //var d1 = dstrToUTC(ds1);
	 //var d2 = dstrToUTC(ds2);
	 var oneHr = 60*60*60*100;
	 var diff = (ds1-ds2) / oneHr;
	 
	 console.log("****************diff:"+diff);
	 
	 return diff;
}

function refreshPage() {
  $.mobile.changePage(
    window.location.href,
    {
      allowSamePageTransition : true,
      transition              : 'none',
      showLoadMsg             : false,
      reloadPage              : true
    }
  );
}

function refreshPage1(page){
    // Page refresh
    $("#"+page).trigger('pagecreate');
    $("#"+page).listview('refresh');
}