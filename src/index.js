document.getElementById('login-btn').addEventListener('click', login);

async function login(event) {
    event.preventDefault();
    const output = document.getElementById('output')
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/auth/login', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }),
        method:'POST',
        body: JSON.stringify({ email: email, password: password })

    })
    try {
        const fetchLoginInfo = fetch(request)
        const response = await fetchLoginInfo;
        const data = await response.json();
        if(data.status === 'success'){
            // Save the JWT to local storage
            localStorage.setItem('Authorization',data.Authorization)
            localStorage.setItem('email',email)
            if (data.role === 'admin') {
                setTimeout(() => {
                    output.innerHTML = data.message
                    window.location.href = 'admin_dash.html'

                }, 1500)
            }
            else if(data.role === 'attendant') {
                setTimeout(() => {
                    window.location.href = 'attendant_dash.html'
                }, 1500)
            }
        } else {
            let output = document.getElementById('output')
            setTimeout(() =>{
                output.innerHTML = data.message
            },1500)
        }
    } catch(error) {
        if (error == 'TypeError: Failed to fetch') {
            output.innerHTML = 'Please check your Internet connection.'
        } else {
            output.innerHTML = error
        }
        throw Error(error)
    }
}
