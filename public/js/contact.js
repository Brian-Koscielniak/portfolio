///////////////////////////////////////////////////////////////////////////////
// Contact Form Scripts ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var submitBTN = document.querySelector('#contactBody input[type=submit]');
submitBTN.addEventListener('click', handleSubmit);

function handleSubmit(e){
	var userInput = document.querySelectorAll('#contactBody .userInfo')

	// Check to see	if there is more than empty or white space inside of inputs
	for(i=0;i<userInput.length;i++){
		if(!(/\S/.test(userInput[i].value))){
			// The input is set to nothing. We don't want a bunch of spaces
			userInput[i].value = "";

			// Don't send
			return false;
		}
	}

	// stop the form from refreshing page
	e.preventDefault();

	// Make userInput into JSON
	userInput = {
		date: getDateTime(),
		name: userInput[0].value,
		email: userInput[1].value,
		message: userInput[2].value
	}
	
	var userInfo = encodeURIComponent(JSON.stringify(userInput));
	
	Ajax.sendRequest('/contact', handleResponse, userInfo);
}

function handleResponse(res){
	// Clear out the inputs. 
	var userInput = document.querySelectorAll('#contactBody .userInfo')
	for(i=0;i<userInput.length;i++){
		userInput[i].value = "";
	}

	// TODO build a proper UI message
	alert(res.responseText)
}


///////////////////////////////////////////////////////////////////////////////
// Utility Functions //////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function getDateTime(){
// Build a human friendly date from the javascript Date object
	var d = "";
	var date = new Date();
	var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	d = days[date.getDay()] + " ";
	d += months[date.getMonth()] + " "; 
	d += date.getDate() + " "; 
	d += date.getFullYear() + " "; 
	d += date.getHours() + ":";
	d += date.getMinutes();
	return d;
}
