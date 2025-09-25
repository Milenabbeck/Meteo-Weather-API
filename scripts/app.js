let current = "temperature_2m";
let timezone = "Europe/Sao_Paulo";

let latitude = document.getElementById('latitude');
let longitude = document.getElementById('longitude');

let button = document.getElementById('btnWeather');
let statusInfo = document.getElementById('status');
let div = document.getElementById('out');

button.addEventListener('click', function () {
    updateStatus("Carregando...");

    fetchWeather()
        .then(function (json) {
            let current = json.current;
            let weather = Weather.fromRaw(current);
            div = weather.renderFrom(div);
        })
        .catch(function (error) {
            renderError(error);
        })
        .finally(() => updateStatus(""));
});

function fetchWeather() {
    let params = new URLSearchParams({
        latitude: latitude.value,
        longitude: longitude.value,
        current: current,
        timezone: timezone
    });

    let url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    return fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                let errorMessage = "Erro: Recurso não encontrado ou servidor não disponível. Tente novamente.";
                throw new Error(errorMessage);
            }
        });
}

function updateStatus(msg) {
    statusInfo.textContent = msg || "";
}

function renderError(error) {
    div.innerHTML = "";

    let h2 = document.createElement('h2');
    h2.textContent = error;

    div.appendChild(h2);
}
