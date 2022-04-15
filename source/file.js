// # Copyright (c) 2014-2022 Feudal Code Limitada #
"use strict"

///////////////////////////////////////////////////////////////////////////////

function initLoadAndSave() {
    //
    createFileSelector()
    createDownloadLink()
    //
    const div = document.createElement("div")
    div.style.position = "fixed"
    div.style.visibility = "hidden"
    div.style.zIndex = "-999999"
    //
    div.appendChild(downloadLink)
    div.appendChild(fileSelector)
    //
    document.body.appendChild(div) 
}

function createFileSelector() {
    fileSelector = document.createElement("input")
    fileSelector.type = "file"
}

function createDownloadLink() {
    downloadLink = document.createElement("a")
    downloadLink.text = "pseudo-download-link"
    downloadLink.target = "_blank"
    downloadLink.href = ""
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function loadImage(callback) {
    //
    if (fileSelector == null) { initLoadAndSave() }
    //
    fileSelector.value = "" // or else same file will not trigger onchange event again
    //
    fileSelector.onchange = function () { fileSelectorImageChanged(callback) }
    //
    clickHtmlElement(fileSelector)
}    
    
function fileSelectorImageChanged(callback) {
    //
    const file = fileSelector.files[0]
    //
    if (file == undefined) { console.log("image loading aborted"); return } // should not happen
    //
    console.log("loading:", file.type, "  ", file.name, "  bytes:", file.size)
    //
    const kind = getFileNameExtension(file.name)
    if (kind == null) { console.log("ERROR: file name extension is not valid:", file.name); return }
    //
    const reader = new FileReader()
    reader.onloadend = function (e) { readerEndedLoadingImage(file.name, e.target.result, callback) }
    reader.readAsDataURL(file)
}

function readerEndedLoadingImage(__filename, data, callback) {
    //
    const img = document.createElement("img")
    img.onload = function () { callback(img) }
    img.src = data
}

///////////////////////////////////////////////////////////////////////////////

function getFileNameExtension(name) {
    const index = name.lastIndexOf(".")
    if (index == -1) { return null }
    //
    const end = name.toLowerCase().substr(index)
    if (end == ".bmp")  { return "bmp" }
    if (end == ".png")  { return "png" }
    if (end == ".svg")  { return "svg" }
    if (end == ".jpg")  { return "jpg" }
    if (end == ".ico")  { return "ico" }
    if (end == ".gif")  { return "gif" }
    if (end == ".jpeg") { return "jpeg" }
    if (end == ".webp") { return "webp" }
    //
    return null    
}  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
function saveImage(filename, image) {
    //
    if (downloadLink == null) { initLoadAndSave() }
    //
    const func = "goodbye.saveImage"
    //
    assureNonEmptyString("filename", func, filename)
    //
    assureImage(func, "image", image)
    // 
    downloadLink.download = filename // pseudo download
    //
    const data = cloneImage(image).toDataURL("image/png")
    //
    downloadLink.href = data
    clickHtmlElement(downloadLink)
}

