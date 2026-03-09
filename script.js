let pages = JSON.parse(localStorage.getItem("wikiPages"))||{}
let historyLog = JSON.parse(localStorage.getItem("wikiHistory"))||{}
let currentPage = null

renderList()
showDefault()

// sauvegarde locale
function saveStorage(){
localStorage.setItem("wikiPages",JSON.stringify(pages))
localStorage.setItem("wikiHistory",JSON.stringify(historyLog))
}

// créer une page
function createPage(){
let title = prompt("Nom de la page")
if(!title || pages[title]){ alert("Page existe déjà ou vide"); return }
pages[title] = ""
historyLog[title] = []
saveStorage()
renderList()
showPage(title)
}

// lister les pages
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

// recherche
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

// montrer page par défaut
function showDefault(){
let first = Object.keys(pages)[0]
if(first) showPage(first)
}

// afficher page
function showPage(title){
currentPage = title
document.getElementById("pageTitle").innerText = title
document.getElementById("editor").innerHTML = pages[title]
document.getElementById("history").style.display="none"
renderPreview()
}

// sauvegarder page
function savePage(){
if(!currentPage) return
historyLog[currentPage].push(pages[currentPage])
pages[currentPage] = document.getElementById("editor").innerHTML
saveStorage()
renderPreview()
alert("Page sauvegardée")
}

// Historique
function showHistory(){
if(!currentPage) return
let hist = historyLog[currentPage]
let div = document.getElementById("history")
div.innerHTML = "<h3>Historique</h3>"
hist.forEach((h,i)=>{
let btn = document.createElement("button")
btn.innerText="Version "+(i+1)
btn.onclick=()=>{document.getElementById("editor").innerHTML=h;renderPreview()}
div.appendChild(btn)
})
div.style.display="block"
}

// éditeur style Word
function boldText(){document.execCommand("bold")}
function italicText(){document.execCommand("italic")}
function underlineText(){document.execCommand("underline")}
function changeSize(size){document.execCommand("fontSize",false,size)}

// liens et médias
function addLink(){let url=prompt("URL du lien");document.execCommand("createLink",false,url)}
function addImage(){document.getElementById("fileInput").click()}
function uploadImage(event){
let file=event.target.files[0]
if(!file) return
let reader=new FileReader()
reader.onload=function(e){
let img=`<img src="${e.target.result}" style="max-width:100%"/>`
document.execCommand("insertHTML",false,img)
renderPreview()
}
reader.readAsDataURL(file)
}
function addVideo(){let url=prompt("URL de la vidéo (mp4)");let video=`<video controls width="400"><source src="${url}"></video>`;document.execCommand("insertHTML",false,video);renderPreview()}

// mode sombre
function toggleDark(){document.body.classList.toggle("dark")}

// preview Markdown live
function renderPreview(){
let content = document.getElementById("editor").innerHTML
let md = content
md = md.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>') // liens
document.getElementById("preview").innerHTML = md
}

// live preview en temps réel
document.getElementById("editor").addEventListener("input",renderPreview)
