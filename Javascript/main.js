function convertir() {
    // obtiene el valor de las pulgadas desde el input
    const pulgadas = document.getElementById('pulgadas').value;

    // esto verifica si el valor ingresado es un número para el resultado
    if (isNaN(pulgadas) || pulgadas < 0) {
        document.getElementById('resultado').textContent = 'por favor, ingresar un valor válido en números positivos.';
        return;
    }

    // convierte las pulgadas a centimetros  es decir que 1 pulgada = 2.54 cm
    const centimetros = pulgadas * 2.54;

    // muestra el resultado 
    document.getElementById('resultado').textContent = `${pulgadas} pulgadas son ${centimetros.toFixed(2)} centímetros.`;
}
