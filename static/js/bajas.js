let URL;

document.addEventListener("DOMContentLoaded", function() {
    // Carga el archivo de configuración JSON
    fetch('../../config.json')
        .then(response => response.json())
        .then(config => {
            URL = config.apiBaseUrl;
            obtenerProductos();
        })
        .catch(error => console.error('Error al cargar el archivo de configuración:', error));
});


function obtenerProductos() {
    // Verifica que config_url esté definido antes de hacer la petición
    if (!URL) {
        console.error('config_url no está definido.');
        return;
    }
    fetch(URL + 'productos') 
        .then(response => {
            if (response.ok) { return response.json(); }
        })
        .then(data => {
            const productosTable = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
            productosTable.innerHTML = '';
            data.forEach(producto => {
                const row = productosTable.insertRow();
                row.innerHTML = `
                    <td>${producto.codigo}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio}</td>
                    <td style='text-align: center;'><button onclick="eliminarProducto('${producto.codigo}')">Eliminar</button></td>
                `;
            });
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Error al obtener los productos.');
        });
}

function eliminarProducto(codigo) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    obtenerProductos();
                    alert('Producto eliminado correctamente.');
                }
            })
            .catch(error => {
                alert(error.message);
            });
    }
}

document.addEventListener('DOMContentLoaded', obtenerProductos);