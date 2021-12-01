const createNotify = (message) => {
    let div = document.createElement("DIV");            
    let button = document.createElement("button");
    let span = document.createElement("span");
    let tex = document.createTextNode("X")
    var textnode = document.createTextNode(message);  
    let p = document.createElement("p")
    div.classList.add("notify");
    span.appendChild(tex)
    button.appendChild(span)
    button.setAttribute('onclick', "closeNotify()")
    div.appendChild(button)
    p.appendChild(textnode)
    div.appendChild(p);                             
    document.querySelector("body").appendChild(div); 
    setTimeout(() => {
        document.querySelector(".notify").remove()
    },5000)
}

const closeNotify = () => {
    document.querySelector(".notify").remove()
}