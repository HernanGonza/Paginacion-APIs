const numero = document.getElementById('numero');

fetch('https://api.publicapis.org/entries')
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('lista');
        const apisPorPagina = 25;
        const numeroApis = data.count;
        const numeroPaginas = Math.ceil(numeroApis / apisPorPagina);

        function mostrarApis(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * apisPorPagina;
            const indiceFinal = indiceInicial + apisPorPagina;

            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (data.entries[i]) {
                    const api = data.entries[i];
                    const div = document.createElement('div');
                    div.style = 'border: 1px solid black; margin: 5px; padding: 5px; border-radius: 5px; box-shadow: 5px 5px 5px black; width: 200px; background-color: yellow;';
                    const nombre = document.createElement('h3');
                    nombre.textContent = 'Nombre de la API: ' + api.API;
                    div.appendChild(nombre);
                    const link = document.createElement('a');
                    link.href = api.Link;
                    link.textContent = 'Link de la API';
                    div.appendChild(link);
                    lista.appendChild(div);
                }
            }

            const numero = document.createElement('p');
            numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`;
            lista.appendChild(numero);
        }

        mostrarApis(1);

        const paginacionContainer = document.createElement('div');
        for (let i = 1; i <= numeroPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.addEventListener('click', () => mostrarApis(i));
            paginacionContainer.appendChild(boton);
        }
        numero.appendChild(paginacionContainer);
    })
    .catch(error => {
        console.log(error);
    });