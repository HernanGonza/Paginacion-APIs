const numero = document.getElementById('numero');

fetch('https://api.thecatapi.com/v1/images/search?limit=6')
    .then(response => response.json())
    .then(paginaRazas => {
        const lista = document.getElementById('lista');
        const razasPorPagina = 6;
        const numeroPaginas = Math.ceil(paginaRazas.length / razasPorPagina);

        let pagina = 1
        function mostrarRazas(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * razasPorPagina;
            const indiceFinal = indiceInicial + razasPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaRazas[i]) {
                    const raza = paginaRazas[i];
                    const imagen = document.createElement('img');
                    imagen.src = raza.url;
                    imagen.style.width = '200px';
                    imagen.style.height = '200px';
                    imagen.style.margin = '5px';
                    imagen.style.boxShadow = '5px 5px 5px black';
                    lista.appendChild(imagen);
                }
            }
            const numero = document.createElement('p');
            numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
            lista.appendChild(numero);
        }



        mostrarRazas(1);

        const paginacionContainer = document.createElement('div');
        for (let i = 1; i <= numeroPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.addEventListener('click', () => mostrarRazas(i));
            paginacionContainer.appendChild(boton);
        }
        numero.appendChild(paginacionContainer);


    })
    .catch(error => {
        console.log(error);
    });



