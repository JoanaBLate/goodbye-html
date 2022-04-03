// # Copyright (c) 2022 Feudal Code Limitada #

  
/*   
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/ 
 
 
/*
 *   This software creates canvas boxes, that you may use to produce a full HTML page (or part(s) of it).
 *
 *   A great advantage of this approach is that the final result is 100% under your control.
 *
 *   This code is (obviously) not compressed. It is up to you compress it or not.
 *
 *   This software tries to protect itself from the developer mistakes, throwing errors.
 *
 *   All args of any function are mandatory.
 *
 *
 *   More info about it at
 *   
 *   https://javascript.plainenglish.io/goodbye-html-hello-canvas-part-1-92f750961666
 *
*/

"use strict"    

///////////////////////////////////////////////////////////////////////////////

function createGoodbyeHtmlLibrary() {
    //
    let resourcesToLoad = 0
    //
    const allImages = { }
    //
    const allFonts = { }
    //
    //
    const lib = {
        //
        "allFonts": allFonts,
        "allImages": allImages,
        "createLoader": createLoader,
        //        
        "cloneImage": cloneImageUser,
        "createCanvas": createColorCanvasUser,
        "fadeImage": fadeImageUser,
        "createCheckerboard": createCheckerboardUser,
        "negativeFromImage": negativeFromImageUser,
        "createLabel": createLabelUser,
        "calcTextLength": calcTextLengthUser,
        //
        "createBox": createBox
    }
    //
    Object.freeze(lib)
    return lib

// ############################################################################
// ############################################################################
// ############################################################################



// [[source/assure.js]] #######################################################

///////////////////////////////////////////////////////////////////////////////

function argError(param, func, txt) {
    //
    let msg = "-- wrong argument " + param + " for function " + func
    //
    if (txt) { msg += ": " + txt}
    //
    throw(msg)
}

///////////////////////////////////////////////////////////////////////////////

function assureInteger(param, func, val) {
    //
    const msg = "expecting integer, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureMinimumInteger(param, func, val, min) {
    //
    const msg = "expecting integer >= " + min + ", got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
    //
    if (val < min) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureProportion(param, func, val) {
    //
    const msg = "expecting number >= 0 and <= 1, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (val < 0) { argError(param, func, msg) }
    if (val > 1) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureString(param, func, val) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
}

function assureNonEmptyString(param, func, val) {
    //
    assureString(param, func, val)
    //
    if (val == "") { argError(param, func, "got empty string") }
}

///////////////////////////////////////////////////////////////////////////////

function assureList(param, func, val) {
    //
    if (! Array.isArray(val)) { argError(param, func, "expecting list, got: " + val) }
}

function assureNonEmptyList(param, func, val) {
    //
    assureList(param, func, val)
    //
    if (val.length == 0) { argError(param, func, "got empty list") }
}

///////////////////////////////////////////////////////////////////////////////

function assureNullOrFunction(param, func, val) {
    //
    if (val === null) { return }
    if (typeof val == "function") { return }
    //
    argError(param, func, "expecting function, got: " + val)
}

///////////////////////////////////////////////////////////////////////////////

function assureImage(param, func, val) {
    //
    if (val == "") { argError(param, func, "expecting image, got empty string") }
    //
    if (typeof val != "object") { argError(param, func, "expecting image, got: " + val) }
    //
    if (val.src) { return } // image
    //
    if (val.getContext) { return } // canvas
    //
    argError(param, func, "expecting image, got: " + val)
}

///////////////////////////////////////////////////////////////////////////////

function assureColor(param, func, val) {
    //
    if (! isColor(val)) { argError(param, func, "invalid color: " + val) }
}

function assureSolidColor(param, func, val) {
    //
    assureColor(param, func, val)
    //
    if (! isSolidColor(val)) { argError(param, func, "not a solid color: " + val) }
}

///////////////////////////////////////////////////////////////////////////////

function assureGoodId(param, func, val, dict) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
    //
    if (val == "") { argError(param, func, "got empty string") }
    //
    if (dict[val] == undefined) { argError(param, func, "unknown: " + val) }
}

///////////////////////////////////////////////////////////////////////////////

function assureFreeId(param, func, val, dict) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
    //
    if (val == "") { argError(param, func, "got empty string") }
    //
    if (dict[val] != undefined) { argError(param, func, "already used id: " + val) }
}


// [[source/box.js]] ##########################################################

///////////////////////////////////////////////////////////////////////////////

function mainLoop(box) {
    //
    box.loop += 1
    //
    if (box.shallRepaint) { paintStage(box); box.shallRepaint = false }
    //
    setTimeout(function () { mainLoop(box) }, 33)
}

///////////////////////////////////////////////////////////////////////////////

