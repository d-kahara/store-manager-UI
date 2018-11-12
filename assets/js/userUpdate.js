// Update user role

document.getElementById('user-update').addEventListener('submit', post_user);
const output = document.getElementById('output')
const email = new URLSearchParams(window.location.search).get("email");

async function post_user(event) {
    event.preventDefault();
    let role = document.getElementById('User_role').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/users/' + email, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')

        }),
        method: 'PUT',
        body: JSON.stringify({
            role: role
        })

    })
    try {

        const userInfo = fetch(request)
        console.log(request)

        const response = await userInfo;
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            output.innerHTML = 'Role Updated Successfully'
            setTimeout(() => {
                location.reload()
            }, 1500)

        } else {
            setTimeout(() => {
                output.innerHTML = data.message
            }, 1500)
        }
    } catch (error) {
        output.innerHTML = error
        throw Error(error)
    }
}
let email_title = document.getElementById('card-title')
let date = document.getElementById('date-added');
let role = document.getElementById('role');
let id = document.getElementById('user_id');
let role_form = document.getElementById('User_role')
async function get_user_details() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/users/search/?email=' + email, {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    let token = localStorage.getItem('Authorization')
    if (token === null) {
        window.location.href = 'index.html'
    } else {
        request.headers.append('Authorization', token)
    }
    try {
        const fetchProduct = fetch(request);
        const response = await fetchProduct;
        const body = await response.json();
        if (response.ok) {
            console.log(body.user[0])
            email_title.innerHTML = body.user[0].email
            date.innerHTML = body.user[0].registered_on
            role_form.value = body.user[0].role
            role.innerHTML = body.user[0].role
            id.innerHTML = body.user[0].user_id

        } else if (response.status != 200) {
            output.innerHTML = body.message;

        }
    } catch (error) {
        output.innerHTML = error
        throw Error(error)
    }
}
//Function call
get_user_details()
