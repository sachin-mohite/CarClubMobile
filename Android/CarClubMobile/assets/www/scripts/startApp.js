	var db = null;
	$(document).ready(function()
	{	
		$.mobile.changePage("pages/profilePage.html", { transition: "none" });
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
		
	}