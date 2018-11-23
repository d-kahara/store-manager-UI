export function checkToken (request) {
    
    
    let token = localStorage.getItem('Authorization')
    if (token === null) {
        window.location.href = 'index.html'
    } else if(request) {
        request.headers.append('Authorization', token)
    }
}
// This function allows a user to toggle navbar links in mobile devices
export function classToggle() {
    const navs = document.querySelectorAll('.Navbar-Items')

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
}
document.querySelector('.Navbar-Link-toggle')
    .addEventListener('click', classToggle);

