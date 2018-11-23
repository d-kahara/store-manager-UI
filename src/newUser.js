import { checkToken } from './checkToken'

document.getElementById('save').addEventListener('submit', new_user);
const output = document.getElementById('output')

async function new_user(event) {
    event.preventDefault();
    let email = document.getElementById('Attendant_email').value;
    let role = document.getElementById('btn').value;
    let password = document.getElementById('login-password').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/auth/register', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',

        }),
        method: 'POST',
        body: JSON.stringify({
            email: email, role: role, password: password
        })
    })
    checkToken(request)

    try {
        const userInfo = fetch(request)
        const response = await userInfo;
        const data = await response.json();
        if (response.status === 201) {
            output.innerHTML = data.message
        } else {
            setTimeout(() => {
                output.innerHTML = data.message
            }, 1500)
        }
    } catch (error) {
        if (error == 'TypeError: Failed to fetch') {
            output.innerHTML = 'Please check your Internet connection.'
        } else {
            output.innerHTML = error
        }
        throw Error(error)
    }
}