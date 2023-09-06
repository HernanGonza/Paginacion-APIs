
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');


fetch('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    .then(paginaCervezas => {
        const lista = document.getElementById('lista');
        const cervezasPorPagina = 10;
        const numeroPaginas = Math.ceil(paginaCervezas.length / cervezasPorPagina);

        let pagina = 1
        function mostrarCervezas(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * cervezasPorPagina;
            const indiceFinal = indiceInicial + cervezasPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaCervezas[i]) {
                    const cerveza = paginaCervezas[i];
                    const elemento = document.createElement('li');
                    elemento.textContent = cerveza.name;
                    lista.appendChild(elemento);
                }
            }
        }

        mostrarCervezas(1);

        anterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina--;
                mostrarCervezas(pagina);
            }
        });

        siguiente.addEventListener('click', () => {
            if (pagina < numeroPaginas) {
                pagina++;
                mostrarCervezas(pagina);

            }


        });
    })
    .catch(error => {
        console.error(error);
    });


