// Get the beans from the API
const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

// Event Listener to Get all the beanVarieties and then call render with the array as an argument
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            render(beanVarieties);
        })
});

// Display all the bean varieties
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

// Add a bean variety form
const contentTarget = document.querySelector(".beanVarietiesForm")

const renderForm = () => {

    contentTarget.innerHTML = `
        <div id="bean__form">
            <!-- Bean Variety Name -->
                <fieldset>
                    <label for="beanVarietyName">Bean Variety Name</label>
                    <input type="text" name="beanVarietyName" id="beanVarietyName" placeholder="What kind of bean is it?">
                </fieldset>
            <!-- Region -->
                <fieldset>
                    <label for="beanVarietyRegion">Region of Origin</label>
                    <textarea type="text" name="beanVarietyRegion" id="beanVarietyRegion" placeholder="Where in the world is the bean from?"></textarea>
                </fieldset>
                <!-- Notes -->
                <fieldset>
                    <label for="beanVarietyNotes">Notes</label>
                    <textarea type="text" name="beanVarietyNotes" id="beanVarietyNotes" placeholder="Anything you'd like to say about this bean?"></textarea>
                </fieldset>
            <!-- Submit button. -->
            <button type="button" id="submitBeanVariety">Submit</button>
        </div>
    `
}

renderForm();

// Gather values from form and send them back to the DB
const submitButton = document.querySelector("#submitBeanVariety");

submitButton.addEventListener("click", () => {
    debugger
    // if (clickEvent.target.id === "submitBeanVariety") 
    {
        let name = document.querySelector("#beanVarietyName").value
        let region = document.querySelector("#beanVarietyRegion").value
        let notes = document.querySelector("#beanVarietyNotes").value

        const newBeanVariety = {
            Name: name,
            Region: region,
            Notes: notes
        }
        addBeanVariety(newBeanVariety);
    }
})

function addBeanVariety(newBeanVariety) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBeanVariety)
    })
        .then(getAllBeanVarieties)
        .then(beanVarieties => {
            render(beanVarieties);
        })
        .then(renderForm);
}