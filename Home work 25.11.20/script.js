let divs = document.querySelectorAll(".container");
divs.forEach(div => {
    div.style.border = "1px solid black";
    div.style.margin = "10px 0px";
    div.style.backgroundColor = "rgb(35, 97, 102)";
});

let main = document.querySelectorAll("main")
main.forEach(m => {
    m.style.margin = "5px"
})

let heading = document.querySelectorAll("header");
heading.forEach(h => {
    h.style.display = "block";
    h.style.padding = "5px";
    h.style.color = "rgb(184, 218, 222)";
    h.style.fontFamily = "Arial, sans-serif";
    h.style.backgroundColor = "rgb(14, 73, 77)";
});
let tag = document.querySelectorAll(".tag");
tag.forEach(t => {
    t.style.marginLeft = "30px";
});
let paragraphs = document.querySelectorAll(".description");
paragraphs.forEach(p => {
    p.style.color = "rgb(184, 218, 222)";
    p.style.margin = "10px";
    p.style.marginBottom = "10px";
});

let newSpan = document.querySelectorAll(".new");
newSpan.forEach(s => {
    s.style.marginLeft = "10px"
})

document.querySelector(".btn1").addEventListener("click", () =>
{
    answer1.innerHTML = Math.floor(Math.random() * 100)
})

document.querySelector(".secondTask").addEventListener("mousemove", e=>{
    firstNumber.innerHTML = `X = ${e.clientX}`;
    secondNumber.innerHTML = `Y = ${e.clientY}`
})
document.querySelector(".secondTask").addEventListener("mousemove", e=>{
    firstNumber.innerHTML = `X = ${e.clientX}`;
    secondNumber.innerHTML = `Y = ${e.clientY}`
})
let number = 1;
document.querySelector(".btn2").addEventListener("click", () =>
{
    if (number == 1){
        text.style.display = "none";
        number++;
    }
    else
    {
        text.style.display = "block";
        number--
    }
})

let tabButtons = document.querySelectorAll(".tab-button");
let tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        let tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

