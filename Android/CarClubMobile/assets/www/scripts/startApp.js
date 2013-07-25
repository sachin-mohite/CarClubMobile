	var db = null;
	
	//reset type=date inputs to text
	$( document ).bind( "mobileinit", function(){
		$.mobile.page.prototype.options.degradeInputs.date = true;
	});	

	
	$(document).ready(function()
	{
		if(!localStorage.mobileNo || localStorage.mobileNo === "" || !localStorage.passangerName || localStorage.passangerName === "" || !localStorage.companyName || localStorage.companyName === "" || !localStorage.passangerEmail || localStorage.passangerEmail === "") {
    		$.mobile.changePage("pages/profilePage.html", { transition: "none" });
		}
		else {
			$.mobile.changePage("pages/editprofilePage.html", { transition: "none" });
		}	
		
		//$.mobile.changePage("pages/selectPackage.html", { transition: "none" });
		
	});//$(document).ready(function()
	
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
		sessionStorage.CategoryCode = "";
		sessionStorage.CarTypeCode = "";
		sessionStorage.PickupHrs = "";
		sessionStorage.PickupMin = "";
		sessionStorage.Address = "";
		sessionStorage.ReportingDate  = "";
		sessionStorage.ServiceType = "";
		sessionStorage.bookedby  = "";
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