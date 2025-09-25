let latitude = "52.52";
let longitude = "13.41";
let current = "temperature_2m";
let timezone = "America/Sao_Paulo";

let button = document.getElementById('btnWeather');
let statusInfo = document.getElementById('status');
let div = document.getElementById('out');

button.addEventListener('click', function () {
    let params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: current,
        timezone: timezone
    })

    let url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    uptadeStatus("Carregando...");

    fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            let errorMessage = "Erro: Recurso não encontrado."
            throw new Error(errorMessage);
        }
    })
    .then(function (json) {
        let current = json.current;
        let weather = Weather.fromRaw(current);
        div = weather.renderFrom(div);
    })
    .catch(function (error) {
        renderError(error);
    })
    // .finally(function () {
    //     uptadeStatus("");
    // }) // Versão com função anônima
    .finally(() => uptadeStatus(""))
});

function uptadeStatus(msg) {
    statusInfo.textContent = msg || "";
}

function renderError(error) {
    div.innerHTML = "";

    let h2 = document.createElement(`h2`);
    h2.textContent = error;

    div.appendChild(h2);
}