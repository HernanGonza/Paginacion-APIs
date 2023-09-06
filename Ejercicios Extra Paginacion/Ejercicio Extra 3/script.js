const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const botones = document.getElementById('botones');


fetch('https://api.openbrewerydb.org/breweries')
    .then(response => response.json())
    .then(paginaCervecerias => {
        const lista = document.getElementById('lista');
        const cerveceriasPorPagina = 15;
        const numeroPaginas = Math.ceil(paginaCervecerias.length / cerveceriasPorPagina);

        let pagina = 1
        function mostrarCervecerias(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * cerveceriasPorPagina;
            const indiceFinal = indiceInicial + cerveceriasPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaCervecerias[i]) {
                    const cerveceria = paginaCervecerias[i];
                    const elemento = document.createElement('li');
                    elemento.textContent = cerveceria.name;
                    lista.appendChild(elemento);
                    lista.style.textAlign = 'center';
                    lista.style.margin = '0 auto';
                    lista.style.marginTop = '100px';
                    lista.style.border = '1px solid black';
                    lista.style.borderRadius = '20px';
                    lista.style.width = '500px';
                }
            }
            const numero = document.createElement('p');
        numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
        lista.appendChild(numero);
        }

        
        botones.style.textAlign = 'center';
        mostrarCervecerias(1);

        anterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina--;
                mostrarCervecerias(pagina);
            }
        });

        siguiente.addEventListener('click', () => {
            if (pagina < numeroPaginas) {
                pagina++;
                mostrarCervecerias(pagina);

            }


        });
    })
    .catch(error => {
        console.error(error);
    });


