const table_carts = document.getElementById('carts')
const email = localStorage.getItem('email')

async function get_carts() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/carts/'+ email, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')

        }),
        method: 'GET',
    })
    try {
        const cartInfo = fetch(request)
        const response = await cartInfo;
        const body = await response.json();
        console.log(body)
        if (response.status === 200) {
            for (i = 0; i < body.Cart_record.length; i++) {
                table_carts.innerHTML +=
                    (`
                        <tr>
                            <td class="item_data table-data">${body.Cart_record[i].product_name}</td>
                            <td class="stock_data table-data">${body.Cart_record[i].quantity}</td>
                            <td class="Price_data table-data">Ksh.${body.Cart_record[i].price}</td>
                        </tr>
                    `)
            }
        } else {
            setTimeout(() => {
            const output = document.getElementById('output')
            output.innerHTML = body.message
            }, 1500)
        }
    } catch (error) {
        const output = document.getElementById('output')
        output.innerHTML = error
        throw Error(error)
    }
}
get_carts()

async function checkout(){
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
        console.log(data)
        if (response.ok === true) {
            const output = document.getElementById('output')
            output.innerHTML = data.Message
            setTimeout(() => {
                window.location.href ='attendant_products_view.html'
            }, 1500)

        } else {
            setTimeout(() => {

                const output = document.getElementById('output')
                output.innerHTML = data.message
            }, 1500)
        }
    } catch (error) {
        const output = document.getElementById('output')
        output.innerHTML = error
        throw Error(error)
    }
}