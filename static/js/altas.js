let URL;

document.addEventListener("DOMContentLoaded", function() {
    // Carga el archivo de configuración JSON
    fetch('../../config.json')
        .then(response => response.json())
        .then(config => {
            URL = config.apiBaseUrl;
        })
        .catch(error => console.error('Error al cargar el archivo de configuración:', error));
});

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