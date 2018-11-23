import { checkToken } from './checkToken'

checkToken()

document.getElementById('logout').addEventListener('click', logout);


function logout() {
    let token = localStorage.getItem('Authorization')
    if (token != null) {
        localStorage.removeItem('Authorization')
        localStorage.removeItem('email')

        window.location.href = 'index.html'
    } else {
        window.location.href = 'index.html'
    }

}