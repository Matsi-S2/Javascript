let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "celular-01",
        titulo: "Samsung Galaxy A04 64gb 4gb ram",
        precio: 254.999,
        img:"./img/celular1.webp",
    },
    {
        id: "celular-02",
        titulo: "Samsung Galaxy A14(Mediatek) 5G 128gb 4gb ram",
        precio: 387.999,
        img: "./img/celular2.webp",
    },
    {
        id: "celular-03",
        titulo: "Samsung Galaxy A35 5G 128gb 6gb ram",
        precio: 379.999,
        img: "./img/celular3.webp",
    },
    {
        id: "celular-04",
        titulo: "Apple Iphone 15 128gb 6gb ram",
        precio: 991.999,
        img: "./img/celular4.webp",
    },
    {
        id: "celular-05",
        titulo: "Apple Iphone 13 128gb 4gb ram",
        precio: 859.999,
        img: "./img/celular5.jpg",
    },
    {
        id: "celular-06",
        titulo: "Apple Iphone 11 128gb 4gb ram",
        precio: 759.999,
        img: "./img/celular6.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");


const modalConfirmacion = document.querySelector(".modal-confirmacion");
const modalMensaje = modalConfirmacion.querySelector(".modal-mensaje");
const closeConfirmacion = modalConfirmacion.querySelector(".close-confirmacion");

const modalResumen = document.querySelector(".modal-resumen");
const closeResumen = modalResumen.querySelector(".close-resumen");
const resumenDetalles = modalResumen.querySelector(".resumen-detalles");
const resumenTotal = modalResumen.querySelector(".resumen-total");


function mostrarModal(mensaje) {
    modalMensaje.innerText = mensaje;
    modalConfirmacion.classList.remove("d-none");
}


function cerrarModal(modal) {
    modal.classList.add("d-none");
}


function mostrarResumen() {
    resumenDetalles.innerHTML = "";
    carrito.forEach((producto) => {
        resumenDetalles.innerHTML += `
            <p>${producto.titulo} - Cant: ${producto.cantidad} - Subt: $${producto.precio * producto.cantidad}</p>
        `;
    });
    resumenTotal.innerText = `Total: $${carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)}`;
    modalResumen.classList.remove("d-none");
}


closeConfirmacion.addEventListener("click", () => cerrarModal(modalConfirmacion));


closeResumen.addEventListener("click", () => cerrarModal(modalResumen));

async function cargarProductos() {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        mostrarProductos(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function mostrarProductos(productos) {
    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.id = producto.id; // Asegúrate de que 'id' esté en el JSON
        div.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <a href="./producto.html?id=${producto.id}">Ver más</a>
        `;
        contenedorProductos.append(div);
    });
}
cargarProductos();

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src=${producto.img}>
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    div.append(button);
    contenedorProductos.append(div);
});

// Función para actualizar el carrito
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;

            let buttonAumentar = document.createElement("button");
            buttonAumentar.classList.add("carrito-producto-btn");
            buttonAumentar.innerText = "⬆️";
            buttonAumentar.addEventListener("click", () => {
                aumentarCantidad(producto);
            });
            div.append(buttonAumentar);

            let buttonReducir = document.createElement("button");
            buttonReducir.classList.add("carrito-producto-btn");
            buttonReducir.innerText = "⬇️";
            buttonReducir.addEventListener("click", () => {
                reducirCantidad(producto);
            });
            div.append(buttonReducir);

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
    Toastify({
        text: "Artículo agregado",
        duration: 3000, // Duración en milisegundos
        gravity: "top", 
        position: 'right', 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Color de fondo
        stopOnFocus: true 
    }).showToast();
}

// Función para borrar un producto del carrito
function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}


function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    itemEncontrado.cantidad++;
    actualizarCarrito();
}

function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        actualizarCarrito();
    } else {
        borrarDelCarrito(itemEncontrado);
    }
}


const buttonFinalizarCompra = document.createElement("button");
buttonFinalizarCompra.innerText = "Finalizar compra";
buttonFinalizarCompra.classList.add("btn-finalizar");
buttonFinalizarCompra.addEventListener("click", mostrarResumen);
document.querySelector(".carrito-total").appendChild(buttonFinalizarCompra);

actualizarCarrito();
