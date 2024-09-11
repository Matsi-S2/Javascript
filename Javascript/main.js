
const listaElementos = [];

function agregarElemento() {
    // Captura el valor del input
    const inputElemento = document.getElementById("inputElemento");
    const nuevoElemento = inputElemento.value.trim();
    
    // Verifica si se introdujo algún valor
    if (nuevoElemento !== "") {
        // Agrega el nuevo elemento al array
        listaElementos.push(nuevoElemento);
        
        
        inputElemento.value = "";
        
        // Actualiza la visualización de la lista en la página
        actualizarLista();
    } else {
        alert("No se introdujo un valor válido.");
    }
}

// Función para eliminar un elemento de la lista
function eliminarElemento() {
    
    const elementoAEliminar = prompt("Introduce el elemento que deseas eliminar:");
    
    
    if (elementoAEliminar !== null) {
        const elementoAEliminarTrimmed = elementoAEliminar.trim();
        
        // Busca el índice del elemento en la lista
        const indice = listaElementos.indexOf(elementoAEliminarTrimmed);
        
        // Verifica si el elemento se encuentra en la lista
        if (indice !== -1) {
            // Elimina el elemento del array
            listaElementos.splice(indice, 1);
            
            // Actualiza la visualización de la lista en la página
            actualizarLista();
        } else {
            alert("El elemento no se encontró en la lista.");
        }
    } else {
        alert("No se introdujo un valor válido.");
    }
}

a
function actualizarLista() {
    
    const listaUl = document.getElementById("lista");
    
    
    listaUl.innerHTML = "";
    
    
    listaElementos.forEach(elemento => {
        const li = document.createElement("li");
        li.textContent = elemento;
        listaUl.appendChild(li);
    });
}
