//Variables

const carrito = document.querySelector('#carrito'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritoBtn = document.querySelector('#vaciar-carrito'),
      listaCursos = document.querySelector('#lista-cursos');
      let articuloCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el Carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        //console.log("vaciando carrito.");
        articuloCarrito = []; // reseteamos el Carrito

        limpiarHTML(); // Eliminamos todo el html
    });
};

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
    //console.log(e.target.classList);
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        // eliminar del arreglo articuloCarrito por el data-id
        articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoId);
        //console.log(articuloCarrito);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos clic y extrae la informacion del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some ( curso => curso.id === infoCurso.id );
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articuloCarrito.map(curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }            
        });

        articuloCarrito = [...cursos];

    } else {
       // Agregamos el curso al carrito
        //Agrega elementos al arreglo de carrito
        articuloCarrito = [...articuloCarrito, infoCurso];
        //console.log(articuloCarrito);
    }
    //console.log(existe)
    



    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articuloCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `            
            <td> <img src ='${imagen}' width = "100"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}' >X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    //Forma Lenta
    //contenedorCarrito.innerHTML = '';

    //Metodo eficaz
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}