document.querySelector("#submitName").addEventListener("click",  (event) => {
    event.preventDefault();
    let name =document.querySelector('input[name="name"]').value
    let female = document.querySelector('input[name="gender"][value="female"]')
    let male = document.querySelector('input[name="gender"][value="male"]')
    let setprob = document.querySelector('#setprob')
    let setgender = document.querySelector('#setgender')
    let ourgender = document.querySelector('#ourgender')

    validateName(name)

    fetch('https://api.genderize.io/?name='+name)
    .then(response => {
        // handle the response
        response.json()
        .then(data => {
            if (data.gender == 'female') {
                //female.checked = true
                setgender.innerText = 'Female'
                setprob.innerText = data.probability
            }else if (data.gender == 'male') {
                //male.checked = true
                setgender.innerText = 'Male'
                setprob.innerText = data.probability
            }else{
                createNotify("We can't find this name!")
            }
        })
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });

    let db = JSON.parse(localStorage.getItem("gender"));
    if (db.hasOwnProperty(name)) {
        ourgender.innerText = db[name]
    }else{
        ourgender.innerText = '-'
    }

})

const submitSave = (event) => {
    event.preventDefault();
    let name =document.querySelector('input[name="name"]').value
    let gender = document.querySelector('input[name="gender"]:checked')

    validateName(name)

    if (gender == null) {
        createNotify("Please select gender!")
        return 0
    }
    let db = JSON.parse(localStorage.getItem("gender"));
    db = db ? db : {}
    db[name] = gender.value
    localStorage.setItem("gender", JSON.stringify(db));
    createNotify("Saved in localStorage.")
}

const submitClear = () => {
    let name =document.querySelector('input[name="name"]').value
    let db = JSON.parse(localStorage.getItem("gender"));
    let ourgender = document.querySelector('#ourgender')

    validateName(name)

    if (db.hasOwnProperty(name)) {
        db = db ? db : {}
        delete db[name]
        localStorage.setItem("gender", JSON.stringify(db));
        ourgender.innerText = '-'
        createNotify("Cleared from localStorage.")
    }else{
        createNotify("We don't have data!")
    }
}

const validateName = (name) => {
    let re = /^[a-zA-Z ]+$/
    if (name.length>256) {
        createNotify("You should enter less than 255 character")
        return 0;
    }
    if (!re.test(name)) {
        createNotify("Please just enter a-z & A-Z")
        return 0
    }
}