function Box(width, height, parent) {
    //
    this.width = width
    this.height = height
    this.bgColor = "black"
    //
    this.parent = parent
    //
    this.stage = null
    this.stageCtx = null
    this.layers = [ ]
    this.panels = [ ]
    this.widgets = [ ]
    //
    this.focusedWidget = null
    this.lastWidgetUnderMouse = null
    //
    this.loop = 0
    this.shallRepaint = true
}

///////////////////////////////////////////////////////////////////////////////

function createBox(width, height, parent) {
    //
    assureMinimumInteger("width", "createBox", width, 30)
    //
    assureMinimumInteger("height", "createBox", height, 30)
    //
    if (parent.appendChild == undefined) { throw("-- invalid parent for the box: missing appendChild") }
    //
    const box = new Box(width, height, parent)
    //
    createStage(box)
    //
    return createBoxUser(box)
}

///////////////////////////////////////////////////////////////////////////////

function createBoxUser(box) {
    //
    const boxUser = { }
    //
    boxUser["setBgColor"] = function (color) { setStageBgColor(box, color) }
    //
    boxUser["initLayers"] = function (ids) { initLayers(box, ids) }
    //
    boxUser["exchangeLayers"] = function (ids) { exchangeLayers(box, ids) }
    //
    boxUser["getLayer"] = function (id) { return getLayerUser(box, id) }
    //
    Object.freeze(boxUser)
    //
    return boxUser
}


// [[source/button.js]] #######################################################

///////////////////////////////////////////////////////////////////////////////

function Button(panel, left, top, width, height, bgColor) { // , fontId, text) {
    //
    this.id = panel.widgets.length + 1
    //
    this.kind = "button"
    this.panel = panel
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.text = null
    this.fontId = null
    //
    this.imageNormal = createColorCanvas(width, height, bgColor)
    this.imageActive = createColorCanvas(width, height, bgColor)
    this.imagePressed = createColorCanvas(width, height, solidReversedColor(bgColor))
    this.imageDisabled = createColorCanvas(width, height, bgColor)
    //
    this.pressed = false
    this.state = "normal" // active, disabled
    //
    this.onmouseup = function () { buttonOnMouseUp(this) }
    this.onmousedown = function () { buttonOnMouseDown(this) }
    this.onmouseleave = function () { buttonOnMouseLeave(this) }
    this.onclick = null
}

///////////////////////////////////////////////////////////////////////////////

function createButton(panel, left, top, width, height, bgColor) { // , fontId, text) {
    //
    const func = "panel.createButton"
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    if (bgColor === null) { bgColor = "transparent" }
    //
    assureColor("bgColor", func, bgColor)
    /*/
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    /*/
    const button = new Button(panel, left, top, width, height, bgColor) // , fontId, text)
    //
    Object.seal(button)
    //
    assureWidgetFitsInPanel(button)
    assureWidgetDoesntClash(button)
    //
    panel.widgets.push(button)
    //
    paintButton(button)
    //
    return createButtonUser(button)
}

///////////////////////////////////////////////////////////////////////////////

