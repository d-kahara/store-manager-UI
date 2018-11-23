import { checkToken } from './checkToken'

const table_sales = document.getElementById('sales')
const email_header = document.getElementById('email')
const email = localStorage.getItem('email');

async function get_sales() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/sales/'+ email, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
    checkToken(request)
    try {
        const salesInfo = fetch(request)
        const response = await salesInfo;
        const body = await response.json();
        if (response.status === 200) {
            for (let i = 0; i < body.sales.length; i++) {
                email_header.innerHTML = body.sales[i].email
                table_sales.innerHTML +=
                
                    (`
                        <tr>                
                             <td class="Price_data table-data">${body.sales[i].product_names}</td>
                             <td class="Price_data table-data">${body.sales[i].products_count}</td>
                            <td class="Price_data table-data">${body.sales[i].created_at}</td>
                            <td class="Price_data table-data">Ksh.${body.sales[i].cart_total}</td>

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
        if (error == 'TypeError: Failed to fetch') {
            output.innerHTML = 'Please check your Internet connection.'
        } else {
            output.innerHTML = error
        }
        throw Error(error)
    }
}
get_sales()