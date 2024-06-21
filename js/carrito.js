let productosEnCarrito = [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const modoOscuroBtn = document.getElementById('modo-oscuro-btn');
const wrapper = document.querySelector(".wrapper");
const main = document.querySelector("main");

const cargarProductosAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
};

const cargarProductosCarrito = async () => {
    try {
        await cargarProductosAsync();

        const isEmpty = productosEnCarrito.length === 0;
        contenedorCarritoVacio.classList.toggle("disabled", !isEmpty);
        contenedorCarritoProductos.classList.toggle("disabled", isEmpty);
        contenedorCarritoAcciones.classList.toggle("disabled", isEmpty);
        contenedorCarritoComprado.classList.toggle("disabled", isEmpty);

        if (!isEmpty) {
            const productosHTML = productosEnCarrito.map(producto => `
                <div class="carrito-producto">
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>${producto.cantidad * producto.precio}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                </div>
            `).join("");

            contenedorCarritoProductos.innerHTML = productosHTML;
        }

        actualizarBotonesEliminar();
        actualizarTotal();

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
};

const actualizarBotonesEliminar = () => {
    document.querySelectorAll(".carrito-producto-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
        boton.addEventListener("click", mostrarNotificacionEliminacion);
        
    });
};

const mostrarNotificacionEliminacion = ({ currentTarget }) => {
    const { id } = currentTarget;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === id);
    
    
    const mensaje = productoEliminado ? `${productoEliminado.titulo} ha sido eliminado del carrito` : 'Producto no encontrado';

    console.log(mensaje);
};
const eliminarDelCarrito = (e) => {
    const { id } = e.currentTarget;
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    
    const productoEliminado = productosEnCarrito.find(producto => producto.id === id);
    const mensaje = productoEliminado ? `${productoEliminado.titulo} ha sido eliminado del carrito` : 'Producto eliminado';
    
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom",
        backgroundColor: "#e74c3c",
    }).showToast();
};

const vaciarCarrito = () => {
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    
    Toastify({
        text: "El carrito ha sido vaciado correctamente",
        duration: 3000,
        gravity: "bottom", 
        backgroundColor: "#6ab04c", 
    }).showToast();
};

const actualizarTotal = () => {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
};

const comprarCarrito = () => {
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    const totalCompra = contenedorTotal.innerText;
    const mensajeCompra = `¡Gracias por tu compra! Total pagado: ${totalCompra}`;
    contenedorCarritoComprado.innerText = mensajeCompra;
};

botonVaciar.addEventListener("click", vaciarCarrito);
botonComprar.addEventListener("click", comprarCarrito);

modoOscuroBtn.addEventListener('click', () => {
    wrapper.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    modoOscuroBtn.classList.toggle('dark-mode');
    modoOscuroBtn.textContent = wrapper.classList.contains('dark-mode') ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro';
});

cargarProductosCarrito();

