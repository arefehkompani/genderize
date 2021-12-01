document.querySelector("#submitName").addEventListener("click",  (event) => {
    event.preventDefault();
    let re = /^[a-zA-Z ]+$/
    let name =document.querySelector('input[name="name"]').value
    if (name.length>256) {
        createNotify("You should enter less than 255 character")
        return 0;
    }
    if (!re.test(name)) {
        createNotify("Please just enter a-z & A-Z")
    }
    // let gender =document.querySelector('input[name="gender"]:checked').value
    // console.log(event);
})

const submitSave = (event) => {
    event.preventDefault();
    createNotify("خطا رخ داده است")
}

const submitClear = () => {

}
