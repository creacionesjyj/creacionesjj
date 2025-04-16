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
    const emailUsuarioInput = document.getElementById("email-usuario");
    const archivoInput = document.getElementById("comprobante-imagen");
    const comprobanteNombre = document.getElementById("comprobante-nombre");
    const formComprobante = document.getElementById("form-comprobante");
    const inputCarritoDatos = document.getElementById("carrito-datos");

    const btnVaciarCarrito = document.getElementById("vaciar-carrito");
    const btnCerrarCarrito = document.getElementById("cerrar-carrito");
    const btnAbrirCarrito = document.getElementById("abrir-carrito");
    const btnCerrarModalNombre = document.getElementById("cerrar-modal-nombre");
    const btnCerrarModalGracias = document.getElementById("cerrar-modal");
    const btnComprar = document.getElementById("comprar-carrito");

    let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];

    function cargarProductos() {
        productosContainer.innerHTML = '';
        productos.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
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
            productosContainer.appendChild(div);
        });

        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const div = e.target.closest(".producto");
                const nombre = div.querySelector("h3").textContent;
                const precio = parseFloat(div.querySelector("p").textContent.replace("$", ""));
                const talla = div.querySelector(".talla-select").value;
                const cantidad = parseInt(div.querySelector(".cantidad-select").value);

                const existe = carritoArray.find(p => p.nombre === nombre && p.talla === talla);
                if (existe) {
                    existe.cantidad += cantidad;
                } else {
                    carritoArray.push({ nombre, precio, talla, cantidad });
                }

                actualizarCarrito();
                carrito.style.display = "block";
            });
        });
    }

    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        carritoArray.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.nombre} - Talla: ${p.talla} - Cantidad: ${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}`;
            carritoLista.appendChild(li);
            total += p.precio * p.cantidad;
        });

        totalTexto.textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem("carrito", JSON.stringify(carritoArray));
    }

    btnComprar.addEventListener("click", () => {
        if (carritoArray.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        inputCarritoDatos.value = JSON.stringify(carritoArray, null, 2);
        modalNombre.style.display = "block";
    });

    archivoInput.addEventListener("change", (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            comprobanteNombre.textContent = `Comprobante seleccionado: ${archivo.name}`;
        }
    });

    btnVaciarCarrito.addEventListener("click", () => {
        carritoArray = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });

    btnAbrirCarrito.addEventListener("click", () => carrito.style.display = "block");
    btnCerrarCarrito.addEventListener("click", () => carrito.style.display = "none");
    btnCerrarModalNombre.addEventListener("click", () => modalNombre.style.display = "none");
    btnCerrarModalGracias.addEventListener("click", () => modal.style.display = "none");

    formComprobante.addEventListener("submit", (e) => {
        // NO hacemos preventDefault para que FormSubmit funcione
        // Pero mostramos el modal antes de que redireccione si lo deseas
        modalNombre.style.display = "none";
        modal.style.display = "block";
    });

    cargarProductos();
    actualizarCarrito();
});
