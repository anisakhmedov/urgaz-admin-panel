let form = document.querySelector('form');
console.log(form);
form.onsubmit = () => {
    console.log('123');
    event.preventDefault()
    let formData = new FormData(event.target);
    let obj = {}

    formData.forEach((val, key) => {
        obj[key] = val;
    })

    console.log(obj);
    axios.post('https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets', formData)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

}