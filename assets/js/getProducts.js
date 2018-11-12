const table_products = document.getElementById('products')
function get_products() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products', {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    let token =localStorage.getItem('Authorization')
    if(token === null) {
        window.location.href = 'index.html'
    }else {
        request.headers.append('Authorization',token)
    }

        fetch(request)
            .then((resp) => resp.json()) // Retrieve json
            .then(body => {
                for (i = 0; i < body.products.length; i++) {
                    console.log(body.products[i])
                    table_products.innerHTML +=
                        (`
                        <tr>
                            <td class="item_data table-data">${body.products[i].product_name}</td>
                            <td class="stock_data table-data">${body.products[i].inventory}</td>
                            <td class="Minimum_stock_data table-data">${body.products[i].min_quantity}</td>
                            <td class="Price_data table-data">Ksh.${body.products[i].price}</td>
                            <td><a href="product_details.html?id=${body.products[i].product_id}"><button class="hidden" id="btn">View Details</button></a></td>
                        </tr>
                    `)
                }
            }).catch((error) => table_products.innerHTML = error)

}
get_products()

