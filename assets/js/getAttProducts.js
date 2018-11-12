const table_products = document.getElementById('products')

function get_products() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products', {
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
            for (i = 0; i < body.products.length; i++) {
                table_products.innerHTML +=
                    (`
                        <tr>
                            <td class="item_data table-data">${body.products[i].product_name}</td>
                            <td class="stock_data table-data">${body.products[i].inventory}</td>
                            <td class="Minimum_stock_data table-data">${body.products[i].min_quantity}</td>
                            <td class="Price_data table-data">Ksh.${body.products[i].price}</td>
                            <td><button id="btn" onClick='fire(${body.products[i].product_id})'>Add to Cart</button></td>
                        </tr>
                    `)


            }
        }).catch((error) => table_products.innerHTML = error)

}
get_products()
const output = document.getElementById('output')

async function  fire(e) {
    // e.preventDefault()
    console.log(e)
    quantity = parseInt(document.getElementById('quantity').value)
    console.log(quantity)
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
            const output = document.getElementById('output')
            output.innerHTML = data.message
            document.getElementById("form1").submit();
            window.location.href='cart.html'

        } else if(response.status === 400){
            setTimeout(() => {

                const output = document.getElementById('output')
                output.innerHTML = 'Please Enter product Quantity as a number.'
            }, 1500)
        } else {

            const output = document.getElementById('output')
            output.innerHTML = data.message
        }
        
    } catch (error) {
        const output = document.getElementById('output')
        output.innerHTML = error
        throw Error(error)
    }
}
