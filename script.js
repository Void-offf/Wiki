let pages = JSON.parse(localStorage.getItem("wikiPages")) || {}

renderList()

function saveStorage(){
localStorage.setItem("wikiPages", JSON.stringify(pages))
}

function createPage(){

document.getElementById("editor").style.display="block"

}

function savePage(){

let title = document.getElementById("title").value
let content = document.getElementById("content").value

pages[title] = content

saveStorage()

renderList()

showPage(title)

document.getElementById("editor").style.display="none"

}

function renderList(){

let list = document.getElementById("pageList")

list.innerHTML=""

for(let title in pages){

let link = document.createElement("a")

link.innerText = title

link.onclick = ()=> showPage(title)

list.appendChild(link)

}

}

function showPage(title){

document.getElementById("pageTitle").innerText = title

document.getElementById("pageContent").innerText = pages[title]

}

function toggleDark(){

document.body.classList.toggle("dark")

}