function createButtonUser(button) {
    //
    const obj = {
        //
        "hide": function () { hideButton(button) },
        "show": function () { showButton(button) },
        //
        "setImageNormal": function (img) { setButtonImageNormal(button, img) },
        "setImageActive": function (img) { setButtonImageActive(button, img) },
        "setImagePressed": function (img) { setButtonImagePressed(button, img) },
        "setImageDisabled": function (img) { setButtonImageDisabled(button, img) },
        //
        "disable": function () { button.state = "disabled"; paintButton(button); button.pressed = false },
        "activate": function () { button.state = "active"; paintButton(button);  button.pressed = false },
        "normalize": function () { button.state = "normal"; paintButton(button); button.pressed = false },
        //
        "setBgColor": function (color) { setButtonBgColor(button, color) },
        //
        "setOnClick": function (handler) { setButtonOnClick(button, handler) },
        //
        "setButtonText": function (fontId, text) { setButtonText(button, fontId, text) },
        //
        "visible": function () { return button.visible },
        //
        "log": function () { console.log(button) }
    }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintButton(button) {
    //
    if (! button.visible) { paintPanelUnderWidget(button, null); return }
    //
    paintPanelUnderWidget(button, button.bgColor)
    //
    const img = getButtonImage(button)
    //
    button.panel.context.drawImage(img, button.left, button.top)
}

///////////////////////////////////////////////////////////////////////////////

function setButtonBgColor(button, color) {
    //
    if (color === null) { color = "transparent" }
    //
    assureColor("color", "button.setBgColor", color)
    //
    button.bgColor = color
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function hideButton(button) {
    //
    button.visible = false
    paintButton(button)
}

function showButton(button) {
    //
    button.visible = true
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function getButtonImage(button) {
    //
    if (button.pressed) { return button.imagePressed }
    //
    if (button.state == "normal") { return button.imageNormal }
    if (button.state == "active") { return button.imageActive }
    if (button.state == "disabled") { return button.imageDisabled }
}

///////////////////////////////////////////////////////////////////////////////

function setButtonImageNormal(button, img) {
    //
    assureImage("img", "button.setImageNormal", img)
    //
    button.imageNormal = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImageActive(button, img) {
    //
    assureImage("img", "button.setImageActive", img)
    //
    button.imageActive = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImagePressed(button, img) {
    //
    assureImage("img", "button.setImagePressed", img)
    //
    button.imagePressed = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImageDisabled(button, img) {
    //
    assureImage("img", "button.setImageDisabled", img)
    //
    button.imageDisabled = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function setButtonOnClick(button, handler) {
    //
    assureNullOrFunction("handler", "button.setOnClick", handler)
    //
    button.onclick = handler
}

///////////////////////////////////////////////////////////////////////////////

function buttonOnMouseDown(button) {
    //
    if (button.state == "disabled") { return }
    //
    button.pressed = true
    paintButton(button)
}

function buttonOnMouseLeave(button) {
    //
    if (button.pressed) {
        //
        button.pressed = false
        paintButton(button)
    }
}

function buttonOnMouseUp(button) {
    //
    if (button.pressed) {
        //
        button.pressed = false
        paintButton(button)
        //
        if (button.onclick) { button.onclick() }
    }
}


// [[source/button-text.js]] ##################################################

///////////////////////////////////////////////////////////////////////////////

function setButtonText(__button, fontId, text) {
    //
    const func = "button.setText"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
}


// [[source/decoration.js]] ###################################################

///////////////////////////////////////////////////////////////////////////////

function paintImageOnPanel(panel, left, top, img) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.paintImage"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureImage("img", func, img)
    //
    panel.context.drawImage(img, left, top)
}

///////////////////////////////////////////////////////////////////////////////

function clearRectOnPanel(panel, left, top, width, height) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.clearRect"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    panel.context.clearRect(left, top, width, height)
}

///////////////////////////////////////////////////////////////////////////////

function paintRectOnPanel(panel, left, top, width, height, color) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.paintRect"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureColor("color", func, color)
    //
    panel.context.clearRect(left, top, width, height)
    //
    panel.context.fillStyle = color
    //
    panel.context.fillRect(left, top, width, height)
}

///////////////////////////////////////////////////////////////////////////////

function writeOnPanel(panel, left, top, text) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.write"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureString("txt", func, text)
    //
    if (panel.fontId == null) {
        //
        throw("-- cannot write on panel " + panel.id + " of layer " + panel.layer.id + "; its font was not defined")
    }
    //
    const font = allFonts[panel.fontId]
    //
    return displayText(panel.context, left, top, font, text)
}

function displayText(ctx, left, top, font, text) {
    //
    for (const character of text) {
        //
        const sprite = font[character]
        ctx.drawImage(sprite, left, top)
        left += sprite.width
    }
    //
    return left
}


// [[source/helper.js]] #######################################################

///////////////////////////////////////////////////////////////////////////////

function createCanvas(width, height) {
    //
    const cnv = document.createElement("canvas")
    cnv.width  = width
    cnv.height = height
    return cnv
}

function createColorCanvas(width, height, color) {
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
    return cnv
}

function createColorCanvasUser(width, height, color) {
    //
    const func = "createCanvas"
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    if (color) {
        assureColor("color", func, color)
        //
        return createColorCanvas(width, height, color)
    }
    //
    return createCanvas(width, height)
}

///////////////////////////////////////////////////////////////////////////////

function cloneImage(img) {
    //
    const cnv = createCanvas(img.width, img.height)
    const ctx = cnv.getContext("2d")
    ctx.drawImage(img, 0, 0)
    return cnv
}

function cloneImageUser(img) {
    //
    assureImage("img", "cloneImage", img)
    //
    return cloneImage(img)
}

///////////////////////////////////////////////////////////////////////////////

function adjustedImage(img, width, height) {
    //
    const cnv = createCanvas(width, height)
    cnv.getContext("2d").drawImage(img, 0, 0)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function isColor(val) {
    //
    if (typeof val != "string") { return false }
    //
    if (val == "") { return false }
    //
    if (val.toLowerCase() == "transparent") { return true }
    //
    const s = new Option().style
    s.color = val
    return s.color !== ""
}

function isSolidColor(color) {
    //
    const cnv = createCanvas(1, 1)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    //
    const data = ctx.getImageData(0, 0, 1, 1).data
    //
    return (data[3] == 255)
}

function solidReversedColor(color) {
    //
    const cnv = createCanvas(1, 1)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    //
    const data = ctx.getImageData(0, 0, 1, 1).data
    //
    const r = 255 - data[0]
    const g = 255 - data[1]
    const b = 255 - data[2]
    //
    return "rgb(" + r + "," + g + "," + b + ")"
}


// [[source/layer.js]] ########################################################

///////////////////////////////////////////////////////////////////////////////

function createLayer(id, box) {
    //
    const layer = { "id": id, "box": box, "visible": true, "panels": [ ] }
    //
    Object.seal(layer)
    //
    return layer
}

///////////////////////////////////////////////////////////////////////////////

function getLayer(box, id) {
    //
    for (const layer of box.layers) {
        //
        if (layer.id == id) { return layer }
    }
    return null
}

function getLayerOrClash(box, id, func) {
    //
    const layer = getLayer(box, id)
    //
    if (layer != null) { return layer }
    //
    argError("id", func, "unknown layer: " + id)
}

/////////////////////////////////////////////////////////////////////////////////

function getLayerUser(box, id) {
    //
    const layer = getLayerOrClash(box, id, "box.getLayer")
    //
    const obj = {
        //
        "id": layer.id,
        //
        "createPanel": function (left, top, width, height, bgColor) { return createPanel(layer, left, top, width, height, bgColor) },
        //
        "show": function () { layer.visible = true; box.shallRepaint = true },
        //
        "hide": function () { layer.visible = false; box.shallRepaint = true },
        //
        "visible": function () { return layer.visible },
        //
        "log": function () { console.log(layer) }
    }
    //
    Object.freeze(obj)
    return obj
}

/////////////////////////////////////////////////////////////////////////////////

function initLayers(box, ids) {
    //
    const param = "ids"
    const func = "box.createLayers"
    //
    if (box.layers.length != 0) { throw("-- calling again function " + func) }
    //
    assureNonEmptyList(param, func, ids)
    //
    for (const id of ids) {
        //
        if (typeof id != "string") { argError(param, func, "this item is not a string: " + id) }
        //
        if (id === "") { argError(param, func, "empty string inside the list") }
        //
        if (getLayer(box, id) != null) { argError(param, func, "duplicated id: " + id) }
        //
        const layer = createLayer(id, box)
        //
        box.layers.push(layer)
    }
}

///////////////////////////////////////////////////////////////////////////////

function exchangeLayers(box, ids) {
    //
    box.shallRepaint = true
    //
    const param = "ids"
    const func = "box.exchangeLayers"
    //
    assureList(param, func, ids)
    //
    if (ids.length != box.layers.length) {
        //
        argError(param, func, "expecting list with " + box.layers.length + " items, got: " + ids.length + " items")
    }
    //
    const doneIds = [ ]
    const layers = [ ]
    //
    for (const id of ids) {
        //
        if (typeof id != "string") { argError(param, func, "this item is not a string: " + id) }
        //
        if (id === "") { argError(param, func, "empty string inside the list") }
        //
        if (doneIds.includes(id)) { argError(param, func, "duplicated item: " + id) }
        //
        const layer = getLayer(box, id)
        //
        if (layer == null) { argError(param, func, "unknown virtual layer: " + id) }
        //
        doneIds.push(id)
        layers.push(layer)
    }
    //
    box.layers = layers
}


// [[source/loader.js]] #######################################################

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
        throw("-- wrong argument callback for function loader.ready, got: " + callback)
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
        throw("-- wrong argument obj for function loader.loadFont, got: " + id)
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
        throw("-- the height of the source image for font " + id +
             " divided by the number of the rows of the reference is not an integer")
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


// [[source/mouse-handler.js]] ################################################

///////////////////////////////////////////////////////////////////////////////

function setStageHandlers(box) {
    //
    box.stage.onmouseleave = function () { stageOnMouseLeave(box) }
    //
    box.stage.onmousemove = function (e) { stageOnMouseMove(box, e) }
    //
    box.stage.onmousedown = function (e) { stageOnMouseDown(box, e) }
    //
    box.stage.onmouseup = function (e) { stageOnMouseUp(box, e) }
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseLeave(box) {
    //
    tryOnMouseLeave(box.lastWidgetUnderMouse)
    box.lastWidgetUnderMouse = null
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseMove(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    const dragging = isDragging(e)
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) {
        //
        tryOnMouseLeave(box.lastWidgetUnderMouse)
        box.lastWidgetUnderMouse = null
        return
    }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    const last = box.lastWidgetUnderMouse
    //
    box.lastWidgetUnderMouse = widget
    //
    //
    if (dragging  &&  widget != last) { box.focusedWidget = null }
    //
    //
    if (widget == null  &&  last == null) { return }
    //
    if (widget == null  &&  last != null) { tryOnMouseLeave(last); return }
    //
    if (widget != null  &&  last == null) {
        //
        tryOnMouseEnter(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
        //
        tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
        //
        return
    }
    //
    if (widget == last) { tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey); return }
    //
    // both not null and not the same
    //
    tryOnMouseLeave(last)
    //
    tryOnMouseEnter(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
    tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseDown(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) { return }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    box.lastWidgetUnderMouse = widget
    //
    box.focusedWidget = widget
    //
    if (widget == null) { return }
    //
    tryOnMouseDown(widget, x-widget.left, y-widget.top, e.shiftKey, e.ctrlKey)
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseUp(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) { return }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    box.lastWidgetUnderMouse = widget
    //
    if (widget == null) { return }
    //
    tryOnMouseUp(widget, x-widget.left, y-widget.top)
}


// [[source/mouse-helper.js]] #################################################

///////////////////////////////////////////////////////////////////////////////

function isDragging(e) {
    //
 // const dragging = (e.which == 1)  // good for chrome, bad for firefox (always 1)
 // const dragging = (e.button == 1) // only for pressing and releasing
    //
    return (e.buttons == 1)
}

///////////////////////////////////////////////////////////////////////////////

function findPanelUnderMouse(layers, x, y) {
    //
    const last = layers.length - 1
    //
    for (let n = last; n >= 0; n--) {
        //
        const layer = layers[n]
        //
        if (! layer.visible) { continue }
        //
        const panel = findPanelUnderMouseInLayer(layer, x, y)
        //
        if (panel != null) { return panel }
    }
}

function findPanelUnderMouseInLayer(layer, x, y) {
    //
    for (const panel of layer.panels) {
        //
        if (! panel.visible) { continue }
        //
        if (panel.left > x) { continue }
        if (panel.left + panel.width < x) { continue }
        //
        if (panel.top > y) { continue }
        if (panel.top + panel.height < y) { continue }
        //
        return panel
    }
    //
    return null
}

///////////////////////////////////////////////////////////////////////////////

function findWidgetUnderMouse(panel, x, y) {
    //
    for (const widget of panel.widgets) {
        //
        if (widget.left > x) { continue }
        if (widget.left + widget.width < x) { continue }
        //
        if (widget.top > y) { continue }
        if (widget.top + widget.height < y) { continue }
        //
        return widget
    }
    //
    return null
}

///////////////////////////////////////////////////////////////////////////////

function tryOnMouseLeave(widget) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseleave) { widget.onmouseleave() }
}

///////////////////////////////////////////////////////////////////////////////

function tryOnMouseEnter(widget, x, y, dragging, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseenter) { widget.onmouseenter(x, y, dragging, shiftKey, ctrlKey) }
}

///////////////////////////////////////////////////////////////////////////////

function tryOnMouseMove(widget, x, y, dragging, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmousemove) { widget.onmousemove(x, y, dragging, shiftKey, ctrlKey) }
}

///////////////////////////////////////////////////////////////////////////////

function tryOnMouseDown(widget, x, y, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmousedown) { widget.onmousedown(x, y, shiftKey, ctrlKey) }
}

///////////////////////////////////////////////////////////////////////////////

function tryOnMouseUp(widget, x, y) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseup) { widget.onmouseup(x, y) }
}


