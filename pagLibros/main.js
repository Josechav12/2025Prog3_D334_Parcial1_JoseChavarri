const librosTienda = [
    {id:10000, nombre:"alicia en el pais de las maravillas", precio: 150, ruta_img: "https://imgs.search.brave.com/ZLVczFBH1yNSnL-_yP5zkCu7wRDtDS-Z3VmAT7p24tg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY1NDQzNi1NTEE3/NTIyNDE1NzQzNV8w/MzIwMjQtVi53ZWJw"},
    {nombre:"moby dick", precio: 350, ruta_img: "https://imgs.search.brave.com/jIEQw2oGsnfX_iiImOSAa9EYhueuR7vbQw4HCw_CMXQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk1NjI1MC1NTEE1/MzYxMzcxMjgyNV8w/MjIwMjMtVi53ZWJw", id: 2},
    {id:32, nombre:"caperucita roja", precio: 250, ruta_img: "https://imgs.search.brave.com/VOkLNKd2xCuor5CVDISOTaUNyFT6U1iJSVR0Agc-a-I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzc0NDcyOC1NTFU3/ODk3MTU2Nzc4OF8w/OTIwMjQtVi53ZWJw"
    },
    {id:40, nombre:"las viudas de los jueves", precio: 50, ruta_img: "https://imgs.search.brave.com/O_4jd4_XejpgDG9R2mQ-9mSFD_PNIXovVaMtH3ESJ98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxQnJNN1crTmZT/LmpwZw"
    },
    {id:5, nombre:"donde esta wally", precio: 500, ruta_img: "https://imgs.search.brave.com/2-aozIkAbZcynyV6BPZnv5JmtaqvVg64rYCbZWWzZD0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg5MTE4OC1NTFU3/MjU5MTQ4MjE2NV8x/MDIwMjMtVi53ZWJw"
    },
    {id:6, nombre:"el señor de los anillos", precio: 980, ruta_img: "https://imgs.search.brave.com/CPwl2Vs-nbmNobq4hCAVQZp4UpUf2A1KXr6EN6FCH64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY4ODE4OC1NTE01/MjM1MTMzMjM1OF8x/MTIwMjItVi53ZWJw"
    }
];



/*---------------------
VARIABLES DEL DOM
-----------------------*/
let carrito = [];
let htmlCarrito = "";

/*---------------------
VARIABLES DEL DOM
-----------------------*/
const barraBusqueda = document.getElementById("barra-busqueda");

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

/*---------------------
ESCUCHADORES DE EVENTOS
-----------------------*/
/*input se puede utilizar si nos interesa que se detecte un cambio
de pegar texto con el mouse sin utilizar el teclado
*/
barraBusqueda.addEventListener("input", filtrarProducto)


function mostrarLista(array)
{
    let htmlProductos = "";
    array.forEach(libro=>{ 
        htmlProductos += `
        <div class="card-producto">
            <img src="${libro.ruta_img}" alt="${libro.nombre}">
            <h3>${libro.nombre}</h3>
            <p>${libro.precio}$</p>
            <button onclick="agregarACarrito(${libro.id})">Agregar al carrito</button>
        </div>
        `
    })
    contenedorProductos.innerHTML = htmlProductos;
}



function filtrarProducto()
{
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    /* Las arrows functions de una sola línea no llevan llaves y el return está implícito*/
    // let productosFiltrados = librosTienda.filter(libro => libro.nombre.toLowerCase().includes(valorBusqueda))
    // let productosFiltrados = librosTienda.filter(libro => {
    //     return libro.nombre.toLowerCase().includes(valorBusqueda)

    let productosFiltrados = librosTienda.filter(libro => {
        return libro.nombre.toLowerCase().includes(valorBusqueda)
    })

    /* Lógica para en vez de filtrar los libros, cambiar el orden 

    / let productosNoIncluidos = librosTienda.filter(libro => {
    /     return !libro.nombre.toLowerCase().includes(valorBusqueda)
    / })
    / productosNoIncluidos.forEach(element => {
    /     productosFiltrados.push(element)
    
    / });
    */


    mostrarLista(productosFiltrados);
    console.log(barraBusqueda) 
    console.log(valorBusqueda) 
    console.log(productosFiltrados) 
}

function agregarACarrito(idLibro){

    console.log("Agregado al carrito: " + idLibro);
    // alert(`Este libro tiene el id ${idLibro}`)
    carrito.push(librosTienda.find(libro => libro.id == idLibro));
    mostrarCarrito();

    //guardar estos cambios en LS
    actualizarCarrito();
}


function mostrarCarrito(){
    
    htmlCarrito = "<ul>";
        carrito.forEach( (libro, index) => {
        htmlCarrito += 
        `
        <li class="bloque-item">
        <p class="nombre-item">${libro.nombre} - ${libro.precio}</p>
        <button class="boton-eliminar" onclick="eliminarDelCarrito1(${index})">Eliminar por indice</button>
        </li>   
        `;
//<button class="boton-eliminar" onclick="eliminarDelCarrito2(${libro.id})">Eliminar por id</button>
    })
    htmlCarrito += 
    `
        </ul>
        <div> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>
    `;

    console.log("Carrito quedó:");
    console.log(carrito);
    console.log("-----");
    contenedorCarrito.innerHTML = htmlCarrito;
}



// Eliminamos por indice
function eliminarDelCarrito1(indiceDelObj)
{
    console.log("Se elimina por indice");
    console.log(indiceDelObj);
    carrito.splice(indiceDelObj, 1);
    mostrarCarrito();

    actualizarCarrito();
}

// Eliminamos todos los que tengan x id
// function eliminarDelCarrito2(idDelObj)
// {
//     console.log("Se elimina por id");
//     console.log(idDelObj);
//     carrito = carrito.filter(libro => libro.id != idDelObj);
//     mostrarCarrito();
// }

function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();

    vaciarCarritoLocalStorage();
}

function cargarCarrito(params) 
{
    console.log("Cargando carrito desde el local storage al JS");
    let textoCarritoLeido = localStorage.getItem("carrito");

    if (!textoCarritoLeido)
    {
        mostrarCarrito();
    }
    else
    {
        console.log("SE INTENTA PARSEAR EL CARRITO");
        carrito = JSON.parse(textoCarritoLeido);
        mostrarCarrito();
    }
}

function actualizarCarrito() 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarritoLocalStorage() 
{
    localStorage.removeItem("carrito");
}

function init (){
    mostrarLista(librosTienda);
    mostrarCarrito();

    cargarCarrito();
}

init()

/*CONSIGNA
- pensar como eliminar elementos del carrito de manera individual,
considerando que puede haber muchos productos con el mismo ID en el carrito */