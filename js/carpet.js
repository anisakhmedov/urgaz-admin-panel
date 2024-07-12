// async function fetchCarpets() {
//     try {
//         const response = await 
//         const carpets = response.data;
//         const carpetList = document.getElementById('carpetList');
//         carpetList.innerHTML = ''; // Clear any existing content
//         carpets.forEach(carpet => {
//             const carpetDiv = document.createElement('div');
//             carpetDiv.className = 'carpet';
//             carpetDiv.innerHTML = `
//             <h3>${carpet.title}</h3>
//             <p>Material: ${carpet.material}</p>
//             <p>Collection: ${carpet.collection_carp}</p>
//             <p>Colors: ${carpet.colors.join(', ')}</p>
//             <p>Categories: ${carpet.categories}</p>
//             <p>Height: ${carpet.height}</p>
//             <p>Cotton: ${carpet.cotton}</p>
//             <p>Width: ${carpet.width}</p>
//             <img src="https://urgaz-basedate-64ecc72d32d4.herokuapp.com/${carpet.image}" alt="${carpet.title}">
//           `;
//             carpetList.appendChild(carpetDiv);
//         });
//     } catch (error) {
//         console.error('Error fetching carpets:', error);
//     }
// }

// import { join } from "path";

// // Call fetchCarpets when the page loads
// window.onload = fetchCarpets;

// // Upload Carpet
// document.getElementById('uploadForm').addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     console.log(formData);
//     try {
//         const response = await axios.post('https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         console.log('Carpet uploaded:', response.data);
//         alert('Carpet uploaded successfully');
//         fetchCarpets(); // Refresh the carpet list after upload
//     } catch (error) {
//         console.error('Error uploading carpet:', error);
//         alert('Error uploading carpet');
//     }
// });

const api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets'
let wrapper = document.querySelector('.wrapper');
let arr = []

let getUsers = () => {
    axios.get(api)
        .then((res) => {
            arr = res.data
            showData(res.data)
            // console.log(res.data);
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
        // <div class="item" id="${carpet._id}">

        div.setAttribute('class', 'item');
        div.id = carpet._id;
        div.innerHTML = `
            <div class="text">
                    <p class="title">Названия: ${carpet.title_ru}</p>
                    <p class="number">Имеется ли в наличии: ${carpet.valueHave == false ? 'Имеется' : 'Нету'}</p>
                    <p class="material">Материал: ${carpet.material_ru}</p>
                    <p class="collection">Коллекция: ${carpet.collection_carp_ru}</p>
                    <p class="colors">Основной цвет: ${carpet.colors_ru}</p>
                    <p class="colors_rgb">Код цвета: ${carpet.colors_rgb}</p>
                    <p class="categories">Категория: ${carpet.categories_ru}s</p>
                    <p class="model">Модель: ${carpet.model_ru}</p>
                    <p class="code">Код: ${carpet.code}</p>
            </div>
            <div class="images">
                <img src="https://urgaz-basedate-64ecc72d32d4.herokuapp.com/${carpet.image_carpet}" alt="">
                <img src="https://urgaz-basedate-64ecc72d32d4.herokuapp.com/${carpet.image_taft}" alt="">
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
                    for (let inputs of changeCarpet.querySelectorAll('input')) {
                        for (let names of Object.keys(carpet)) {
                            if (inputs.getAttribute('name') == names && inputs.getAttribute('type') != 'file') {
                                inputs.value = carpet[names]
                            }
                        }
                    }
                }
            } else if (item.className.includes('remove')) {
                item.onclick = () => {
                    console.log(carpet._id);
                    // axios.delete(`${api}/${carpet._id}`)
                    //     .then(() => {
                    //         console.log(res);
                    //         getUsers()
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     })
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