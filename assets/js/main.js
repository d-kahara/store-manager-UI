// This function allows a user to toggle navbar links in mobile devices
function classToggle() {
    const navs = document.querySelectorAll('.Navbar-Items')

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
}
document.querySelector('.Navbar-Link-toggle')
    .addEventListener('click', classToggle);


document.getElementById('logout').addEventListener('click', logout);

function logout() {
    let token = localStorage.getItem('Authorization')
    if (token != null) {
        localStorage.removeItem('Authorization')
        localStorage.removeItem('email')

        window.location.href = 'index.html'
    }

}
