const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const botones = document.getElementById('botones');
const body = document.getElementsByTagName('body');

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(paginaPosts => {
        const lista = document.getElementById('lista');
        const postsPorPagina = 12;
        const numeroPaginas = Math.ceil(paginaPosts.length / postsPorPagina);

        let pagina = 1
        function mostrarPosts(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * postsPorPagina;
            const indiceFinal = indiceInicial + postsPorPagina;


            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaPosts[i]) {
                    const post = paginaPosts[i];
                    const div = document.createElement('div');
                    const elemento = document.createElement('p');
                    elemento.textContent = 'Titulo: ';
                    const titulo = document.createElement('p');
                    titulo.textContent = post.title;
                    const elemento2 = document.createElement('p');
                    elemento2.textContent = 'Contenido: ';
                    const contenido = document.createElement('p');
                    contenido.textContent = post.body;
                    elemento.style.color = 'blue';
                    elemento2.style.color = 'green';
                    div.style.border = '1px solid black';
                    div.style.margin = '5px';
                    div.style.textAlign = 'center';
                    div.appendChild(elemento);
                    div.appendChild(titulo);
                    div.appendChild(elemento2);
                    div.appendChild(contenido);
                    lista.appendChild(div);
                    lista.style.textAlign = 'center';
                    
                    
                }
            }
            const numero = document.createElement('p');
        numero.textContent = `Pagina ${pagina} de ${numeroPaginas}`
        lista.appendChild(numero);
        }

        botones.style.textAlign = 'center';
    

        mostrarPosts(1);

        anterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina--;
                mostrarPosts(pagina);
            }
        });

        siguiente.addEventListener('click', () => {
            if (pagina < numeroPaginas) {
                pagina++;
                mostrarPosts(pagina);

            }


        });
    })
    .catch(error => {
        console.error(error);
    });


