import { checkToken } from './checkToken'

document.getElementById('post-product').addEventListener('submit', post_product);
const output = document.getElementById('output')
const dropdown = document.getElementById('btn')

async function post_product(event) {
    event.preventDefault();
    let product_name = document.getElementById('product_name').value;
    let inventory = parseInt(document.getElementById('stock_count').value);
    let min_quantity = parseInt(document.getElementById('minimum_stock').value);
    let price = parseInt(document.getElementById('price').value);
    let category = document.getElementById('btn').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/products', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        }),
        method: 'POST',
        body: JSON.stringify({
            product_name: product_name, inventory: inventory, category: category,
            min_quantity: min_quantity, price: price })

    })
    checkToken(request)
 
    try 
    {
        const productInfo = fetch(request)
        const response = await productInfo;
        const data = await response.json();
        if (response.status === 201) {
            output.innerHTML = data.message
            setTimeout(() => {
                location.href = 'product_list.html'
            }, 1000)
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

async function get_categories(event) {
    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/categories', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        }),
        method: 'GET'
    })
    try {
        const categoryInfo = fetch(request)
        const response = await categoryInfo;
        const data = await response.json();
        if (response.ok === true) {
            for (let i = 0; i < data.categories.length; i++) {
                    dropdown.innerHTML += (` 
                                                 <option>${data.categories[i].category_name}</option>
                                            `)
            }
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
get_categories()