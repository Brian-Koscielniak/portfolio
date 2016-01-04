/* nav scripts */
var navToggler = document.getElementById('navToggler');
navToggler.addEventListener('click', toggle_dropNav, false);

function toggle_dropNav(){
	var dropNav = document.getElementById('dropNav');
	var mainNavLinks = document.querySelectorAll('.main .navItem');
	if(dropNav.getAttribute('class') != 'open'){
		dropNav.setAttribute('class', 'open');
		for(var i = 0; i < mainNavLinks.length; i++){
			mainNavLinks[i].style.display = 'none';
		}
	} else {
		dropNav.setAttribute('class', 'closed');
		for(var i = 0; i < mainNavLinks.length; i++){
			mainNavLinks[i].style.display = 'flex'
		}
	}
}
