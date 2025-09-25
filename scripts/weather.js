class Weather {
    constructor(time, interval, temperature_2m) {
        this.time = time;
        this.interval = interval;
        this.temperature_2m = temperature_2m;
    }


    static fromRaw(raw) {
        return new Weather(raw.time, raw.interval, raw.temperature_2m);
    }

    renderFrom(container) {
        container.innerHTML = "";

        let h2 = document.createElement(`h2`);
        h2.textContent = this.temperature_2m;

        let pTitle = document.createElement(`p`);
        pTitle.textContent = this.interval;

        let pBody = document.createElement(`p`);
        pBody.textContent = this.time;

        container.appendChild(h2);
        container.appendChild(pTitle);
        container.appendChild(pBody);

        return container;

    }

}