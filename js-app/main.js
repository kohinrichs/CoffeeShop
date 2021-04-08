const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");

button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            render(beanVarieties);
        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const contentElement = document.querySelector(".beanVarieties")

const render = (beanVarieties) => {
    let beanCards = []
    for (const bean of beanVarieties) {
        beanCards.push(Bean(bean))
    }
    contentElement.innerHTML = beanCards.join("")
}

const Bean = (bean) => {

    const beanNote = bean.notes || "No notes."

    return `
            <section class="bean">
                <h3 class="bean__name">${bean.name}</h3>
                <div class="bean__region">Region: ${bean.region}</div>
                <div class="bean__notes">Notes: ${beanNote}</div >
            </section >
    `
}