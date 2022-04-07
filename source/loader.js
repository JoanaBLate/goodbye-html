// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function createLoader() {
    //
    const loader = {
        //
        "loadFont": loadFont,
        "loadImage": loadImage,
        "ready": setLoaderCallback
    }
    //
    Object.freeze(loader)
    //
    return loader
}

function setLoaderCallback(callback) {
    //
    if (typeof callback != "function") {
        throw "-- wrong argument callback for function loader.ready, got: " + callback
    }
    //
    loaderDone(callback)
}

function loaderDone(callback) {
    //
    if (resourcesToLoad == 0) { callback(); return }
    //
    setTimeout(function () { loaderDone(callback) }, 33)
}

///////////////////////////////////////////////////////////////////////////////

function loadImage(id, src) {
    //
    assureFreeId("id", "loader.loadImage", id, allImages)
    //
    allImages[id] = null
    //
    assureNonEmptyString("src", "loader.loadImage", src)
    //
    loadImageCore(id, src)
}

function loadImageCore(id, src) {
    //
    resourcesToLoad += 1
    //
    const img = new Image()
    //
    img.onload = function () { 
        //
        resourcesToLoad -= 1
        allImages[id] = cloneImage(img) 
    }
    //
    img.onerror = function () { console.log("ERROR: could not load image for " + id) }
    //
    img.src = src
}

///////////////////////////////////////////////////////////////////////////////

function loadFont(id, obj) {
    //
    assureFreeId("id", "loader.loadFont", id, allFonts)
    //
    allFonts[id] = null
    //
    if (typeof obj != "object") {
        //
        throw "-- wrong argument obj for function loader.loadFont, got: " + id
    }
    //
    assureNonEmptyString("object.src", "loader.loadFont", obj.src)
    //
    assureNonEmptyList("object.ref", "loader.loadFont", obj.ref)
    //    
    loadFontCore(id, obj.src, obj.ref)
}

function loadFontCore(id, src, ref) {
    //
    resourcesToLoad += 1
    //
    const img = new Image()
    //
    img.onload = function () { 
        //
        resourcesToLoad -= 1
        //
        allFonts[id] = createFont(id, cloneImage(img), ref)
    }
    //
    img.onerror = function () { console.log("ERROR: could not load font source for " + id) }
    //
    img.src = src
}

///////////////////////////////////////////////////////////////////////////////

// IMPORTANT: function createSpace is fed with font["."]

// IMPORTANT: first pixel of the image must match its background color (even if transparent)

function createFont(id, sheet, reference) {
    //
    const pixel = sheet.getContext("2d").getImageData(0, 0, 1, 1).data
    //
    const R = pixel[0]
    const G = pixel[1]
    const B = pixel[2]
    const A = pixel[3]
    //
    const numberOfRows = reference.length
    const height = sheet.height / numberOfRows
    //
    if (Math.floor(height) != height) { 
        //
        throw "-- the height of the source image for font " + id + 
             " divided by the number of the rows of the reference is not an integer"
    }
    // 
    let dict = { }
    //  
    let top = 0
    // 
    for (const rowReference of reference) {
        //   
        const row = createCanvas(sheet.width, height)
        //
        row.getContext("2d").drawImage(sheet, 0, -top)
        //
        top += height
        //        
        processRow(dict, row, rowReference, R, G, B, A)
    }
    //
    dict[" "] = createSpace(dict["."], R, G, B, A)
    return dict
}

function processRow(dict, row, rowReference, R, G, B, A) {
    //
    const width = row.width
    const height = row.height
    //
    const data = row.getContext("2d").getImageData(0, 0, width, height).data
    //    
    const symbols = rowReference.split("")
    //
    let left = -1
    //
    for (const symbol of symbols) {
        //
        // finding the start of the symbol
        //
        while (true) {
            //
            left += 1
            if (left >= width) { return }
            //
            if (! isBlankCol(data, width, height, left, R, G, B, A)) { break }
        }
        const start = left
        //
        // finding the end of the symbol 
        //
        while (true) {
            //
            left += 1
            if (isBlankCol(data, width, height, left, R, G, B, A)) { break }
        }
        //
        const symbolWidth = left - start
        //
        const cnv = createCanvas(symbolWidth, height)
        cnv.getContext("2d").drawImage(row, -start, 0)
        //
        dict[symbol] = cnv
    }
}

function isBlankCol(data, width, height, x, R, G, B, A) {
    //
    if (x >= width) { return true } // out of canvas
    //
    for (let y = 0; y < height; y++) {
        const index = 4 * (width * y + x)
        if (data[index]     != R) { return false }
        if (data[index + 1] != G) { return false }
        if (data[index + 2] != B) { return false }
        if (data[index + 3] != A) { return false }
    }
    return true
} 

function createSpace(sample, R, G, B, A) {
    //
    const cnv = cloneImage(sample)
    const ctx = cnv.getContext("2d")
    //
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    //
    ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")"
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    //    
    return cnv
}

