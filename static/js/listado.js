// Declara las variables globales
let config_url, imgUrl;

document.addEventListener("DOMContentLoaded", function() {
    // Carga el archivo de configuración JSON
    fetch('../../config.json')
        .then(response => response.json())
        .then(config => {
            config_url = config.apiBaseUrl;
            imgUrl = config.apiImgUrl;
    
            // Llama a la función para obtener los productos después de obtener config_url
            obtenerProductos();
        })
        .catch(error => console.error('Error al cargar el archivo de configuración:', error));
});

function obtenerProductos() {
    // Verifica que config_url esté definido antes de hacer la petición
    if (!config_url) {
        console.error('config_url no está definido.');
        return;
    }

    // Realiza la petición para obtener los productos
    fetch(config_url + 'productos')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("error")
                throw new Error('Error al obtener los productos.');
            }
        })
        .then(function(data) {
            let tablaProductos = document.getElementById('tablaProductos');
            for (let producto of data) {
                let fila = document.createElement('tr');
                fila.innerHTML = '<td>' + producto.codigo + '</td>' +
                    '<td>' + producto.descripcion + '</td>' +
                    '<td>' + producto.cantidad + '</td>' +
                    '<td>' + producto.precio + '</td>' +
                    '<td><img src="' + imgUrl + producto.imagen_url +'" alt="Imagen del producto" style="width: 100px;"></td>';  
                tablaProductos.appendChild(fila);
            }
        })
        .catch(function(error) {
            console.error('Error al obtener los productos:', error);
            alert('Error al obtener los productos.');
        });
}