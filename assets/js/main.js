document.querySelector("#submitName").addEventListener("click",  (event) => {
    // برای جلوگیری از حالت دیفالت مروررگر
    event.preventDefault();
    let name =document.querySelector('input[name="name"]').value
    let female = document.querySelector('input[name="gender"][value="female"]')
    let male = document.querySelector('input[name="gender"][value="male"]')
    let setprob = document.querySelector('#setprob')
    let setgender = document.querySelector('#setgender')
    let ourgender = document.querySelector('#ourgender')

    // چک کردن موارد گفته شده برای فرم
    validateName(name)

    // فرستادن متد گت برای ارتباط با رابط
    fetch('https://api.genderize.io/?name='+name)
    .then(response => {
        // handle the response
        //به کمک then اینجا به ابجکت تبدیل میکنیم.
        response.json()
        .then(data => {
            if (data.gender == 'female') {
                // این موردی که پایین کامنت شده برای این هست که اگر مثلا جنسیت زن بود، دکمه رادیویش هم فعال بشه
                //ولی چون جایی ذکر نشده بود کامنتش کردم :)
                //female.checked = true

                // setgender برای نمایش دادن در قسمت پیشبینی است
                setgender.innerText = 'Female'
                setprob.innerText = data.probability

            }else if (data.gender == 'male') {
                //male.checked = true
                setgender.innerText = 'Male'
                setprob.innerText = data.probability

            }else{
                // در صورتی که اسمی پیدا نکرد رابط این آلارم به نمایش در خواهد آمد
                createNotify("We can't find this name!")
            }
        })
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });

    // اینجا میایم از حافظه میخوانیم که ببینیم 
    // آیا همچین اسمی داریم توی ابجکتی که در حافظه ساختیم یا نه
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

    // در صورتی که هنگام ذخیره کردن گزینه‌ای برای جنسیت انتخاب نشده بود
    // این آلارم داده میشود
    if (gender == null) {
        createNotify("Please select gender!")
        return 0
    }

    // در اینجا اسم ما در حافظه ذخیره خواهد شد
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

    // اگر این اسم در حافظه ما وجود داشت آن را از حافظه پاک خواهد کرد
    if (db.hasOwnProperty(name)) {
        db = db ? db : {}
        delete db[name] // پاک کردن از حافظه
        localStorage.setItem("gender", JSON.stringify(db));
        ourgender.innerText = '-'
        createNotify("Cleared from localStorage.")
    }else{
        createNotify("We don't have data!")
    }
}

// در این تابع به کمک عبارتهای منظم میبینیم که آیا
//موارد گفته شده رعایت شده است یا نه
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