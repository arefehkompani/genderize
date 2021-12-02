// از آنجایی که آلارم نباید همیشه مشخص باشد باید المن‌های مربوطه به آن مواقع مورد نیاز ساخته شود.
// از این جهت نیاز به این تابع داریم
const createNotify = (message) => {
    // المنت‌هایی که برای نمایش آلارم داریم را در اینجا تعریف میکنیم.
    let div = document.createElement("DIV");            
    let button = document.createElement("button");
    let span = document.createElement("span");
    let tex = document.createTextNode("X")
    // متنی که میخواهیم نمایش دهیم را در اینجا اضافه میکنیم
    var textnode = document.createTextNode(message);  
    let p = document.createElement("p")
    div.classList.add("notify");
    // این المنت‌ها را به هم اضافه میکنیم که ساختار درستی بگیرد
    span.appendChild(tex)
    button.appendChild(span)
    button.setAttribute('onclick', "closeNotify()")
    div.appendChild(button)
    p.appendChild(textnode)
    div.appendChild(p);                             
    document.querySelector("body").appendChild(div); 
    // بعد از 5 ثانیه آلارم بسته میشود
    setTimeout(() => {
        document.querySelector(".notify").remove()
    },5000)
}

// این تابع برای بستن آلارم با کلیک بر روی دکمه ضربدر آن نوشته شده است
const closeNotify = () => {
    document.querySelector(".notify").remove()
}