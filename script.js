// Variable para contar cuántas veces han intentado huir
let contadorIntentos = 0;

// Lista de tus archivos locales. 
// NOTA: Asegúrate de que los nombres aquí coincidan EXACTAMENTE con tus archivos.
// Si alguna es .png o .gif, cámbialo aquí.
const listaGatos = [
    'img/img1.jpg',  
    'img/img2.jpg',  
    'img/img3.jpg',
    'img/img4.jpeg',   
    'img/img5.jpeg',
    'img/img6.jpg',
    'img/img7.jpeg',
    'img/img8.jpg',
    'img/img9.jpg',
    'img/img10.jpeg'
];
function moverBoton() {
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    const anchoBoton = 100;
    const altoBoton = 50;
    const margen = 50;

    // --- SOLUCIÓN AL BOTÓN QUE DESAPARECE ---
    // Calculamos el límite real para que nunca se salga
    const limiteX = anchoVentana - anchoBoton - margen;
    const limiteY = altoVentana - altoBoton - margen;

    // Math.max(0, ...) asegura que si la pantalla es muy pequeña, no dé números negativos
    const nuevoX = Math.max(margen, Math.random() * limiteX);
    const nuevoY = Math.max(margen, Math.random() * limiteY);

    const btnNo = document.getElementById('btnNo');
    btnNo.style.left = nuevoX + 'px';
    btnNo.style.top = nuevoY + 'px';

    // --- SOLUCIÓN AL CONTADOR ---
    
    // Si todavía estamos dentro del rango de imágenes (0 a 9)
    if (contadorIntentos < listaGatos.length) {
        mostrarGatoLocal(listaGatos[contadorIntentos]);
    } else {
        // Si se pasan de 10, seguimos mostrando el último gato (índice 9)
        mostrarGatoLocal(listaGatos[listaGatos.length - 1]);
    }

    // Hacemos crecer el botón
    // Multiplicamos por 3, PERO le ponemos un límite (Math.min) 
    // para que no crezca tanto que tape la pantalla completa y no deje dar click.
    // Aquí el tope es escala 15.
    let escala = 1 + (contadorIntentos * 1);
    escala = Math.min(escala, 15); 

    const btnSi = document.getElementById('btnSi');
    btnSi.style.transform = `scale(${escala})`;

    // Aumentamos el contador
    contadorIntentos++;
}

function mostrarGatoLocal(rutaImagen) {
    const contenedor = document.getElementById('contenedor-gatos');
    const nuevaImagen = document.createElement('img');
    
    // Usamos la ruta local que le pasamos
    nuevaImagen.src = rutaImagen;
    
    nuevaImagen.classList.add('gato-triste');
    
    // Posición aleatoria
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    nuevaImagen.style.left = Math.random() * (ancho - 150) + 'px';
    nuevaImagen.style.top = Math.random() * (alto - 150) + 'px';

    contenedor.appendChild(nuevaImagen);

    // Desaparecer después de 2 segundos
    setTimeout(() => {
        nuevaImagen.style.opacity = 0;
        setTimeout(() => nuevaImagen.remove(), 500); 
    }, 2000);
}

function aceptar() {
    // 1. Cambios básicos de fondo y botones (Igual que antes)
    document.body.classList.add('fondo-celebracion');
    document.getElementById('grupoBotones').style.display = 'none';
    
    // 2. Limpiar gatos tristes si hubiera alguno en pantalla
    document.getElementById('contenedor-gatos').innerHTML = '';

    // 3. Configurar el título central
    const titulo = document.getElementById('titulo');
    titulo.innerText = "¡SIIII! Sabía que dirías que sí chiqui :)";
    // Ajustamos el tamaño y la posición para darle espacio a las fotos
    titulo.style.fontSize = "3.5rem"; 
    titulo.style.margin = "20px 0";
    titulo.style.position = "relative";
    titulo.style.zIndex = "3000"; // Aseguramos que el texto esté encima

    // --- NUEVA PARTE: INYECTAR IMÁGENES ---

    // Definimos el HTML para la fila de ARRIBA (imágenes 1 y 2)
    // NOTA: Verifica que los nombres de archivo coincidan con los tuyos en la carpeta img/
    const htmlFilaArriba = `
        <div class="fila-imagenes-final">
            <img src="img/final1.jpg" class="img-celebracion" style="animation-delay: 0.1s">
            <img src="img/final2.jpeg" class="img-celebracion" style="animation-delay: 0.3s">
        </div>
    `;

    // Definimos el HTML para la fila de ABAJO (imágenes 3 y 4)
    const htmlFilaAbajo = `
        <div class="fila-imagenes-final">
            <img src="img/final3.jpeg" class="img-celebracion" style="animation-delay: 0.5s">
            <img src="img/final4.jpeg" class="img-celebracion" style="animation-delay: 0.7s">
        </div>
    `;

    // Usamos insertAdjacentHTML para colocar las filas respecto al título 'h1'
    
    // 'beforebegin': Inserta el HTML justo ANTES de que empiece la etiqueta <h1>
    titulo.insertAdjacentHTML('beforebegin', htmlFilaArriba);

    // 'afterend': Inserta el HTML justo DESPUÉS de que termina la etiqueta </h1>
    titulo.insertAdjacentHTML('afterend', htmlFilaAbajo);
}