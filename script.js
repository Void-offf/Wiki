let pages = {}

function createPage(){
 document.getElementById("editor").style.display="block"
}

function savePage(){

 let title = document.getElementById("title").value
 let content = document.getElementById("content").value

 pages[title] = content

 renderPages()
}

function renderPages(){

 let container = document.getElementById("pages")
 container.innerHTML = ""

 for(let title in pages){

  let div = document.createElement("div")
  div.innerHTML = "<h2>"+title+"</h2><p>"+pages[title]+"</p>"

  container.appendChild(div)
 }

}
