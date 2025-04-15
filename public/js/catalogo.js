document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { id: 1, nombre: "Buzo cuello alto mostaza", precio: 7.99, img: "./images/producto 1.png" },
        { id: 2, nombre: "Buzo cuello alto Abano", precio: 7.99, img: "./images/producto 2.png" },
        { id: 3, nombre: "Buzo cuello alto Plomo claro", precio: 7.99, img: "./images/producto 3.png" },
        { id: 4, nombre: "Buzo cuello alto Ratón", precio: 7.99, img: "./images/producto 4.png" },
        { id: 5, nombre: "Buzo cuello alto Rojo", precio: 7.99, img: "./images/producto 5.png" },
        { id: 6, nombre: "Buzo cuello V Quirofano jaspe", precio: 7.99, img: "./images/producto 6.png" },
        { id: 7, nombre: "Buzo cuello V Ratón", precio: 7.99, img: "./images/producto 7.png" },
        { id: 8, nombre: "Buzo cuello V Rojo", precio: 7.99, img: "./images/producto 8.png" },
        { id: 9, nombre: "Buzo cuello V Plomo claro", precio: 7.99, img: "./images/producto 9.png" },
        { id: 10, nombre: "Buzo cuello V Azul marino", precio: 7.99, img: "./images/producto 10.png" },
        { id: 11, nombre: "Buzo cuello alto Negro", precio: 7.99, img: "./images/producto 11.png" },
        { id: 12, nombre: "Buzo cuello alto Verde oliva", precio: 7.99, img: "./images/producto 12.png" },
        { id: 13, nombre: "Buzo cuello alto Vino", precio: 7.99, img: "./images/producto 13.png" },
        { id: 14, nombre: "Buzo cuello alto Azul marino", precio: 7.99, img: "./images/producto 14.png" },
        { id: 15, nombre: "Buzo cuello V Vino", precio: 7.99, img: "./images/producto 15.png" },
        { id: 16, nombre: "Buzo cuello V Verde botella", precio: 7.99, img: "./images/producto 16.png" },
        { id: 17, nombre: "Buzo cuello V Azul eléctrico", precio: 7.99, img: "./images/producto 17.png" },
        { id: 18, nombre: "Buzo cuello V Mostaza", precio: 7.99, img: "./images/producto 18.png" },
        { id: 19, nombre: "Buzo cuello V Negro", precio: 7.99, img: "./images/producto 19.png" }
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

    // Cargar los productos en el DOM
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

        // Agregar productos al carrito
        document.querySelectorAll(".btn-agregar").forEach(boton => {
            boton.addEventListener("click", (event) => {
                const productoDiv = event.target.closest(".producto");
                const nombre = productoDiv.querySelector("h3").textContent;
                const precio = parseFloat(productoDiv.querySelector("p").textContent.replace('$', ''));
                const talla = productoDiv.querySelector(".talla-select").value;
                const cantidad = parseInt(productoDiv.querySelector(".cantidad-select").value);

                const productoExistente = carritoArray.find(p => p.nombre === nombre && p.talla === talla);
                if (productoExistente) {
                    productoExistente.cantidad += cantidad; // Aumentar cantidad si ya está en el carrito
                } else {
                    carritoArray.push({ nombre, precio, talla, cantidad });
                }

                actualizarCarrito(); // Ahora actualiza el carrito
                carrito.style.display = "block";
            });
        });
    }

    // Actualizar carrito de compras
    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        carritoArray.forEach((producto) => {
            const li = document.createElement("li");
            li.textContent = `${producto.nombre} - Talla: ${producto.talla} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
            carritoLista.appendChild(li);
            total += producto.precio * producto.cantidad;
        });

        totalTexto.textContent = `Total: $${total.toFixed(2)}`;

        // Guardar el carrito actualizado solo si hubo un cambio
        localStorage.setItem("carrito", JSON.stringify(carritoArray));
    }

    // Mostrar vista previa del comprobante
    const archivoInput = document.getElementById("comprobante-imagen");
    archivoInput.addEventListener("change", (e) => {
        const fileName = e.target.files[0].name;
        document.getElementById("comprobante-nombre").textContent = `Comprobante seleccionado: ${fileName}`;
    });

    // Enviar comprobante
    btnEnviarComprobanteModal.addEventListener("click", () => {
        const nombreUsuario = nombreUsuarioInput.value.trim();

        if (!nombreUsuario) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (archivoInput && archivoInput.files.length > 0) {
            const comprobanteArchivo = archivoInput.files[0];

            // Crear formulario para enviar a FormSubmit
            const form = document.createElement("form");
            form.action = "https://formsubmit.co/el/legaze";  // Asegúrate de que esta URL sea correcta
            form.method = "POST";
            form.enctype = "multipart/form-data";
            form.style.display = "none";

            const inputNombre = document.createElement("input");
            inputNombre.name = "Nombre del usuario";
            inputNombre.value = nombreUsuario;

            const inputCarrito = document.createElement("input");
            inputCarrito.name = "Carrito";
            inputCarrito.value = JSON.stringify(carritoArray, null, 2);

            const inputArchivo = document.createElement("input");
            inputArchivo.type = "file";
            inputArchivo.name = "Comprobante";
            inputArchivo.files = archivoInput.files;

            // Campos ocultos de control
            const inputRedirect = document.createElement("input");
            inputRedirect.type = "hidden";
            inputRedirect.name = "_next";
            inputRedirect.value = window.location.href;

            const inputCaptcha = document.createElement("input");
            inputCaptcha.type = "hidden";
            inputCaptcha.name = "_captcha";
            inputCaptcha.value = "false";

            // Añadir al form
            form.appendChild(inputNombre);
            form.appendChild(inputCarrito);
            form.appendChild(inputArchivo);
            form.appendChild(inputRedirect);
            form.appendChild(inputCaptcha);

            document.body.appendChild(form);

            form.submit(); // Enviar formulario

            alert("Enviando comprobante...");
            modalNombre.style.display = "none";
            modal.style.display = "block"; // Mostrar el modal de gracias
        } else {
            alert("Por favor, sube un comprobante.");
        }
    });

    // Vaciar carrito
    btnVaciarCarrito.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carritoArray = [];
        actualizarCarrito();
    });

    // Cerrar carrito
    btnCerrarCarrito.addEventListener("click", () => {
        carrito.style.display = "none";
    });

    // Abrir carrito
    btnAbrirCarrito.addEventListener("click", () => {
        carrito.style.display = "block";
    });

    cargarProductos();
});
