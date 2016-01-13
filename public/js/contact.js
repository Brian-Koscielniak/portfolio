///////////////////////////////////////////////////////////////////////////////
// Contact Form Scripts ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var submitBTN = document.querySelector('#contactBody input[type=submit]');
submitBTN.addEventListener('click', handleSubmit);

function handleSubmit(e){
	var userInput = document.querySelectorAll('#contactBody .userInfo')

	if(!validate(userInput)){ return; } 

	// stop the form from refreshing page 
	e.preventDefault(); // TODO: Also prevents required messages. email isn't checked when all feilds are filled

	// Make userInput into JSON
	userInput = {
		id: new Date() + Math.random().toString(36).substr(2, 12),
		name: userInput[0].value,
		email: userInput[1].value,
		message: userInput[2].value
	}
	
	var userInfo = encodeURIComponent(JSON.stringify(userInput));
	
	Ajax.sendRequest('/contact', handleResponse, userInfo);
}

function handleResponse(res){
	if (res.responseText == '200'){
		// Clear out the inputs on success.
		var userInput = document.querySelectorAll('#contactBody .userInfo')
		for(i=0;i<userInput.length;i++){
			userInput[i].value = "";
		}
		make_infoBox('ok');
	} else if (res.responseText == 'invalid'){
		make_infoBox('email');
	} else {
		make_infoBox('err');
	}
}

function validate(input){
	// Check to see	if there is more than empty or white space inside of inputs
	for(i=0;i<input.length;i++){
		if(!(/\S/.test(input[i].value))){
			// The input is set to nothing. We don't want a bunch of spaces
			input[i].value = "";

			return false;
		}
	}
	return true;
}

///////////////////////////////////////////////////////////////////////////////
// Display and Cosmetic ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function make_infoBox(code){
/* This function will create a display on the UI notifying whether or not the POST was successful */
	clearTimeout(clear_infoBox); 

	// Set up DOM elements
	var infoBox = document.createElement('div');
	var msg = document.createElement('p');
	var icon = document.createElement('span');
	var okBtn = document.createElement('input');
	okBtn.setAttribute('type', 'button');
	okBtn.setAttribute('class', 'okBtn');
	okBtn.setAttribute('value', 'ok');

	if (code == 'ok'){
		// Success
		icon.setAttribute('class', 'fa fa-check');
		msg.appendChild(icon);
		msg.appendChild(document.createTextNode('Success, the message has been recieved. Thank you for your feedback!'));
		infoBox.setAttribute('class', 'infoBox');
	} else if (code == 'email'){
		// Invalid email
		icon.setAttribute('class', 'fa fa-close');
		msg.appendChild(icon);
		msg.appendChild(document.createTextNode('Please make sure the email address provided is correctly typed and valid.'));
		infoBox.setAttribute('class', 'infoBox infoError');
	} else {
		// Any other error
		icon.setAttribute('class', 'fa fa-close');
		msg.appendChild(icon);
		msg.appendChild(document.createTextNode('There was an error and the message was not recieved. Please try again in a few minutes.'));
		infoBox.setAttribute('class', 'infoBox infoError');
	}

	// Append and add functionality
	msg.appendChild(okBtn);
	infoBox.appendChild(msg);
	infoBox.addEventListener('click', function(){
		document.body.removeChild(document.querySelector('.infoBox'))
		clearTimeout(clear_infoBox);
	}, false);
	document.body.appendChild(infoBox);
	okBtn.focus();

	var clear_infoBox = setTimeout(function(){
		document.body.removeChild(document.querySelector('.infoBox'));
	}, 20000);
}
