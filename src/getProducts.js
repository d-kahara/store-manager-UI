import { checkToken } from './checkToken'

const table_products = document.getElementById('products')
async function get_products() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products', {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    checkToken(request)
    try {
        const productsInfo = fetch(request)
        const response = await productsInfo;
        const body = await response.json();
        if (response.status === 200) {
            for (let i = 0; i < body.products.length; i++) {
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

get_products()

