const numero = document.getElementById('numero');

fetch('https://api.thedogapi.com/v1/breeds')
    .then(response => response.json())
    .then(paginaRazas => {
        const lista = document.getElementById('lista');
        const razasPorPagina = 5;
        const numeroPaginas = Math.ceil(paginaRazas.length / razasPorPagina);

        let pagina = 1
        function mostrarRazas(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * razasPorPagina;
            const indiceFinal = indiceInicial + razasPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaRazas[i]) {
                    const raza = paginaRazas[i];
                    const elemento = document.createElement('li');
                    elemento.textContent = raza.name;
                    elemento.style.margin = '40px';
                    lista.appendChild(elemento);
                    lista.style.textAlign = 'center';
                    lista.style.margin = '0 auto';
                    lista.style.marginTop = '100px';
                    lista.style.marginBottom = '100px';
                    lista.style.border = '1px solid black';
                    lista.style.width = '300px';
                    
                }
            }
            const numero = document.createElement('p');
            numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
            lista.appendChild(numero);
        }


        numero.style.textAlign = 'center';
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



