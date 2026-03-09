let pages = JSON.parse(localStorage.getItem("wikiPages")) || {}
let historyLog = JSON.parse(localStorage.getItem("wikiHistory")) || {}
let currentPage = null

renderList()
showDefault()

// stockage local
function saveStorage(){
    localStorage.setItem("wikiPages", JSON.stringify(pages))
    localStorage.setItem("wikiHistory", JSON.stringify(historyLog))
}

// Création page
function createPage(){
    let title = prompt("Nom de la page")
    if(!title || pages[title]){
        alert("Page vide ou existe déjà")
        return
    }
    pages[title] = ""
    historyLog[title] = []
    saveStorage()
    renderList()
    showPage(title)
}

// Lister pages
function renderList(){
    let list = document.getElementById("pageList")
    list.innerHTML = ""
    for(let title in pages){
        let link = document.createElement("a")
        link.innerText = title
        link.onclick = () => showPage(title)
        list.appendChild(link)
    }
}

// Recherche
function searchPages(){
    let query = document.getElementById("search").value.toLowerCase()
    let list = document.getElementById("pageList")
    list.innerHTML = ""
    for(let title in pages){
        if(title.toLowerCase().includes(query)){
            let link = document.createElement("a")
            link.innerText = title
            link.onclick = () => showPage(title)
            list.appendChild(link)
        }
    }
}

// Afficher page par défaut
function showDefault(){
    let first = Object.keys(pages)[0]
    if(first) showPage(first)
}

// Afficher page
function showPage(title){
    currentPage = title
    document.getElementById("pageTitle").innerText = title
    document.getElementById("editor").innerHTML = pages[title]
    document.getElementById("history").style.display = "none"
}

// Sauvegarder page
function savePage(){
    if(!currentPage) return
    historyLog[currentPage].push(pages[currentPage])
    pages[currentPage] = document.getElementById("editor").innerHTML
    saveStorage()
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
        btn.innerText = "Version " + (i+1)
        btn.onclick = () => { document.getElementById("editor").innerHTML = h }
        div.appendChild(btn)
    })
    div.style.display = "block"
}

// Fonctions WYSIWYG fiables

function toggleStyle(tag){
    let sel = window.getSelection()
    if(!sel.rangeCount) return
    let range = sel.getRangeAt(0)
    let parent = range.commonAncestorContainer.parentNode

    // si déjà appliqué -> retirer
    if(parent && parent.tagName && parent.tagName.toLowerCase() === tag){
        let content = parent.innerHTML
        parent.replaceWith(...Array.from(parent.childNodes)) // enlève le tag
        return
    }

    let el = document.createElement(tag)
    el.appendChild(range.extractContents())
    range.insertNode(el)
}

function changeFontSize(size){
    let sel = window.getSelection()
    if(!sel.rangeCount) return
    let range = sel.getRangeAt(0)
    let span = document.createElement("span")
    span.style.fontSize = size + "px"
    span.appendChild(range.extractContents())
    range.insertNode(span)
}

function changeColor(color){
    let sel = window.getSelection()
    if(!sel.rangeCount) return
    let range = sel.getRangeAt(0)
    let span = document.createElement("span")
    span.style.color = color
    span.appendChild(range.extractContents())
    range.insertNode(span)
}

// Liens
function addLink(){
    let url = prompt("URL du lien")
    if(!url) return
    let sel = window.getSelection()
    if(!sel.rangeCount) return
    let range = sel.getRangeAt(0)
    let a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.appendChild(range.extractContents())
    range.insertNode(a)
}

// Images
function addImage(){
    document.getElementById("fileInput").click()
}

function uploadImage(event){
    let file = event.target.files[0]
    if(!file) return
    let reader = new FileReader()
    reader.onload = function(e){
        let img = document.createElement("img")
        img.src = e.target.result
        img.style.maxWidth = "100%"
        img.style.cursor = "pointer"
        img.onclick = ()=> {
            let newSize = prompt("Nouvelle largeur en px", img.width)
            if(newSize) img.width = newSize
        }
        let sel = window.getSelection()
        if(!sel.rangeCount) return
        sel.getRangeAt(0).insertNode(img)
    }
    reader.readAsDataURL(file)
}

// Vidéo
function addVideo(){
    let url = prompt("URL mp4")
    if(!url) return
    let video = document.createElement("video")
    video.src = url
    video.controls = true
    video.width = 400
    video.style.cursor = "pointer"
    video.onclick = ()=> {
        let newSize = prompt("Nouvelle largeur en px", video.width)
        if(newSize) video.width = newSize
    }
    let sel = window.getSelection()
    if(!sel.rangeCount) return
    sel.getRangeAt(0).insertNode(video)
}

// Mode sombre
function toggleDark(){ document.body.classList.toggle("dark") }
