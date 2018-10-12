// This function allows a user to toggle navbar links in mobile devices
function classToggle() {
    const navs = document.querySelectorAll('.Navbar-Items')

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
}
document.querySelector('.Navbar-Link-toggle')
    .addEventListener('click', classToggle);