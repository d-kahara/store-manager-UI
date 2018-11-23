import { checkToken } from './checkToken'

const table_sales = document.getElementById('sales')
const output = document.getElementById('output')


async function get_sales() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/sales', {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    checkToken(request)

    try {
        const salesInfo = fetch(request)
        const response = await salesInfo;
        const body = await response.json();
        if (response.ok) {
            for (let i = 0; i < body.sales.length; i++) {
            table_sales.innerHTML = (`
                        <tr>
                            <td class="item_data table-data">${body.sales[i].email}</td>
                            <td class="stock_data table-data">${body.sales[i].products_count}</td>
                            <td class="Minimum_stock_data table-data">${body.sales[i].created_at}</td>
                            <td class="Price_data table-data">Ksh.${body.sales[i].cart_total}</td>
                            <td><a href="user_sales.html?email=${body.sales[i].email}"><button class="hidden" id="btn">View Details</button></a></td>
                        </tr>
                    `)
            }

        } else {
            setTimeout(() => {

                const output = document.getElementById('output')
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
get_sales()

