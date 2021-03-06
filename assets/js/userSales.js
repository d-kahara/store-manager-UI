const table_sales = document.getElementById('sales')
console.log(table_sales)
const email_header = document.getElementById('email')
const email = new URLSearchParams(window.location.search).get("email");

async function get_sales() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/sales/'+email, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')

        }),
        method: 'GET',
    })
    try {
        const salesInfo = fetch(request)
        const response = await salesInfo;
        const body = await response.json();
        console.log(body)
        if (response.status === 200) {
            for (i = 0; i < body.sales.length; i++) {
                console.log(body.sales[i])
                console.log(body.sales[i].cart_total)
                console.log(body.sales[i].created_at)

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
        // const output = document.getElementById('output')
        // throw Error(error)
    }
}
get_sales()