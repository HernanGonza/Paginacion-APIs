const numero = document.getElementById('numero');


fetch('https://api.spacexdata.com/v4/launches')
    .then(response => response.json())
    .then(paginaLanzamientos => {
        const lista = document.getElementById('lista');
        const lanzamientosPorPagina = 3;
        const numeroPaginas = Math.ceil(paginaLanzamientos.length / lanzamientosPorPagina);

        
        function mostrarLanzamientos(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * lanzamientosPorPagina;
            const indiceFinal = indiceInicial + lanzamientosPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaLanzamientos[i]) {
                    const lanzamiento = paginaLanzamientos[i];
                    const div = document.createElement('div');
                    const elemento = document.createElement('p');
                    elemento.textContent = 'Nombre: ' + lanzamiento.name;
                    const elemento2 = document.createElement('p');
                    elemento2.textContent = 'Numero de vuelo: ' + lanzamiento.flight_number;
                    const imagen = document.createElement('img');
                    imagen.src = lanzamiento.links.patch.small;
                    div.style.margin = '0 auto';
                    div.style.boxShadow = '5px 5px 5px black';
                    div.style.width = '300px';
                    div.style.marginTop = '20px';
                    div.style.textAlign = 'center';
                    div.style.border = '1px solid black';
                    div.style.borderRadius = '20px';
                    div.appendChild(elemento);
                    div.appendChild(elemento2);
                    div.appendChild(imagen);
                    lista.appendChild(div);
                }
            }
            const numero = document.createElement('p');
            numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
            lista.appendChild(numero);
            
        }


        numero.style.textAlign = 'center';
        lista.style.textAlign = 'center';
        
        mostrarLanzamientos(1);

        const paginacionContainer = document.createElement('div');
        for (let i = 1; i <= numeroPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.addEventListener('click', () => mostrarLanzamientos(i));
            paginacionContainer.appendChild(boton);
        }
        numero.appendChild(paginacionContainer);


    })
    .catch(error => {
        console.log(error);
    });



