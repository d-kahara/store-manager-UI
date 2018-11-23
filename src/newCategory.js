import { checkToken } from './checkToken'

document.getElementById('save').addEventListener('submit', new_category);
const output = document.getElementById('output')

async function new_category(event) {
    event.preventDefault();
    let category = document.getElementById('category').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/categories', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({
            category_name: category
        })
    })
    checkToken(request)
    try {
        const categoryInfo = fetch(request)
        const response = await categoryInfo;
        const data = await response.json();
        if (response.status === 201) {
            output.innerHTML = data.message
            setTimeout(() => {
                location.href = 'new_product.html'
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