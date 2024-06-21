const productos = [
    {
        id: "gaseosas-01",
        titulo: "Coca-Cola",
        imagen: "./img/coca-cola.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "gaseosas-02",
        titulo: "Fanta",
        imagen: "./img/fanta.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "gaseosas-03",
        titulo: "Sprite",
        imagen: "./img/sprite.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "jugos-01",
        titulo: "Jugo de Naranja",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "jugos-02",
        titulo: "Jugo de Manzana",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "jugos-03",
        titulo: "Jugo de Pomelo",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "aguas-01",
        titulo: "Agua chica",
        imagen: "./img/agua1.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 900
    },
    {
        id: "aguas-02",
        titulo: "Agua grande",
        imagen: "./img/agua2.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 1800
    },
    {
        id: "aguas-03",
        titulo: "bidon",
        imagen: "./img/agua3.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 2700
    },
    {
        id: "vinos-01",
        titulo: "Vino Tinto",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 6000
    },
    {
        id: "vinos-02",
        titulo: "Vino Blanco",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 5000
    },
    {
        id: "vinos-03",
        titulo: "Vino Rosado",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 5500
    },
    {
        id: "cervezas-01",
        titulo: "Cerveza Rubia",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 3500
    },
    {
        id: "cervezas-02",
        titulo: "Cerveza Negra",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 3500
    },
    {
        id: "cervezas-03",
        titulo: "Cerveza Artesanal",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 4000
    },
    
];




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {


        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else {
            tituloPrincipal.innerText = "ELIJE TU BEBIDA";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        
    });
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

async function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    
    await new Promise(resolve => setTimeout(resolve, 500));

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: `¡${productoAgregado.titulo} se ha agregado al carrito!`,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));




function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

const modoOscuroBtn = document.getElementById('modo-oscuro-btn');
const wrapper = document.querySelector(".wrapper");
const main = document.querySelector("main");

modoOscuroBtn.addEventListener('click', () => {
    wrapper.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    modoOscuroBtn.classList.toggle('dark-mode');
    
    if (wrapper.classList.contains('dark-mode')) {
        modoOscuroBtn.textContent = 'Desactivar Modo Oscuro';
    } else {
        modoOscuroBtn.textContent = 'Activar Modo Oscuro';
    }
});

const contenedorSucursales = document.getElementById('contenedor-sucursales');

const cargarSucursales = async () => {
    try {
        const response = await fetch('./js/sucursales.json'); 
        if (!response.ok) {
            throw new Error('Error al cargar las sucursales');
        }
        const sucursales = await response.json();
        mostrarSucursales(sucursales);
    } catch (error) {
        console.error('Error al cargar las sucursales:', error);
    }
};

const mostrarSucursales = (sucursales) => {
    sucursales.forEach(sucursal => {
        const div = document.createElement('div');
        div.classList.add('sucursal');
        div.innerHTML = `
            <div class="sucursal-detalles">
                <h3 class="sucursal-nombre">${sucursal.nombre}</h3>
                <p class="sucursal-direccion">${sucursal.direccion}</p>
                <p class="sucursal-horarios">${sucursal.horarios}</p>
            </div>
        `;
        contenedorSucursales.appendChild(div);
    });
};

cargarSucursales();

