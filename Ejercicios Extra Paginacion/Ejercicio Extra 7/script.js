const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const botones = document.getElementById('botones');

fetch('https://api.pokemontcg.io/v2/cards')
    .then(response => response.json())
    .then(data => {
        const paginaPokemones = data.data;
        const lista = document.getElementById('lista');
        const pokemonesPorPagina = 8;
        const numeroPaginas = Math.ceil(paginaPokemones.length / pokemonesPorPagina);

        let pagina = 1;
        function mostrarPokemones(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * pokemonesPorPagina;
            const indiceFinal = indiceInicial + pokemonesPorPagina;

            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaPokemones[i]) {
                    const pokemon = paginaPokemones[i];
                    const elemento = document.createElement('img');
                    elemento.src = pokemon.images.small;
                    elemento.style.margin = '20px';
                    elemento.style.boxShadow = '10px 10px 10px black';
                    elemento.style.height = '200px';
                    elemento.style.width = '120px';
                    lista.appendChild(elemento);
                    lista.style.textAlign = 'center';
                }
            }

            const numero = document.createElement('p');
            numero.textContent = `Página ${pagina} de ${numeroPaginas}`;
            lista.appendChild(numero);
        }

        mostrarPokemones(1);

        botones.style.textAlign = 'center';


        anterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina--;
                mostrarPokemones(pagina);
            }
        });

        siguiente.addEventListener('click', () => {
            if (pagina < numeroPaginas) {
                pagina++;
                mostrarPokemones(pagina);
            }
        });
    })
    .catch(error => {
        console.error(error);
    });
