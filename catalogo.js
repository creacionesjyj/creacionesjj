document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { id: 1, nombre: "Buzo cuello alto mostaza", precio: 7.99, img: "./catalogo/imagescatalogo/producto 1.png" },
        { id: 2, nombre: "Buzo cuello alto Abano", precio: 7.99, img: "./catalogo/imagescatalogo/producto 2.png" },
        { id: 3, nombre: "Buzo cuello alto Plomo claro", precio: 7.99, img: "./catalogo/imagescatalogo/producto 3.png" },
        { id: 4, nombre: "Buzo cuello alto Ratón", precio: 7.99, img: "./catalogo/imagescatalogo/producto 4.png" },
        { id: 5, nombre: "Buzo cuello alto Rojo", precio: 7.99, img: "./catalogo/imagescatalogo/producto 5.png" },
        { id: 6, nombre: "Buzo cuello V Quirofano jaspe", precio: 7.99, img: "./catalogo/imagescatalogo/producto 6.png" },
        { id: 7, nombre: "Buzo cuello V Ratón", precio: 7.99, img: "./catalogo/imagescatalogo/producto 7.png" },
        { id: 8, nombre: "Buzo cuello V Rojo", precio: 7.99, img: "./catalogo/imagescatalogo/producto 8.png" },
        { id: 9, nombre: "Buzo cuello V Plomo claro", precio: 7.99, img: "./catalogo/imagescatalogo/producto 9.png" },
        { id: 10, nombre: "Buzo cuello V Azul marino", precio: 7.99, img: "./catalogo/imagescatalogo/producto 10.png" },
        { id: 11, nombre: "Buzo cuello alto Negro", precio: 7.99, img: "./catalogo/imagescatalogo/producto 11.png" },
        { id: 12, nombre: "Buzo cuello alto Verde oliva", precio: 7.99, img: "./catalogo/imagescatalogo/producto 12.png" },
        { id: 13, nombre: "Buzo cuello alto Vino", precio: 7.99, img: "./catalogo/imagescatalogo/producto 13.png" },
        { id: 14, nombre: "Buzo cuello alto Azul marino", precio: 7.99, img: "./catalogo/imagescatalogo/producto 14.png" },
        { id: 15, nombre: "Buzo cuello V Vino", precio: 7.99, img: "./catalogo/imagescatalogo/producto 15.png" },
        { id: 16, nombre: "Buzo cuello V Verde botella", precio: 7.99, img: "./catalogo/imagescatalogo/producto 16.png" },
        { id: 17, nombre: "Buzo cuello V Azul eléctrico", precio: 7.99, img: "./catalogo/imagescatalogo/producto 17.png" },
        { id: 18, nombre: "Buzo cuello V Mostaza", precio: 7.99, img: "./catalogo/imagescatalogo/producto 18.png" },
        { id: 19, nombre: "Buzo cuello V Negro", precio: 7.99, img: "./catalogo/imagescatalogo/producto 19.png" }
    ];

    const productosContainer = document.querySelector(".productos-container");
    const carritoLista = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("total");
    const carrito = document.querySelector(".carrito");
    const modalNombre = document.getElementById("modal-nombre");
    const modal = document.getElementById("modal");
    const nombreUsuarioInput = document.getElementById("nombre-usuario");
    const btnEnviarComprobanteModal = document.getElementById("btn-enviar-comprobante-modal");
    const modalCerrarBtn = document.getElementById("cerrar-modal");
    const btnCerrarModalNombre = document.getElementById("cerrar-modal-nombre");
    const btnVaciarCarrito = document.getElementById("vaciar-carrito");
    const btnCerrarCarrito = document.getElementById("cerrar-carrito");
    const btnAbrirCarrito = document.getElementById("abrir-carrito");  
    let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];

    function cargarProductos() {
        productosContainer.innerHTML = '';
        productos.forEach((producto) => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            divProducto.dataset.id = producto.id;

            divProducto.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <select class="talla-select">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <input type="number" class="cantidad-select" min="1" value="1">
                <button class="btn-agregar">Agregar al carrito</button>
            `;
            productosContainer.appendChild(divProducto);
        });

        document.querySelectorAll(".btn-agregar").forEach(boton => {
            boton.addEventListener("click", (event) => {
                const productoDiv = event.target.closest(".producto");
                const nombre = productoDiv.querySelector("h3").textContent;
                const precio = parseFloat(productoDiv.querySelector("p").textContent.replace('$', ''));
                const talla = productoDiv.querySelector(".talla-select").value;
                const cantidad = parseInt(productoDiv.querySelector(".cantidad-select").value);

                carritoArray.push({ nombre, precio, talla, cantidad });
                localStorage.setItem("carrito", JSON.stringify(carritoArray));
                actualizarCarrito();

                carrito.style.display = "block"; 
            });
        });
    }

    function actualizarCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;

        carritoArray.forEach((item, index) => {
            total += item.precio * item.cantidad;
            const li = document.createElement("li");
            li.innerHTML = `${item.nombre} (${item.talla}) - $${(item.precio * item.cantidad).toFixed(2)} 
                <button class="btn-eliminar" data-index="${index}">X</button>`;
            carritoLista.appendChild(li);
        });

        totalTexto.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll(".btn-eliminar").forEach(boton => {
            boton.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                carritoArray.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carritoArray));
                actualizarCarrito();
            });
        });
    }

    document.getElementById("comprar-carrito").addEventListener("click", () => {
        if (carritoArray.length > 0) {
            modalNombre.style.display = "block"; 
        } else {
            alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        }
    });

    btnEnviarComprobanteModal.addEventListener("click", () => {
        const nombreUsuario = nombreUsuarioInput.value.trim();
        const archivoInput = document.getElementById("comprobante-imagen");

        if (!nombreUsuario) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (archivoInput && archivoInput.files.length > 0) {
            const comprobanteArchivo = archivoInput.files[0];

            const formData = new FormData();
            formData.append("nombreUsuario", nombreUsuario);
            formData.append("carrito", JSON.stringify(carritoArray));
            formData.append("comprobante", comprobanteArchivo);

            fetch("http://localhost:3000/confirmar-compra", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Comprobante enviado para ${nombreUsuario}. ¡Gracias por tu compra!`);
                    modal.style.display = "block"; 
                    modalNombre.style.display = "none"; 
                } else {
                    alert("Hubo un error al procesar tu compra.");
                }
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
                alert("Hubo un error al enviar la solicitud.");
            });

        } else {
            alert("Por favor, sube un comprobante.");
        }
    });

    btnCerrarModalNombre.addEventListener("click", () => {
        modalNombre.style.display = "none";
    });

    modalCerrarBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    btnCerrarCarrito.addEventListener("click", () => {
        carrito.style.display = "none";
    });

    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener("click", () => {
            if (carritoArray.length > 0) {
                if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
                    vaciarCarrito();
                }
            } else {
                alert("El carrito ya está vacío.");
            }
        });
    }

    function vaciarCarrito() {
        carritoArray = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
        alert("El carrito ha sido vaciado.");
    }

    if (btnAbrirCarrito) {  // Función para abrir el carrito
        btnAbrirCarrito.addEventListener("click", () => {
            carrito.style.display = "block";  // Mostrar el carrito
        });
    }

    cargarProductos();
    actualizarCarrito();
});
