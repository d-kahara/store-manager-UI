import { checkToken } from './checkToken'

const table_carts = document.getElementById('carts')
const email = localStorage.getItem('email')
const output = document.getElementById('output')

async function get_carts() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/carts/'+ email, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
    checkToken(request)
    try {
        const cartInfo = fetch(request)
        const response = await cartInfo;
        const body = await response.json();
        if (response.status === 200) {
            for (let i = 0; i < body.Cart_record.length; i++) {
                table_carts.innerHTML +=
                    (`
                        <tr>
                            <td class="item_data table-data">${body.Cart_record[i].product_name}</td>
                            <td class="stock_data table-data">${body.Cart_record[i].quantity}</td>
                            <td class="Price_data table-data">Ksh.${body.Cart_record[i].price}</td>
                        </tr>
                    `)
            }
        } else if(response.status === 404) {
            setTimeout(() => {
            output.innerHTML = 'No carts found for this user.'
            }, 1500)
        } else  {
            setTimeout(() => {
                output.innerHTML = body.message
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
get_carts()

//Make checkout function available in global scope after bundling
window.checkout = async function(){
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/sales', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        }),
        method: 'POST',
    })
    try {

        const checkoutInfo = fetch(request)
        const response = await checkoutInfo;
        const data = await response.json();
        if (response.ok === true) {
            const output = document.getElementById('output')
            output.innerHTML = data.Message
            setTimeout(() => {
                window.location.href ='Individual_attendant_sales.html'
            }, 1500)

        } else if (response.status === 404) {
            setTimeout(() => {
                output.innerHTML = 'No carts found for this user.Can\'t checkout.'
            }, 1500)
        } else {
            setTimeout(() => {
                output.innerHTML = body.message
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