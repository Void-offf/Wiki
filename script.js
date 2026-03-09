let pages = JSON.parse(localStorage.getItem("wikiPages")) || {}
let historyLog = JSON.parse(localStorage.getItem("wikiHistory")) || {}
let currentPage = null

renderList()
showDefault()

function saveStorage(){
localStorage.setItem("wikiPages", JSON.stringify(pages))
localStorage.setItem("wikiHistory", JSON.stringify(historyLog))
}

function createPage(){
let title = prompt("Nom de la page")
if(!title || pages[title]) { alert("Page déjà existante ou vide"); return }
pages[title] = ""
historyLog[title] = []
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

function searchPages(){
let query = document.getElementById("search").value.toLowerCase()
let list = document.getElementById("pageList")
list.innerHTML=""
for(let title in pages){
if(title.toLowerCase().includes(query)){
let link=document.createElement("a")
link.innerText=title
link.onclick=()=>showPage(title)
list.appendChild(link)
}
}
}

function showDefault(){
let first = Object.keys(pages)[0]
if(first) showPage(first)
}

function showPage(title){
currentPage = title
document.getElementById("pageTitle").innerText = title
document.getElementById("editor").innerHTML = pages[title]
document.getElementById("history").style.display = "none"
}

function savePage(){
if(!currentPage) return
// sauvegarde historique
historyLog[currentPage].push(pages[currentPage])
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
document.getElementById("fileInput").click()
}

function uploadImage(event){
let file = event.target.files[0]
if(!file) return
let reader = new FileReader()
reader.onload = function(e){
let img = `<img src="${e.target.result}" style="max-width:100%"/>`
document.execCommand("insertHTML",false,img)
}
reader.readAsDataURL(file)
}

function addVideo(){
let url = prompt("URL de la vidéo (mp4)")
let video = `<video controls width="400"><source src="${url}"></video>`
document.execCommand("insertHTML",false,video)
}

function toggleDark(){
document.body.classList.toggle("dark")
}

function showHistory(){
if(!currentPage) return
let hist = historyLog[currentPage]
let div = document.getElementById("history")
div.innerHTML = "<h3>Historique</h3>"
hist.forEach((h,i)=>{
let btn = document.createElement("button")
btn.innerText = "Version "+(i+1)
btn.onclick = ()=>{ document.getElementById("editor").innerHTML = h }
div.appendChild(btn)
})
div.style.display="block"
}
