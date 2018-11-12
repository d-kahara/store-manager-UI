const table_users = document.getElementById('users')
async function get_users() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/users', {
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
        const fetchUsers = fetch(request);
        const response = await fetchUsers;
        const body = await response.json();
        if (response.ok) {
            for (i = 0; i < body.users.length; i++) {
                console.log(body.users[i].email)
                table_users.innerHTML +=
                    (`
                <tr>
                    <td class="staff_name table-data">${body.users[i].user_id}</td>
                    <td class="staff_name table-data">${body.users[i].email}</td>
                    <td class="staff_name table-data">${body.users[i].registered_on}</td>
                    <td><a href="staff_details.html?email=${body.users[i].email}"><button id="btn">View Details</button></a></td>
                <tr>
            `)
            }
        }else if(response.status != 200){
            let output = document.getElementById('output')
            output.innerHTML = body.message;

        }
    } catch (error) {
        let output = document.getElementById('output')
        output.innerHTML = error
        throw Error(error)
    }
}
get_users()

