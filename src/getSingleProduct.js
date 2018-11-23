import { checkToken } from './checkToken'

let product_name = document.getElementById('card-title')
let inventory = document.getElementById('stock')
let min_quantity = document.getElementById('minimum-quantity')
let date_created = document.getElementById('date-added')
let date_modified = document.getElementById('date-modified')
let price = document.getElementById('price')
let inventory_form = document.getElementById('stock_form');
let min_quantity_form =document.getElementById('minimum_stock');
let price_form = document.getElementById('price_form');

// Get id from query params
const product_id = new URLSearchParams(window.location.search).get("id");
const output = document.getElementById('output')

async function get_product() {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products/'+product_id, {
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    checkToken(request)
    try {
        const fetchProduct = fetch(request);
        const response = await fetchProduct;
        const body = await response.json();
        if (response.ok) {
            product_name.innerHTML = body.product[0].product_name
            inventory.innerHTML = body.product[0].inventory
            inventory_form.value = body.product[0].inventory
            min_quantity.innerHTML = body.product[0].min_quantity
            min_quantity_form.value = body.product[0].min_quantity
            date_created.innerHTML = body.product[0].date_created
            date_modified.innerHTML = body.product[0].date_modified
            price.innerHTML = body.product[0].price
            price_form.value = body.product[0].price


        } else if (response.status != 200) {
            output.innerHTML = body.message;
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
//Function call
get_product()

// Update Product

document.getElementById('product-update').addEventListener('submit', post_product);

async function post_product(event) {
    event.preventDefault();
    let inventory = parseInt(document.getElementById('stock_form').value);
    let min_quantity = parseInt(document.getElementById('minimum_stock').value);
    let price = parseInt(document.getElementById('price_form').value);

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products/' + product_id, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',

        }),
        method: 'PUT',
        body: JSON.stringify({
            inventory: inventory, min_quantity: min_quantity, price: price
        })

    })
    let token = localStorage.getItem('Authorization')
    if (token === null) {
        window.location.href = 'index.html'
    } else {
        request.headers.append('Authorization', token)
    }
    try {
        const productInfo = fetch(request)
        const response = await productInfo;
        const data = await response.json();
        if (response.status === 200) {
            output.innerHTML = 'Producted Updated Successfully'
            setTimeout(() => {
                location.reload()                
            }, 1500)

        } else {
            setTimeout(() => {
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

// Delete Product

document.getElementById('delete').addEventListener('click', delete_product);

async function delete_product(event) {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products/' + product_id, {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')

        }),
        method: 'DELETE',
    })
    try {

        const productInfo = fetch(request)

        const response = await productInfo;
        const data = await response.json();
        if (response.status === 200) {
            output.innerHTML = 'Producted deleted.'
            setTimeout(() => {
                location.href = 'product_list.html'
            }, 1500)

        } else {
            setTimeout(() => {
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
