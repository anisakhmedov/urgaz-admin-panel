const api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets'
let wrapper = document.querySelector('.wrapper');
let arr = []

let getUsers = () => {
    axios.get(api)
        .then((res) => {
            arr = res.data
            showData(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
}

getUsers()

let changeCarpet = document.querySelector("#changedForm")

let showData = (prom) => {
    wrapper.innerHTML = ''
    for (let carpet of prom) {
        let div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.id = carpet._id;
        div.innerHTML = `
            <div class="text">
            <p class="categories">Категория: ${carpet.categories_ru}</p>
                    <p class="title">Названия: ${carpet.title}</p>
                    <p class="code">Ворс: ${carpet.vorse}</p>
                    <p class="weight">Вес: ${carpet.weight}</p>
                    <p class="valuePuchok">Кол-во пучков: ${carpet.valuePuchok}</p>
            </div>
            <div class="btns">
                <button class="change">Изменить</button>
                <button class="remove">Удалить</button>
            </div>
        `

        for (let item of div.querySelectorAll('button')) {
            if (item.className.includes('change')) {
                item.onclick = () => {
                    changeCarpet.parentNode.classList.add('active')
                    changeCarpet.parentElement.querySelector('.bg').onclick = () => {
                        changeCarpet.parentElement.classList.remove('active')
                    }
                    changeCarpet.onsubmit = async () => {
                        event.preventDefault();
                        const formData = new FormData(event.target);
                        let obj = {}
                        formData.forEach((val, key) => {
                            obj[key] = val
                        })
                        try {
                            const response = await axios.patch(`https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets/${carpet._id}`, obj, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            getUsers()
                            changeCarpet.parentElement.classList.remove('active')
                            alert('Ковер обновлен успешно');
                        } catch (error) {
                            console.error('Error uploading carpet:', error);
                            alert('Ковер не был обновлен');
                        }
                    }
                }
            } else if (item.className.includes('remove')) {
                item.onclick = () => {
                    axios.delete(`${api}/${carpet._id}`)
                        .then((res) => {
                            console.log(res);
                            getUsers()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        }
        wrapper.appendChild(div)
    }

}

const search_carpet = document.getElementById('search');

search_carpet.onkeyup = function () {
    const query = event.target.value.toLowerCase();

    const filteredCategories = arr.filter(title => title.code.toLowerCase().includes(query));

    if (event.target.value.toLowerCase().length >= 1 && filteredCategories.length == 0) wrapper.innerHTML = "Ничего нет"
    else showData(filteredCategories)
};


// for(let images of carpet.image_carpet){
//     console.log(images.image_carpet);
//     console.log(document.querySelector('.carpet_images'));
// }