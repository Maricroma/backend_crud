let URL, imgUrl;
let codigo = '';
let descripcion = '';
let cantidad = '';
let precio = '';
let imagen_url = '';
let imagenSeleccionada = null;
let imagenUrlTemp = null;
let mostrarDatosProducto = false;

document.addEventListener("DOMContentLoaded", function() {
    // Carga el archivo de configuración JSON
    fetch('../../config.json')
        .then(response => response.json())
        .then(config => {
            URL = config.apiBaseUrl;
            imgUrl = config.apiImgUrl;
    
            document.getElementById('form-obtener-producto').addEventListener('submit', obtenerProducto);
            document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);
            document.getElementById('nuevaImagen').addEventListener('change', seleccionarImagen);

        })
        .catch(error => console.error('Error al cargar el archivo de configuración:', error));
});


function obtenerProducto(event) {
    event.preventDefault();
    codigo = document.getElementById('codigo').value;
    fetch(URL + 'productos/' + codigo)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Error al obtener los datos del producto.')
            }
        })
        .then(data => {
            descripcion = data.descripcion;
            cantidad = data.cantidad;
            precio = data.precio;
            imagen_url = data.imagen_url;
            mostrarDatosProducto = true; //Activa la vista del segundo formulario
            mostrarFormulario();
        })
        .catch(error => {
            console.error(error);
            alert('Código no encontrado.');
        });
}

function mostrarFormulario() {
    if (mostrarDatosProducto) {
        document.getElementById('descripcionModificar').value = descripcion;
        document.getElementById('cantidadModificar').value = cantidad;
        document.getElementById('precioModificar').value = precio;

        document.getElementById('datos-producto').style.display = 'block';
    } else {
        document.getElementById('datos-producto').style.display = 'none';
    }
}

function seleccionarImagen(event) {
    const file = event.target.files[0];
    imagenSeleccionada = file;
    imagenUrlTemp = URL.createObjectURL(file);

    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.src = imagenUrlTemp;
    imagenVistaPrevia.style.display = 'block';
}

function guardarCambios(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('descripcion', document.getElementById('descripcionModificar').value);
    formData.append('cantidad', document.getElementById('cantidadModificar').value);
    formData.append('precio', document.getElementById('precioModificar').value);

    if (imagenSeleccionada) {
        formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
    }

    fetch(URL + 'productos/' + codigo, {
        method: 'PUT',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al guardar los cambios del producto.');
            }
        })
        .then(data => {
            alert('Producto actualizado correctamente.');
            limpiarFormulario();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el producto.');
        });
}

function limpiarFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('descripcionModificar').value = '';
    document.getElementById('cantidadModificar').value = '';
    document.getElementById('precioModificar').value = '';
    document.getElementById('nuevaImagen').value = '';

    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.style.display = 'none';

    codigo = '';
    descripcion = '';
    cantidad = '';
    precio = '';
    imagen_url = '';
    imagenSeleccionada = null;
    imagenUrlTemp = null;
    mostrarDatosProducto = false;

    document.getElementById('datos-producto').style.display = 'none';
}