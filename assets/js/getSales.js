const table_sales = document.getElementById('sales')
function get_sales() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/sales', {
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

    fetch(request)
        .then((resp) => resp.json()) // Retrieve json
        .then(body => {
            for (i = 0; i < body.sales.length; i++) {
                console.log(body.sales[i])
                table_sales.innerHTML +=
                    (`
                        <tr>
                            <td class="item_data table-data">${body.sales[i].email}</td>
                            <td class="stock_data table-data">${body.sales[i].products_count}</td>
                            <td class="Minimum_stock_data table-data">${body.sales[i].created_at}</td>
                            <td class="Price_data table-data">Ksh.${body.sales[i].cart_total}</td>
                            <td><a href="user_sales.html?email=${body.sales[i].email}"><button class="hidden" id="btn">View Details</button></a></td>
                        </tr>
                    `)
            }
        }).catch((error) => table_sales.innerHTML = error)

}
get_sales()

