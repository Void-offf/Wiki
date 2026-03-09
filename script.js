let pages = JSON.parse(localStorage.getItem("wikiPages")) || {}
let currentPage = null

renderList()

function saveStorage(){
localStorage.setItem("wikiPages", JSON.stringify(pages))
}

function createPage(){

let title = prompt("Nom de la page")

if(!title) return

pages[title] = ""

saveStorage()

renderList()

showPage(title)

}

function renderList(){

let list = document.getElementById("pageList")

list.innerHTML=""

for(let title in pages){

let link=document.createElement("a")

link.innerText=title

link.onclick=()=>showPage(title)

list.appendChild(link)

}

}

function showPage(title){

currentPage = title

document.getElementById("pageTitle").innerText=title

document.getElementById("editor").innerHTML=pages[title]

}

function savePage(){

if(!currentPage) return

pages[currentPage] = document.getElementById("editor").innerHTML

saveStorage()

alert("Page sauvegardée")

}

function format(command){

document.execCommand(command,false,null)

}

function changeSize(size){

document.execCommand("fontSize",false,size)

}

function addLink(){

let url = prompt("URL du lien")

document.execCommand("createLink",false,url)

}

function addImage(){

let url = prompt("URL de l'image")

document.execCommand("insertImage",false,url)

}

function addVideo(){

let url = prompt("URL de la vidéo")

let video = `<video controls width="400"><source src="${url}"></video>`

document.execCommand("insertHTML",false,video)

}

function toggleDark(){

document.body.classList.toggle("dark")

}
