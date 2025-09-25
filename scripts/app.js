let button = document.getElementById('btnWeather');
let div = document.getElementById('out');

button.addEventListener('click', function () {
    let url = '';
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
        // let post = Post.fromRaw(json);
        // div = postsrenderFrom(div);
    })
    .catch(function (error) {
        renderError(error);
    })
});

function renderError(error) {
    div.innerHTML = "";

    let h2 = document.createElement(`h2`);
    h2.textContent = error;

    div.appendChild(h2);
}