const doc = window.document;
let enabled = true; //Whether or not the js is active or not
let lastTarget = null; //Removes border on this element upon close
let selectedElement = null; //Keeps border on this element after click

//Actual box design
const container = doc.createElement('div');
container.style.width = "100%";
container.style.height = "30vh";
container.style.backgroundColor = "black";
container.style.position = "fixed";
container.style.left = "0";
container.style.bottom = "0";
container.style.zIndex = "999";
container.style.border = "2px solid #FF10F0";
container.style.boxSizing = "border-box";
container.style.display = "flex";
container.style.alignItems = "center";
container.classList.add("reiDev");

//HTML source box
const htmlDiv = doc.createElement('div');
htmlDiv.style.width = "100%";
htmlDiv.style.height = "100%";
htmlDiv.style.backgroundColor = "black";
htmlDiv.style.zIndex = "9999";
htmlDiv.style.border = "2px solid #FF10F0";
htmlDiv.style.boxSizing = "border-box";
htmlDiv.style.overflowY = "auto";
htmlDiv.style.display = "flex";
htmlDiv.style.flexDirection = "column";
htmlDiv.style.flexGrow = "0";
htmlDiv.style.flexShrink =  "0";
htmlDiv.style.overflowX = "hidden";
htmlDiv.style.color = "white";
htmlDiv.classList.add("reiDev");

//HTML title
const htmlTitle = doc.createElement('span');
htmlTitle.style.color = "cyan";
htmlTitle.textContent = "Source";
htmlTitle.style.fontSize = "16px";
htmlTitle.style.marginLeft = "4px";
htmlTitle.classList.add("reiDev");


//HTML content in box
const content = doc.createElement('textarea');
content.style.height = "100%";
content.style.width = "100%";
content.style.margin = "0";
content.style.background = "transparent";
content.style.color = "cyan";
content.style.border = "none";
content.style.opacity = "0";
content.readOnly = true;
content.classList.add("reiDev");

//Add on screen
doc.body.append(container);
container.appendChild(htmlDiv);
htmlDiv.append(htmlTitle);
htmlDiv.appendChild(content);

//Applies changes when shift enter pressed and if no tags included then change
content.addEventListener("keydown", (event) => {
    if(event.shiftKey && event.key == "Enter") {
        event.preventDefault();
        let html = content.value;
        const regex = /^<.*>$/s;
        if(selectedElement) {
            if(regex.test(html)) {
            selectedElement.insertAdjacentHTML('beforebegin', html);
            let newVersion = selectedElement.previousSibling;
            selectedElement.parentElement.removeChild(selectedElement)
            selectedElement = newVersion;
            selectedElement.style.outline = "4px solid #FF10F0";
            }
        }
    }
})

//Adds border and saves last target
doc.addEventListener("mouseover", (event) => {
    if(enabled && selectedElement == event.target) {
        event.target.style.outlineColor = "#FF10F0";
    }
    else if(enabled && event.target.classList != "reiDev") {
        event.target.style.outline = "4px solid cyan";
        lastTarget = event.target;
    }
})

//Removes border
doc.addEventListener("mouseout", (event) => {
    if(enabled && event.target.classList != "reiDev" && selectedElement != event.target) {
        event.target.style.outline = "none";
    }
})

//Disables links when outlined
doc.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    if(enabled && event.target.classList != "reiDev") {
        if(selectedElement && selectedElement != event.target) {
            selectedElement.style.outline = "none";
        }
        content.value = event.target.outerHTML;
        content.style.opacity = "1";
        content.readOnly = false;
        selectedElement = event.target;
        selectedElement.style.outlineColor = "#FF10F0";
        
    }
}, true)

//Ends the inspector and interrupts other keys
doc.addEventListener("keydown", (event) => {
    const key = event.key;
    if(key == "Escape") {
        container.remove();
        enabled = false;
        lastTarget.style.outline = "none";
    }
}, true)
