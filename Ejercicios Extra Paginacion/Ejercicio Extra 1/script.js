const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const botones = document.getElementById('botones');

fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(paginaFotos => {
        const lista = document.getElementById('lista');
        const fotosPorPagina = 20;
        const numeroPaginas = Math.ceil(paginaFotos.length / fotosPorPagina);

        let pagina = 1
        function mostrarFotos(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * fotosPorPagina;
            const indiceFinal = indiceInicial + fotosPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaFotos[i]) {
                    const foto = paginaFotos[i];
                    const elemento = document.createElement('img');
                    elemento.src = foto.thumbnailUrl;
                    elemento.style.width = '50px';
                    elemento.style.height = '50px';
                    elemento.style.margin = '5px';
                    elemento.style.boxShadow = '5px 5px 5px black';
                    lista.appendChild(elemento);
                    lista.style.textAlign = 'center';
                    lista.style.marginTop = '100px';
                }
            }
            const numero = document.createElement('p');
        numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
        lista.appendChild(numero);
        }

        
        botones.style.textAlign = 'center';
        mostrarFotos(1);

        anterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina--;
                mostrarFotos(pagina);
            }
        });

        siguiente.addEventListener('click', () => {
            if (pagina < numeroPaginas) {
                pagina++;
                mostrarFotos(pagina);

            }


        });
    })
    .catch(error => {
        console.error(error);
    });


