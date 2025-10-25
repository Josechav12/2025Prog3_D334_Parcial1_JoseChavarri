// array de objetos con los datos de cada futa, id, nombre, precio, y ruta de imagen
const frutas = [
    {id: 1, nombre: "Anana", precio: 4500, ruta_img: "./img/anana.jpg"},
    {id: 2, nombre: "Arandano", precio: 3800, ruta_img: "./img/arandano.jpg"},
    {id: 3, nombre: "Banana", precio: 2900, ruta_img: "./img/banana.jpg"},
    {id: 4, nombre: "Frambuesa", precio: 1800, ruta_img: "./img/frambuesa.jpg"},
    {id: 5, nombre: "Frutilla", precio: 2550, ruta_img: "./img/frutilla.jpg"},
    {id: 6, nombre: "Kiwi", precio: 3600, ruta_img: "./img/kiwi.jpg"},
    {id: 7, nombre: "Mandarina", precio: 4850, ruta_img: "./img/mandarina.jpg"},
    {id: 8, nombre: "Manzana", precio: 2700, ruta_img: "./img/manzana.jpg"},
    {id: 9, nombre: "Naranja", precio: 3700, ruta_img: "./img/naranja.jpg"},
    {id: 10, nombre: "Pera", precio: 1900, ruta_img: "./img/pera.jpg"},
    {id: 11, nombre: "Pomelo amarillo", precio: 4750, ruta_img: "./img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "Pomelo rojo", precio: 6800, ruta_img: "./img/pomelo-rojo.jpg"},
    {id: 13, nombre: "Sandia", precio: 7000, ruta_img: "./img/sandia.jpg"}
];

//array donde se almacenan los productos del carrito
let carrito = [];

/*---------------------
VARIABLES DEL DOM
-----------------------*/
const barraBusqueda = document.getElementById("barra-busqueda");
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

/*---------------------
ESCUCHADORES
-----------------------*/
// input se puede utilizar si nos interesa que se detecte un cambio
barraBusqueda.addEventListener("input", filtrarFrutas);
// detecta el clik en el boton vaciar carrito
botonVaciarCarrito.addEventListener("click", vaciarCarrito);


// Mostrar lista de frutas:
/*
recibe un array de frutas y las  muestra en el contenedor de productos
actualiza el contador
*/
function mostrarLista(array) {
    let htmlProductos = "";
    array.forEach(fruta => {
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}$</p>
            <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `;
    });
    contenedorProductos.innerHTML = htmlProductos;
    actualizarContadorYTotal();
}

// Filtrar:
/*
toma el valor del inpit de busqueda y filtra eñ arrat de frutas
esgun el nombre, luego muesta el resultado
*/
function filtrarFrutas() {
    const valorBusqueda = barraBusqueda.value.toLowerCase();
    const frutasFiltradas = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(valorBusqueda));
    mostrarLista(frutasFiltradas);
}

// Agregar al carrito:
/*
agrega al carrito por su id, actualiza y vuele a mostrar
 */
function agregarACarrito(idFruta){
    const fruta = frutas.find(f => f.id == idFruta);
    if(fruta) {
        carrito.push(fruta);
        actualizarCarrito();
        mostrarCarrito();
    }
}


// Mostrar carrito:
/*
muestra los productos que estan en el carrito, si esta vacio
muestra un mensaje(El carrito esta vacio)
*/
function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    if(carrito.length === 0){
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }
    const ul = document.createElement("ul");
    carrito.forEach((fruta, index) => {
        const li = document.createElement("li");
        li.classList.add("bloque-item");
        li.innerHTML = `
            <p>${fruta.nombre} - ${fruta.precio}$</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        ul.appendChild(li);
    });
    contenedorCarrito.appendChild(ul);
}


// Eliminar producto del carrito:
/*
elimina un producto del carrito segun su posicion en el array
*/
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    mostrarCarrito();
}


// Vaciar carrito:
/*
vacia completamente el carrito
*/
function vaciarCarrito(){
    carrito = [];
    actualizarCarrito();
    mostrarCarrito();
}


// LocalStorage:
/*
carga el carrito desde el local storage al iniciar la pag
si hay datos, los parsea y muestra
*/
function actualizarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito(){
    const data = localStorage.getItem("carrito");
    if(data){
        carrito = JSON.parse(data);
    }
    mostrarCarrito();

}


// Contador y total del carrito:
/*
actualiza el contrador de productos en el carrito y total acumulado
*/
function actualizarContadorYTotal() {
    const contador = document.getElementById("contador-carrito");
    const total = document.getElementById("total-carrito");

    contador.textContent = `Carrito: ${carrito.length} productos`;

    const suma = carrito.reduce((acc, item) => acc + item.precio, 0);
    total.textContent = `Total: $${suma}`;
}


// Ordenar frutas por nombre
/*
ordena el array de frutas por nombre y llama a mostrarLista
*/
function ordenarPorNombre() {
    const copia = [...frutas].sort((a,b) => a.nombre.localeCompare(b.nombre));
    mostrarLista(copia);
}


// Ordenar frutas por precio
/*
ordena el array de frutas por precio de menor a mayor
*/
function ordenarPorPrecio() {
    const copia = [...frutas].sort((a,b) => a.precio - b.precio);
    mostrarLista(copia);
}


// Inicializar:
/*
ejecuta al cargar la pagina
muestra la lista de frutas, carga el carrito desde el localStorage
actualiza el contador y total, y agrega los eventos de ordenamiento
*/
function init(){
    mostrarLista(frutas);
    cargarCarrito();
    actualizarContadorYTotal();

    document.getElementById("ordenar-nombre").addEventListener("click", ordenarPorNombre);
    document.getElementById("ordenar-precio").addEventListener("click", ordenarPorPrecio);
}

init();