// [[source/panel.js]] ########################################################

///////////////////////////////////////////////////////////////////////////////

function Panel(layer, left, top, width, height, bgColor) {
    //
    this.id = layer.panels.length + 1
    //
    this.layer = layer
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.canvas = createCanvas(width, height)
    this.context = this.canvas.getContext("2d")
    //
    this.fontId = null
    //
    this.widgets = [ ]
}

///////////////////////////////////////////////////////////////////////////////

function createPanel(layer, left, top, width, height, bgColor) {
    //
    layer.box.shallRepaint = true
    //
    const func = "layer.createPanel"
    //
    assureMinimumInteger("width", func, width, 10)
    //
    assureMinimumInteger("height", func, height, 10)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    if (bgColor === null) { bgColor = "transparent" }
    //
    assureColor("bgColor", func, bgColor)
    //
    const panel = new Panel(layer, left, top, width, height, bgColor)
    //
    Object.seal(panel)
    //
    assurePanelFitsInStage(panel)
    assurePanelDoesntClash(panel)
    //
    layer.panels.push(panel)
    //
    return createPanelUser(panel)
}

///////////////////////////////////////////////////////////////////////////////

function createPanelUser(panel) {
    //
    const obj = {
        //
        "hide": function () { hidePanel(panel) },
        "show": function () { showPanel(panel) },
        //
        "write": function (left, top, txt) { return writeOnPanel(panel, left, top, txt) },
        //
        "setFont": function (id) { setPanelFont(panel, id) },
        //
        "clearRect": function (left, top, width, height, color) {
            //
            clearRectOnPanel(panel, left, top, width, height, color)
        },
        //
        "paintRect": function (left, top, width, height, color) {
            //
            paintRectOnPanel(panel, left, top, width, height, color)
        },
        //
        "paintImage": function (left, top, img) { paintImageOnPanel(panel, left, top, img) },
        //
        "setBgColor": function (color) { setPanelBgColor(panel, color) },
        //
        "createButton": function (left, top, width, height, bgColor) { return createButton(panel, left, top, width, height, bgColor) },
        //
        "createSurface": function (left, top, width, height, bgColor) { return createSurface(panel, left, top, width, height, bgColor) },
        //
        "visible": function () { return panel.visible },
        //
        "log": function () { console.log(panel) }
    }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintPanelBgOnStage(panel) { // so, writings are not erased ;)
    //
    const box = panel.layer.box
    //
    box.stageCtx.fillStyle = panel.bgColor
    //
    box.stageCtx.fillRect(panel.left, panel.top, panel.width, panel.height)
}

function paintPanelCanvasOnStage(panel) {
    //
    const box = panel.layer.box
    //
    box.stageCtx.drawImage(panel.canvas, panel.left, panel.top)
}

///////////////////////////////////////////////////////////////////////////////

function setPanelFont(panel, id) {
    //
    assureGoodId("id", "panel.setFont", id, allFonts)
    //
    panel.fontId = id
}

///////////////////////////////////////////////////////////////////////////////

function setPanelBgColor(panel, color) {
    //
    assureColor("color", "panel.setBgColor", color)
    //
    panel.bgColor = color
    //
    panel.layer.box.shallRepaint = true
}

///////////////////////////////////////////////////////////////////////////////

function hidePanel(panel) {
    //
    panel.visible = false
    panel.layer.box.shallRepaint = true
}

function showPanel(panel) {
    //
    panel.visible = true
    panel.layer.box.shallRepaint = true
}

///////////////////////////////////////////////////////////////////////////////

function assurePanelFitsInStage(panel) {
    //
    // minimum left & top checked at createPanel
    //
    const box = panel.layer.box
    //
    const id = panel.id + " of layer " + panel.layer.id
    //
    if (panel.left + panel.width > box.width) { throw("-- panel " + id + " passes right edge of stage") }
    //
    if (panel.top + panel.height > box.height) { throw("-- panel " + id + " passes bottom edge of stage") }
}

///////////////////////////////////////////////////////////////////////////////

function assurePanelDoesntClash(panel) {
    //
    for (const neighbor of panel.layer.panels) {
        //
        if (neighbor.left + neighbor.width <= panel.left) { continue } // neighbor at left
        //
        if (panel.left + panel.width <= neighbor.left) { continue } // neighbor at right
        //
        if (neighbor.top + neighbor.height <= panel.top) { continue } // neighbor is above
        //
        if (panel.top + panel.height <= neighbor.top) { continue } // neighbor is below
        //
        throw("-- panel " + panel.id + " clashes with panel " + neighbor.id + " in layer " + panel.layer.id)
    }
}

///////////////////////////////////////////////////////////////////////////////

function paintPanelUnderWidget(widget, color) {
    //
    const panel = widget.panel
    //
    panel.layer.box.shallRepaint = true
    //
    panel.context.clearRect(widget.left, widget.top, widget.width, widget.height)
    //
    if (color) {
        //
        panel.context.fillStyle = color
        //
        panel.context.fillRect(widget.left, widget.top, widget.width, widget.height)
    }
}


// [[source/stage.js]] ########################################################

///////////////////////////////////////////////////////////////////////////////

function createStage(box) {
    //
    box.stage = createCanvas(box.width, box.height)
    box.stageCtx = box.stage.getContext("2d")
    //
    box.stage.display = "inline-block"
    box.stage.style.margin = "0px"
    box.stage.style.padding = "0px"
    box.stage.style.top = "0px"
    box.stage.style.left = "0px"
    box.stage.style.backgroundColor = box.bgColor
    //
    box.parent.appendChild(box.stage)
    //
    setStageHandlers(box)
    //
    mainLoop(box)
}

///////////////////////////////////////////////////////////////////////////////

function setStageBgColor(box, color) {
    //
    if (color === null) { color = "transparent" }
    //
    assureColor("color", "box.setBgColor", color)
    //
    box.stage.style.backgroundColor = color
}

///////////////////////////////////////////////////////////////////////////////

function paintStage(box) {
    //
    box.stageCtx.clearRect(0, 0, box.width, box.height)
    //
    for (const layer of box.layers) { paintLayer(layer) }
}

function paintLayer(layer) {
    //
    if (! layer.visible) { return }
    //
    for (const panel of layer.panels) {
        //
        if (! panel.visible) { continue }
        //
        paintPanelBgOnStage(panel)
        paintPanelCanvasOnStage(panel)
    }
}


// [[source/surface.js]] ######################################################

///////////////////////////////////////////////////////////////////////////////

function Surface(panel, left, top, width, height, bgColor) {
    //
    this.id = panel.widgets.length + 1
    //
    this.kind = "surface"
    this.panel = panel
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.canvas = createCanvas(width, height)
    this.context = this.canvas.getContext("2d")
    //
    this.onmouseleave = null
    this.onmouseenter = null
    this.onmousemove = null
    this.onmouseup = null
    this.onmousedown = null
}

///////////////////////////////////////////////////////////////////////////////

function createSurface(panel, left, top, width, height, bgColor) {
    //
    const func = "panel.createSurface"
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    if (bgColor === null) { bgColor = "transparent" }
    //
    assureColor("bgColor", func, bgColor)
    //
    const surface = new Surface(panel, left, top, width, height, bgColor)
    //
    Object.seal(surface)
    //
    assureWidgetFitsInPanel(surface)
    assureWidgetDoesntClash(surface)
    //
    panel.widgets.push(surface)
    //
    paintSurface(surface)
    //
    return createSurfaceUser(surface)
}

///////////////////////////////////////////////////////////////////////////////

function createSurfaceUser(surface) {
    //
    const obj = {
        //
        "hide": function () { hideSurface(surface) },
        "show": function () { showSurface(surface) },
        //
        "setImage": function (img) { setSurfaceImage(surface, img) },
        //
        "setBgColor": function (color) { setSurfaceBgColor(surface, color) },
        //
        "setOnMouseUp": function (h) { setSurfaceOnMouseUp(surface, h) },
        "setOnMouseDown": function (h) { setSurfaceOnMouseDown(surface, h) },
        "setOnMouseMove": function (h) { setSurfaceOnMouseMove(surface, h) },
        "setOnMouseEnter": function (h) { setSurfaceOnMouseEnter(surface, h) },
        "setOnMouseLeave": function (h) { setSurfaceOnMouseLeave(surface, h) },
        //
        "visible": function () { return surface.visible },
        //
        "log": function () { console.log(surface) }
    }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintSurface(surface) {
    //
    if (! surface.visible) { paintPanelUnderWidget(surface, null); return }
    //
    paintPanelUnderWidget(surface, surface.bgColor)
    //
    surface.panel.context.drawImage(surface.canvas, surface.left, surface.top)
}

///////////////////////////////////////////////////////////////////////////////

function setSurfaceBgColor(surface, color) {
    //
    if (color === null) { color = "transparent" }
    //
    assureColor("color", "surface.setBgColor", color)
    //
    surface.bgColor = color
    //
    paintSurface(surface)
}

///////////////////////////////////////////////////////////////////////////////

function hideSurface(surface) {
    //
    surface.visible = false
    paintSurface(surface)
}

function showSurface(surface) {
    //
    surface.visible = true
    paintSurface(surface)
}

///////////////////////////////////////////////////////////////////////////////

function setSurfaceImage(surface, img) {
    //
    assureImage("img", "surface.setImage", img)
    //
    surface.context.clearRect(0, 0, surface.width, surface.height)
    //
    surface.context.drawImage(img, 0, 0)
    //
    paintSurface(surface)
}

///////////////////////////////////////////////////////////////////////////////

function setSurfaceOnMouseEnter(surface, handler) {
    //
    assureNullOrFunction("handler", "surface.setOnMouseEnter", handler)
    //
    surface.onmouseenter = handler
}

function setSurfaceOnMouseLeave(surface, handler) {
    //
    assureNullOrFunction("handler", "surface.setOnMouseLeave", handler)
    //
    surface.onmouseleave = handler
}

function setSurfaceOnMouseMove(surface, handler) {
    //
    assureNullOrFunction("handler", "surface.setOnMouseMove", handler)
    //
    surface.onmousemove = handler
}

function setSurfaceOnMouseDown(surface, handler) {
    //
    assureNullOrFunction("handler", "surface.setOnMouseDown", handler)
    //
    surface.onmousedown = handler
}

function setSurfaceOnMouseUp(surface, handler) {
    //
    assureNullOrFunction("handler", "surface.setOnMouseUp", handler)
    //
    surface.onmouseup = handler
}


// [[source/utils.js]] ########################################################

///////////////////////////////////////////////////////////////////////////////

function createLabelUser(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const func = "library.createLabel"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureColor("bgColor", func, bgColor)
    //
    assureMinimumInteger("padLeft", func, padLeft, 0)
    //
    assureMinimumInteger("padRight", func, padRight, 0)
    //
    assureMinimumInteger("padTop", func, padTop, 0)
    //
    assureMinimumInteger("padBottom", func, padBottom, 0)
    //
    assureNonEmptyString("text", func, text)
    //
    return createLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text)
}

function createLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const font = allFonts[fontId]
    //
    const sample = font[text[0]]
    //
    const width = padLeft + calcTextLength(fontId, text) + padRight
    //
    const height = padTop + sample.height + padBottom
    //
    const cnv = createColorCanvas(width, height, bgColor)
    const ctx = cnv.getContext("2d")
    //
    displayText(ctx, padLeft, padTop, font, text)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function calcTextLengthUser(fontId, text) {
    //
    const func = "library.calcTextLength"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    return calcTextLength(fontId, text)
}

function calcTextLength(fontId, text) {
    //
    const font = allFonts[fontId]
    //
    let len = 0
    //
    for (const symbol of text) { len += font[symbol].width }
    //
    return len
}

///////////////////////////////////////////////////////////////////////////////

function negativeFromImageUser(img) {
    //
    assureImage("img", "library.negativeFromImage", img)
    //
    return negativeFromImage(img)
}

function negativeFromImage(img) {
    //
    const cnv = cloneImage(img)
    const ctx = cnv.getContext("2d")
    //
    const imgdata = ctx.getImageData(0, 0, cnv.width, cnv.height)
    const data = imgdata.data
    //
    let index = data.length - 1
    //
    while (index >= 0) {
        //
        // skipping alpha
        data[index - 1] = 255 - data[index - 1] // blue
        data[index - 2] = 255 - data[index - 2] // green
        data[index - 3] = 255 - data[index - 3] // red
        //
        index -= 4
    }
    //
    ctx.putImageData(imgdata, 0, 0)
    return cnv
}

//////////////////////////////////////////////////////////////////////////////

function fadeImageUser(img, color, opacity) {
    //
    const func = "library.fadeImage"
    //
    assureImage("img", func, img)
    //
    assureSolidColor("color", func, color)
    //
    assureProportion("opacity", func, opacity)
    //
    return fadeImage(img, color, opacity)
}

function fadeImage(img, color, opacity) {
    //
    const cnv = createColorCanvas(img.width, img.height, color)
    const ctx = cnv.getContext("2d")
    //
    ctx.globalAlpha = opacity
    ctx.drawImage(img, 0, 0)
    ctx.globalAlpha = 1
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function createCheckerboardUser(width, height, w, h, colorA, colorB) {
    //
    const func = "createCheckerboard"
    //
    assureMinimumInteger("width", func, width, 3)
    //
    assureMinimumInteger("height", func, height, 3)
    //
    assureMinimumInteger("w", func, w, 1)
    //
    assureMinimumInteger("h", func, h, 1)
    //
    assureColor("colorA", func, colorA)
    //
    assureColor("colorB", func, colorB)
    //
    return createCheckerboard(width, height, w, h, colorA, colorB)
}

function createCheckerboard(width, height, w, h, colorA, colorB) {
    //
    const base = createColorCanvas(width, height, colorA)
    const ctx = base.getContext("2d")
    //
    const a = null
    const b = createColorCanvas(w, h, colorB)
    //
    //
    let left = 0
    let top = 0
    let imgs = [a, b]
    let start = [a, b]
    //
    while (true) {
        //
        const img = imgs[0]
        if (img) { ctx.drawImage(img, left, top) }
        //
        imgs.push(imgs.shift())
        left += 50
        if (left < 800) { continue }
        //
        left = 0
        top += 50
        start.push(start.shift())
        imgs = start.slice(0)
        //
        if (top == 450) { break }
    }
    //
    return base
}


// [[source/widget.js]] #######################################################

///////////////////////////////////////////////////////////////////////////////

function assureWidgetFitsInPanel(w) { // minimum left & top checked
    //
    const panel = w.panel
    //
    const txt1 = "-- widget " + w.id + " passes "
    //
    const txt2 = " edge of panel " + panel.id + " of layer " + panel.layer.id
    //
    if (w.left + w.width > panel.width)  { throw(txt1 + "right" + txt2) }
    //
    if (w.top + w.height > panel.height) { throw(txt1 + "bottom" + txt2) }
}

///////////////////////////////////////////////////////////////////////////////

function assureWidgetDoesntClash(w) {
    //
    for (const candidate of w.panel.widgets) {
        //
        if (candidate.left + candidate.width <= w.left) { continue } // candidate at left
        //
        if (w.left + w.width <= candidate.left) { continue } // candidate at right
        //
        if (candidate.top + candidate.height <= w.top) { continue } // candidate is above
        //
        if (w.top + w.height <= candidate.top) { continue } // candidate is below
        //
        throw("-- widget " + w.id + " clashes with widget " + candidate.id)
    }
}

} // end of library 
