
const URL = "http://127.0.0.1:5000/"
//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"


document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();  

    var formData = new FormData(this);

    fetch(URL + 'productos', {
        method: 'POST',
        body: formData 
    })
    .then(function (response) {
            if (response.ok) { 
                return response.json(); 
            } else {
                throw new Error('Error al agregar el producto.');
            }
    })
    .then(function (data) {
        alert('Producto agregado correctamente.');
    })
    .catch(function (error) {
        alert('Error al agregar el producto.');
    })
    .finally(function () {
        document.getElementById('descripcion').value = "";
        document.getElementById('cantidad').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('imagenProducto').value = "";
    });
})