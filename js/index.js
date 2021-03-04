let PAGE = 1

document.addEventListener('DOMContentLoaded', () => {
    const monstrURL = `http://localhost:3000/monsters/?_limit=50&_page=${PAGE}`
    initMonsters(monstrURL);
    buildForm();
    let btnF = document.querySelector("#forward")
    btnF.addEventListener("click", nextPage)
    let btnB = document.querySelector("#back")
    btnB.addEventListener("click", lastPage)
});


function initMonsters(url){
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(monsters => {
        monsters.forEach(monster => {
            const newMonster = addMonsterToContainer(monster, buildMonster())
            document.getElementById("monster-container").appendChild(newMonster)
        })
    })
}


function buildMonster(){
    const div = document.createElement("div")
    const name =document.createElement("h2")
    const age = document.createElement("h4")
    const description  = document.createElement("p")
    div.append(name, age, description)
    return div
}

function addMonsterToContainer(m, c) {
    c.id = m.id
    c.querySelector("h2").textContent = m.name
    c.querySelector("h4").textContent = m.age
    c.querySelector("p").textContent = m.description
    return c
}

function buildForm(){
    const div = document.querySelector("#create-monster")
    const form = document.createElement("form")
    const nameInput = document.createElement("input")
    const ageInput = document.createElement("input")
    const descriptionInput = document.createElement("input")
    const btn = document.createElement("button")
    btn.textContent = "Create"
    form.id = "monster-form"
    nameInput.id = "name"
    ageInput.id = "age"
    descriptionInput.id = "description"
    nameInput.placeholder = "name..."
    ageInput.placeholder = "age..."
    descriptionInput.placeholder = "description..."
    form.append(nameInput, ageInput, descriptionInput, btn)
    div.appendChild(form)
    form.addEventListener("submit", postForm)
}

function postForm(e){
    e.preventDefault()
    const formSubmit = e.target
    const inputs = formSubmit.querySelectorAll("input")
    const nameI = inputs[0].value
    const ageI = inputs[1].value
    const descI = inputs[2].value
    let formValues = {name: nameI, age: ageI, description: descI}
    fetch("http://localhost:3000/monsters",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formValues)
    })
    .then(r => r.json())
    .then(monster => {
            const newMonster = addMonsterToContainer(monster, buildMonster())
            document.getElementById("monster-container").appendChild(newMonster)
    })
}

function nextPage(){
    PAGE++
    const monstrURL = `http://localhost:3000/monsters/?_limit=50&_page=${PAGE}`
    const container = document.getElementById("monster-container")
    container.innerHTML = ""
    initMonsters(monstrURL);
}

function lastPage(){
    PAGE--
    const monstrURL = `http://localhost:3000/monsters/?_limit=50&_page=${PAGE}`
    const container = document.getElementById("monster-container")
    container.innerHTML = ""
    initMonsters(monstrURL);
}