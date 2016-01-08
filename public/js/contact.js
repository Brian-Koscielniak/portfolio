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
		id: new Date() +  Math.random().toString(36).substr(2, 12),
		name: userInput[0].value,
		email: userInput[1].value,
		message: userInput[2].value
	}
	
	var userInfo = encodeURIComponent(JSON.stringify(userInput));
	
	Ajax.sendRequest('/contact', handleResponse, userInfo);
}

function handleResponse(res){
	if (res.responseText !== '200'){
		make_infoBox(true);
	} else {
		// Clear out the inputs on success.
/*
		var userInput = document.querySelectorAll('#contactBody .userInfo')
		for(i=0;i<userInput.length;i++){
			userInput[i].value = "";
		}
*/
		make_infoBox();
	}
}

function make_infoBox(err){
	var infoBox = document.createElement('div');
	if (err){
		infoBox.appendChild(document.createTextNode('Something when wrong, message not recieved'));
		infoBox.setAttribute('class', 'infoBox infoError');
	} else {
		infoBox.appendChild(document.createTextNode('Message has been recieved'));
		infoBox.setAttribute('class', 'infoBox');
	}
	document.body.appendChild(infoBox);

	setTimeout(function(){
		document.body.removeChild(document.querySelector('.infoBox'));
	}, 5000);
}
