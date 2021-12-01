document.querySelector("#submitName").addEventListener("click",  (event) => {
    event.preventDefault();
    let re = /^[a-zA-Z ]+$/
    let name =document.querySelector('input[name="name"]').value
    let female = document.querySelector('input[name="gender"][value="female"]')
    let male = document.querySelector('input[name="gender"][value="male"]')
    let gender = document.querySelector('input[name="gender"]:checked')
    let setprob = document.querySelector('#setprob')
    let setgender = document.querySelector('#setgender')

    if (name.length>256) {
        createNotify("You should enter less than 255 character")
        return 0;
    }
    if (!re.test(name)) {
        createNotify("Please just enter a-z & A-Z")
        return 0
    }

    fetch('https://api.genderize.io/?name='+name)
    .then(response => {
        // handle the response
        response.json()
        .then(data => {
            if (data.gender == 'female') {
                female.checked = true
                setgender.innerText = 'Female'
                setprob.innerText = data.probability
            }else if (data.gender == 'male') {
                male.checked = true
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
})

const submitSave = (event) => {
    event.preventDefault();
    createNotify("خطا رخ داده است")
}

const submitClear = () => {

}
