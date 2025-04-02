let carrito = [];

// Agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Mostrar los productos en el carrito
function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    if (!lista) return; // Verifica que el carrito exista en el HTML

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">❌</button>`;
        lista.appendChild(item);
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    document.getElementById("carrito-popup").style.display = "block";
}

// Cerrar carrito
function cerrarCarrito() {
    document.getElementById("carrito-popup").style.display = "none";
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    alert("¡Compra realizada con éxito!");
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
}

