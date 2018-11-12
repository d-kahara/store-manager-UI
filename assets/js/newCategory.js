document.getElementById('save').addEventListener('submit', new_category);
const output = document.getElementById('output')

async function new_category(event) {
    console.log('yiygs')
    event.preventDefault();
    let category = document.getElementById('category').value;

    const request = new Request('https://store-managaer-api.herokuapp.com/api/v2/categories', {
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')

        }),
        method: 'POST',
        body: JSON.stringify({
            category_name: category
        })

    })
    try {

        const categoryInfo = fetch(request)
        const response = await categoryInfo;
        const data = await response.json();
        console.log(data)
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
        const output = document.getElementById('output')
        output.innerHTML = error
        throw Error(error)
    }
}