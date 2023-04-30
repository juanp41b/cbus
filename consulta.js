const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
	event.preventDefault();
	const parada = document.querySelector('#parada').value;
	const url = `https://www.vitoria-gasteiz.org/j16-02w/detalleAction.do?accion=CONSULTA_PARADAS&charset=UTF-8&idParada=${parada}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const tbody = document.querySelector('tbody');
			tbody.innerHTML = '';
			data.forEach(item => {
				const tiempo = Math.round(item.seconds / 60);
				const linea = item.line;
				const destino = item.destination;
				const row = `
					<tr>
						<td>${tiempo} min</td>
						<td>${linea}</td>
						<td>${destino}</td>
					</tr>
				`;
				tbody.insertAdjacentHTML('beforeend', row);
			});
		})
		.catch(error => console.error(error));
});
