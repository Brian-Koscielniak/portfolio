///////////////////////////////////////////////////////////////////////////////
// Special Effects: Navigation ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Get elements and assign event listeners 
var navToggler = document.getElementById('navToggler');
navToggler.addEventListener('click', toggle_dropNav, false);

function toggle_dropNav(){
/* This function changes the class of dropNav element. These classes 'open' and 'closed' will animate the dropNav via CSS. */
	// Get elements
	var dropNav = document.getElementById('dropNav');
	var mainNavLinks = document.querySelectorAll('.main .navItem');
	
	// Set appropriate class
	if(dropNav.getAttribute('class') != 'open'){
		dropNav.setAttribute('class', 'open');
		for(var i = 0; i < mainNavLinks.length; i++){
		// Hide the list of links
			mainNavLinks[i].style.display = 'none';
		}
	} else {
		dropNav.setAttribute('class', 'closed');
		for(var i = 0; i < mainNavLinks.length; i++){
		// show the list of links
			mainNavLinks[i].style.display = 'flex'
		}

		// 'closed' class will cause the dropNav's animation to trigger upon a display change. Reverting dropNav class fixes this bug.
		setTimeout(function(){
			// This is in a setTimeout so that the 'closed' class animation still have enough time.
			dropNav.setAttribute('class', 'navReady');
		}, 1000);
	}
}
