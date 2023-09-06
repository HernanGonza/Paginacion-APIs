const numero = document.getElementById('numero');

fetch('https://api.weatherapi.com/v1/forecast.json?key=6ee8d07c5b04493fb74113918230409&q=New%20York&days=5')
    .then(response => response.json())
    .then(paginaDias => {
        const lista = document.getElementById('lista');
        const diasPorPagina = 1;
        const numeroPaginas = Math.ceil(paginaDias.forecast.forecastday.length / diasPorPagina);

        function mostrarDias(pagina) {
            lista.innerHTML = '';

            const indiceInicial = (pagina - 1) * diasPorPagina;
            const indiceFinal = indiceInicial + diasPorPagina;

            for (let i = indiceInicial; i < indiceFinal; i++) {
                if (paginaDias.forecast.forecastday[i]) {
                    const dia = paginaDias.forecast.forecastday[i];
                    const elemento = document.createElement('p');
                    elemento.textContent = 'Fecha: ' + dia.date;
                    const tempMaxima = document.createElement('p');
                    tempMaxima.textContent = 'Temperatura Maxima: ' + dia.day.maxtemp_c;
                    const tempMinima = document.createElement('p');
                    tempMinima.textContent = 'Temperatura Minima: ' + dia.day.mintemp_c;
                    const icono = document.createElement('img');
                    icono.src = dia.day.condition.icon;
                    const condicion = document.createElement('p');
                    condicion.textContent = 'Condicion: ' + dia.day.condition.text;
                    lista.appendChild(elemento);
                    lista.appendChild(tempMaxima);
                    lista.appendChild(tempMinima);
                    lista.appendChild(icono);
                    lista.appendChild(condicion);
                    lista.style.textAlign = 'center';
                    lista.style.border = '1px solid black';
                    lista.style.margin = '0 auto';
                    lista.style.marginTop = '100px';
                    lista.style.marginBottom = '50px';
                    lista.style.width = '300px';
                    
                }
            }

            const numeroElemento = document.createElement('p');
            numeroElemento.textContent = `Pagina ${pagina} de ${numeroPaginas}`;
            lista.appendChild(numeroElemento);
        }

        mostrarDias(1);

        const paginacionContainer = document.createElement('div');
        for (let i = 1; i <= numeroPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.addEventListener('click', () => mostrarDias(i));
            paginacionContainer.appendChild(boton);
        }
        numero.appendChild(paginacionContainer);
        numero.style.textAlign = 'center';
    })
    .catch(error => {
        console.log(error);
    });