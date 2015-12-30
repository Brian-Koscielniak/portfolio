/* nav scripts */
var navToggler = document.getElementById('navToggler');
navToggler.addEventListener('click', toggle_fullNav, false);

function toggle_fullNav(){
	var fullNav = document.getElementById('full');
	var mainNavLinks = document.querySelectorAll('.main .navItem');
	if(fullNav.getAttribute('class') != 'open'){
		fullNav.setAttribute('class', 'open');
		for(var i = 0; i < mainNavLinks.length; i++){
			mainNavLinks[i].style.display = 'none';
		}
	} else {
		fullNav.setAttribute('class', 'closed');
		for(var i = 0; i < mainNavLinks.length; i++){
			mainNavLinks[i].style.display = 'flex'
		}
	}
}
