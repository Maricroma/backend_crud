const URL = "http://127.0.0.1:5000/"

// Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"

fetch(URL + 'productos')
.then(function (response) {
    if (response.ok) {
        return response.json(); 
} else {
        throw new Error('Error al obtener los productos.');
    }
})
.then(function (data) {
    let tablaProductos = document.getElementById('tablaProductos');

    for (let producto of data) {
        let fila = document.createElement('tr');
        fila.innerHTML = '<td>' + producto.codigo + '</td>' +
            '<td>' + producto.descripcion + '</td>' +
            '<td>' + producto.cantidad + '</td>' +
            '<td>' + producto.precio + '</td>' +
            // Mostrar miniatura de la imagen
            '<td><img src=../static/imagenes/' + producto.imagen_url +' alt="Imagen del producto" style="width: 100px;"></td>';
            
            //Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
            //'<td><img src=https://www.pythonanywhere.com/user/USUARIO/files/home/USUARIO/mysite/static/imagenes/' + producto.imagen_url +' alt="Imagen del producto" style="width: 100px;"></td>' + '<td align="right">' + producto.proveedor + '</td>';
        
        tablaProductos.appendChild(fila);
    }
})
.catch(function (error) {
    alert('Error al obtener los productos.');
});