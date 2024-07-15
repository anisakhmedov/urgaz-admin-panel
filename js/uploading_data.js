document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let obj = {}
    formData.forEach((val, key) => {
        obj[key] = val
    })

    const imageFile = document.getElementById('image_carpet').files[0];
    const imageTaft = document.getElementById('image_taft').files[0];

    obj['image_carpet'] = imageFile
    obj['image_taft'] = imageTaft

    try {
        const response = await axios.post('https://urgaz-basedate-64ecc72d32d4.herokuapp.com/carpets', obj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Carpet uploaded:', response.data);
        alert('Carpet uploaded successfully');
    } catch (error) {
        console.error('Error uploading carpet:', error);
        alert('Error uploading carpet');
    }
});