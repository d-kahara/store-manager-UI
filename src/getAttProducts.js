import { checkToken } from './checkToken'

const table_products = document.getElementById('products')
const output = document.getElementById('output')

function get_products() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products', {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    
    checkToken(request)
    fetch(request)
        .then((resp) => resp.json()) // Retrieve json
        .then(body => {
            for (let i = 0; i < body.products.length; i++) {
                table_products.innerHTML +=
                    (`
                        <tr>
                            <td class="item_data table-data">${body.products[i].product_name}</td>
                            <td class="stock_data table-data">${body.products[i].inventory}</td>
                            <td class="Minimum_stock_data table-data">${body.products[i].min_quantity}</td>
                            <td class="Price_data table-data">Ksh.${body.products[i].price}</td>
                            <td><button id="btn" onClick='fire(${body.products[i].product_id})'><i class="fas fa-shopping-cart">&nbsp&nbsp</i>Add to Cart</button></td>
                        </tr>
                    `)


            }
        }).catch((error) => table_products.innerHTML = error)

}
get_products()

//Make fire() onClick function available in the global scope
window.fire = async function(e) {
    const quantity = parseInt(document.getElementById('quantity').value)
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/carts/'+e, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        }),
        method: 'POST',
        body: JSON.stringify({quantity: quantity})

    })
    try {

        const cartInfo = fetch(request)
        const response = await cartInfo;
        const data = await response.json();
        if (response.status === 201) {
            output.innerHTML = data.message
            document.getElementById("form1").submit();
            window.location.href='cart.html'

        } else if(response.status === 400){
            setTimeout(() => {
                output.innerHTML = 'Please Enter product Quantity as a number.'
            }, 1500)
        } else {

            output.innerHTML = data.message
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
