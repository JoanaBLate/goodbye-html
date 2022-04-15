
// # Copyright (c) 2022 Feudal Code Limitada #

// MIT License
  
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

function createGoodbyeHtmlLibrary() {





// [[source/globals.js]] ######################################################


const allImages = { }

const allFonts = { }

let resourcesToLoad = 0

let fileSelector = null
let downloadLink = null


// [[source/alert-confirm-prompt.js]] #########################################



    // UNDER CONSTRUCTION //


///////////////////////////////////////////////////////////////////////////////

function setFontsForSpecialLayers(__fontId1, __fontId2) {
    //
}

///////////////////////////////////////////////////////////////////////////////


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

function assureBoolean(param, func, val) {
    //
    if (val === true  ||  val === false) { return }
    //
    argError(param, func, "expecting boolean, got: " + val)
}

///////////////////////////////////////////////////////////////////////////////

function __assureNumber(param, func, val) {
    //
    const msg = "expecting number, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
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

function assureThisInteger(param, func, val, ref) {
    //
    const msg = "expecting integer == " + ref + ", got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
    //
    if (val != ref) { argError(param, func, msg) }
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
    argError(param, func, "expecting null or function, got: " + val)
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

function assureName(param, func, val) {
    //
    if (typeof val != "string") { argError(param, func, "expecting name, got: " + val) }
    //
    if (val == "") { argError(param, func, "expecting name, got empty string") }
    //
    if (val != val.toLowerCase()) {
        //
        argError(param, func, "upper case letter(s) in name: " + val)
    }
    //
    if (val[0] < "a" || val[0] > "z") {
        //
        argError(param, func, "name not starting with letter: " + val)
    }
    //
    for (const c of val) {
        //
        if (c >= "a"  &&  c <= "z") { continue }
        if (c >= "0"  &&  c <= "9") { continue }
        if (c != "-") {
            //
            argError(param, func, "invalid character '" + c + "' in name: " + val)
        }
    }
    //
    return val
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
    updateBlinking(box)
    //
    if (box.shallRepaint) { paintStage(box); box.shallRepaint = false }
    //
    setTimeout(function () { mainLoop(box) }, 16)
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
    //
    this.layers = [ ]
    //
    this.elements = { }
    //
    this.focusedWidget = null
    this.lastWidgetUnderMouse = null
    //
    this.blinking = false // means the red phase of blinking
    this.blinkingClock = 0
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
    if (parent.appendChild == undefined) { throw "-- invalid parent for the box: missing appendChild" }
    //
    const box = new Box(width, height, parent)
    Object.seal(box)
    //
    createStage(box)
    //
    box.stage.tabIndex = "-1"
    box.stage.onkeydown = function (e) { keyDownHandler(box, e) }
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
    boxUser["initLayers"] = function (names) { initLayers(box, names) }
    //
    boxUser["getOrderOfLayers"] = function () { return orderOfLayers(box) }
    //
    boxUser["get"] = function (id) { return getUser(box, id) }
    //
    boxUser["resetFocus"] = function () { resetFocus(box) }
    //
    boxUser["log"] = function () { console.log(box) }
    //
    Object.freeze(boxUser)
    //
    return boxUser
}

///////////////////////////////////////////////////////////////////////////////

function getUser(box, id) {
    //
    assureString("id", "box.get", id)
    //
    const element = box.elements[id]
    //
    if (element == undefined) { throw "no element matches this id: " + id }
    //
    return element
}

///////////////////////////////////////////////////////////////////////////////

function setFocus(box, widget) {
    //
    if (widget == null) { box.focusedWidget = null; return }
    //
    if (widget.kind == "textbox") { box.focusedWidget = widget }
}

function resetFocus(box) {
    //
    box.blinking = false
    //
    const widget = box.focusedWidget
    //
    box.focusedWidget = null
    //
    if (widget == null) { return }
    //
    if (widget.kind == "textbox") { paintTextbox(widget) }
}

///////////////////////////////////////////////////////////////////////////////

function startBlinking(widget) { // must be the box.focusedWidget
    //
    const box = widget.panel.layer.box
    //
    box.blinking = true
    //
    box.blinkingClock = box.loop + blinkingDuration(box.blinking)
    //
    paintTextbox(widget)
}

function updateBlinking(box) {
    //
    if (box.blinkingClock != box.loop) { return }
    //
    const widget = box.focusedWidget
    //
    if (widget == null) { return }
    //
    if (widget.kind != "textbox") { return }
    //
    box.blinking = ! box.blinking
    box.blinkingClock = box.loop + blinkingDuration(box.blinking)
    //
    paintTextbox(widget)
}

function blinkingDuration(blinking) {
    //
    return blinking ? 40 : 30
}


// [[source/button.js]] #######################################################


///////////////////////////////////////////////////////////////////////////////

function Button(panel, id, left, top, width, height, bgColor) {
    //
    this.panel = panel
    //
    this.kind = "button"
    //
    this.id = id
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.text = null
    this.fontId = null
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.pressed = false
    this.disabled = false
    this.active = false
    //
    this.imageNormal = createColorCanvas(width, height, bgColor)
    this.imageActive = createColorCanvas(width, height, bgColor)
    this.imagePressed = createColorCanvas(width, height, solidReversedColor(bgColor))
    this.imageDisabled = createColorCanvas(width, height, bgColor)
    //
    this.onmouseup = function () { buttonOnMouseUp(this) }
    this.onmousedown = function () { buttonOnMouseDown(this) }
    this.onmouseleave = function () { buttonOnMouseLeave(this) }
    this.onclick = null
}

///////////////////////////////////////////////////////////////////////////////

function createButton(panel, name, left, top, width, height, bgColor) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createButton"
    //
    assureName("name", func, name)
    //
    const id = panel.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureSolidColor("bgColor", func, bgColor)
    //
    const button = new Button(panel, id, left, top, width, height, bgColor)
    //
    Object.seal(button)
    //
    assureWidgetFitsInPanel(button)
    assureWidgetDoesntClash(button)
    //
    panel.widgets.push(button)
    //
    box.elements[id] = createButtonUserObj(button)
    //
    paintButton(button)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createButtonUserObj(button) {
    //
    const obj = { }
    //
    obj["hide"] = function () { button.visible = false; paintButton(button) }
    obj["show"] = function () {button.visible = true; paintButton(button) }
    //
    obj["getVisible"] = function () { return button.visible }
    //
    obj["setImageNormal"] = function (img) { setButtonImageNormal(button, img) }
    obj["setImageActive"] = function (img) { setButtonImageActive(button, img) }
    obj["setImagePressed"] = function (img) { setButtonImagePressed(button, img) }
    obj["setImageDisabled"] = function (img) { setButtonImageDisabled(button, img) }
    //
    obj["enable"] = function () { button.disabled = false; button.pressed = false; paintButton(button) }
    obj["disable"] = function () { button.disabled = true; button.pressed = false; paintButton(button) }
    //
    obj["getDisabled"] = function () { return button.disabled }
    //
    obj["activate"] = function () { button.disabled = false; button.pressed = false; button.active = true; paintButton(button) }
    obj["deactivate"] = function () { button.disabled = false; button.pressed = false; button.active = false; paintButton(button) }
    //
    obj["getActive"] = function () { return button.active }
    //
    obj["setBgColor"] = function (color) { setButtonBgColor(button, color) }
    //
    obj["setText"] = function (fontId, text) { setButtonText(button, fontId, text) }
    //
    obj["setOnClick"] = function (handler) { setButtonOnClick(button, handler) }
    //
    obj["config"] = function (fontId, text, onclick) { configButton(button, fontId, text, onclick) }
    //
    obj["log"] = function () { console.log(button) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintButton(button) {
    //
    clearPanelUnderWidget(button)
    //
    if (! button.visible) { return }
    //
    const img = getButtonImage(button)
    //
    button.panel.context.drawImage(img, button.left, button.top)
}

///////////////////////////////////////////////////////////////////////////////

function setButtonBgColor(button, color) {
    //
    assureSolidColor("color", "button.setBgColor", color)
    //
    button.bgColor = color
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function getButtonImage(button) {
    //
    if (button.pressed) { return button.imagePressed }
    //
    if (button.disabled) { return button.imageDisabled }
    //
    if (button.active) { return button.imageActive }
    //
    return button.imageNormal
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
    if (button.disabled) { return }
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


// [[source/button-config.js]] ################################################


///////////////////////////////////////////////////////////////////////////////

function setButtonText(button, fontId, text) {
    //
    const func = "button.setText"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    setButtonTextCore(button, fontId, text)
}

///////////////////////////////////////////////////////////////////////////////

function configButton(button, fontId, text, onclick) {
    //
    const func = "button.config"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    assureNullOrFunction("onclick", func, onclick)
    //
    button.onclick = onclick
    //
    setButtonTextCore(button, fontId, text)
}

///////////////////////////////////////////////////////////////////////////////

function setButtonTextCore(button, fontId, text) {
    //
    button.text = text
    //
    const img = createLabel(fontId, "transparent", button.width, button.height, button.text)
    //
    const grey = getGreyFromString(button.bgColor)
    //
    const dark = grey < 160
    //
    button.imageNormal = makeButtonTextNormal(button, img, dark)
    button.imageDisabled = makeButtonTextDisabled(button)
    button.imagePressed = makeButtonImagePressed(button, dark)
   //
   paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonTextNormal(button, img, dark) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = button.bgColor
    ctx.fillRect(0, 0, width, height)
    //
    ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
    //
    ctx.fillRect(2, 0, button.width - 4, 2) // top border without corners
    ctx.fillRect(2, button.height - 2, button.width - 4, 2) // bottom border without corners
    //
    ctx.fillRect(0, 0, 2, button.height) // full left border
    ctx.fillRect(button.width - 2, 0, 2, button.height) // full right border
    //
    ctx.drawImage(img, 0, 0)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonTextDisabled(button) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = "black"
    //
    ctx.fillRect(0, 0, width, height)
    //
    ctx.globalAlpha = 0.5
    ctx.drawImage(button.imageNormal, 0, 0)
    ctx.globalAlpha = 1
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonImagePressed(button, dark) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = button.bgColor
    ctx.fillRect(0, 0, width, height)
    //
    ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
    //
    ctx.fillRect(2, 0, button.width - 4, 2) // top border without corners
    ctx.fillRect(2, button.height - 2, button.width - 4, 2) // bottom border without corners
    //
    ctx.fillRect(0, 0, 2, button.height) // full left border
    ctx.fillRect(button.width - 2, 0, 2, button.height) // full right border
    //
    return cnv
}


// [[source/checkbox.js]] #####################################################


///////////////////////////////////////////////////////////////////////////////

function Checkbox(panel, id, left, top, dimension, checked, onclick) {
    //
    this.panel = panel
    //
    this.kind = "checkbox"
    //
    this.id = id
    //
    this.left = left
    this.top = top
    this.width = dimension
    this.height = dimension
    //
    this.checked = checked
    //
    this.visible = true
    //
    this.pressed = false
    this.disabled = false
    //
    this.imageChecked = null
    this.imageUnchecked = null
    this.fadeCover = null
    //
    this.onmouseup = function () { checkboxOnMouseUp(this) }
    this.onmousedown = function () { checkboxOnMouseDown(this) }
    this.onmouseleave = function () { checkboxOnMouseLeave(this) }
    this.onclick = onclick
}

///////////////////////////////////////////////////////////////////////////////

function createCheckbox(panel, name, left, top, dimension, checked, onclick) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createCheckbox"
    //
    assureName("name", func, name)
    //
    const id = panel.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("dimension", func, dimension, 12)
    //
    assureBoolean("checked", func, checked)
    //
    assureNullOrFunction("onclick", func, onclick)
    //
    const checkbox = new Checkbox(panel, id, left, top, dimension, checked, onclick)
    //
    Object.seal(checkbox)
    //
    setCheckboxImages(checkbox)
    //
    assureWidgetFitsInPanel(checkbox)
    assureWidgetDoesntClash(checkbox)
    //
    panel.widgets.push(checkbox)
    //
    box.elements[id] = createCheckboxUserObj(checkbox)
    //
    paintCheckbox(checkbox)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createCheckboxUserObj(checkbox) {
    //
    const obj = { }
    //
    obj["hide"] = function () { checkbox.visible = false; paintCheckbox(checkbox) }
    obj["show"] = function () { checkbox.visible = true; paintCheckbox(checkbox) }
    //
    obj["getVisible"] = function () { return checkbox.visible }
    //
    obj["enable"] = function () { checkbox.disabled = false; paintCheckbox(checkbox) }
    obj["disable"] = function () { checkbox.disabled = true; paintCheckbox(checkbox) }
    //
    obj["setOnClick"] = function (handler) { setCheckboxOnClick(checkbox, handler) }
    //
    obj["getChecked"] = function () { return checkbox.checked }
    //
    obj["getDisabled"] = function () { return checkbox.disabled }
    //
    obj["log"] = function () { console.log(checkbox) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function setCheckboxImages(checkbox) {
    //
    const dim = checkbox.width
    //
    const grey = getGreyFromString(checkbox.panel.bgColor)
    //
    const dark = grey < 60
    const color = fadeColor(dark ? "black" : "white", 0.7)
    //
    checkbox.imageChecked = createCheckedImage(dim, dark)
    checkbox.imageUnchecked = createUncheckedImage(dim, dark)
    checkbox.fadeCover = createColorCanvas(dim, dim, color)
}

///////////////////////////////////////////////////////////////////////////////

function paintCheckbox(checkbox) {
    //
    clearPanelUnderWidget(checkbox)
    //
    if (! checkbox.visible) { return }
    //
    const img = checkbox.checked ? checkbox.imageChecked : checkbox.imageUnchecked
    //
    checkbox.panel.context.drawImage(img, checkbox.left, checkbox.top)
    //
    if (checkbox.disabled) { checkbox.panel.context.drawImage(checkbox.fadeCover, checkbox.left, checkbox.top) }
}

///////////////////////////////////////////////////////////////////////////////

function createUncheckedImage(dim, dark) {
    //
    const cnv = createCanvas(dim, dim)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = dark ? "dimgrey" : "black"
    ctx.fillRect(0, 0, dim, dim)
    //
    ctx.fillStyle = dark ? "lightgrey" : "gainsboro"
    ctx.fillRect(1, 1, dim-2, dim-2)
    //
    return cnv
}

function createCheckedImage(dim, dark) {
    //
    const cnv = createUncheckedImage(dim, dark)
    const ctx = cnv.getContext("2d")
    //
    if (dark) {
        ctx.fillStyle = "dimgrey"
        ctx.fillRect(4, 4, dim-8, dim-8)
    }
    else {
        ctx.fillStyle = "black"
        ctx.fillRect(2, 2, dim-4, dim-4)
    }
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function setCheckboxOnClick(checkbox, handler) {
    //
    assureNullOrFunction("handler", "checkbox.setOnClick", handler)
    //
    checkbox.onclick = handler
}

///////////////////////////////////////////////////////////////////////////////

function checkboxOnMouseDown(checkbox) {
    //
    if (checkbox.disabled) { return }
    //
    checkbox.pressed = true
    paintCheckbox(checkbox)
}

function checkboxOnMouseLeave(checkbox) {
    //
    if (checkbox.pressed) {
        //
        checkbox.pressed = false
        paintCheckbox(checkbox)
    }
}

function checkboxOnMouseUp(checkbox) {
    //
    if (checkbox.pressed) {
        //
        checkbox.pressed = false
        checkbox.checked = ! checkbox.checked
        paintCheckbox(checkbox)
        //
        if (checkbox.onclick) { checkbox.onclick() }
    }
}


// [[source/decoration.js]] ###################################################


///////////////////////////////////////////////////////////////////////////////

function paintImageOnPanel(panel, img, left, top) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.paintImage"
    //
    assureImage("img", func, img)
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
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
    return displayText(panel.context, font, left, top, text)
}

function displayText(ctx, font, left, top, text) {
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


// [[source/file.js]] #########################################################

// # Copyright (c) 2014-2022 Feudal Code Limitada #

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


// [[source/helper.js]] #######################################################


///////////////////////////////////////////////////////////////////////////////

function clickHtmlElement(element) {
    // Firefox (and Edge) does not click link that is not body's child
    const e = document.createEvent("MouseEvents")
    e.initEvent("click", true, true) // event type, can bubble?,  cancelable?
    element.dispatchEvent(e)
}

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
    const data = rgbFromColor(color)
    //
    const r = 255 - data[0]
    const g = 255 - data[1]
    const b = 255 - data[2]
    //
    return "rgb(" + r + "," + g + "," + b + ")"
}

function rgbFromColor(color) {
    //
    const cnv = createCanvas(1, 1)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    //
    const data = ctx.getImageData(0, 0, 1, 1).data
    //
    const r = data[0]
    const g = data[1]
    const b = data[2]
    //
    return [r, g, b]
}

function getGrey(r, g, b) {
    let grey = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
    if (grey > 255) { grey = 255 }
    //
    return grey
}

function getGreyFromString(color) {
    //
    const rgb = rgbFromColor(color)
    //
    return getGrey(rgb[0], rgb[1], rgb[2])
}

function fadeColor(color, alpha) {
    //
    const rgb = rgbFromColor(color)
    //
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")"
}


// [[source/keyboard.js]] #####################################################

// # Copyright (c) 2014-2022 Feudal Code Limitada #

function keyDownHandler(box, e) {
    //
    const low = e.key.toLowerCase()
 // console.log(low)
    //
    if (low == "f5")  { return true }
    if (low == "f11") { return true }
    if (low == "f12") { return true }
    if (low == "tab") { return true }
    //
    if (low == "-"  &&  e.ctrlKey) { return true }
    if (low == "+"  &&  e.ctrlKey) { return true }
    if (low == "="  &&  e.ctrlKey) { return true }
    if (low == "j"  &&  e.ctrlKey  &&  e.shiftKey) { return true }
    if (low == "u"  &&  e.ctrlKey) { return true }
    //
    if (box.focusedWidget != null) {
        //
        if (box.focusedWidget.onkeydown) { box.focusedWidget.onkeydown(e) }
    }
    //
    e.preventDefault()
    e.stopPropagation()
    //
    return false // should not happen
}


// [[source/layer.js]] ########################################################


///////////////////////////////////////////////////////////////////////////////

function Layer(box, id) {
    //
    this.box = box
    //
    this.id = id
    //
    this.visible = true
    //
    this.panels = [ ]
}

///////////////////////////////////////////////////////////////////////////////

function createLayer(box, id) {
    //
    const layer = new Layer(box, id)
    //
    Object.seal(layer)
    //
    box.layers.push(layer)
    //
    box.elements[id] = createLayerUserObj(box, layer)
}

/////////////////////////////////////////////////////////////////////////////////

function createLayerUserObj(box, layer) {
    //
    const obj = { }
    //
    obj["id"] = layer.id
    //
    obj["show"] = function () { layer.visible = true; box.shallRepaint = true }
    //
    obj["hide"] = function () { layer.visible = false; box.shallRepaint = true }
    //
    obj["moveUp"] = function () { moveLayer(box, layer, +1) }
    //
    obj["moveDown"] = function () { moveLayer(box, layer, -1) }
    //
    obj["getVisible"] = function () { return layer.visible }
    //
    obj["createPanel"] = function (name, left, top, width, height, bgColor) {
        //
        return createPanel(layer, name, left, top, width, height, bgColor)
    }
    //
    obj["log"] = function () { console.log(layer) }
    //
    Object.freeze(obj)
    return obj
}

/////////////////////////////////////////////////////////////////////////////////

function initLayers(box, names) {
    //
    const param = "names"
    const func = "box.initLayers"
    //
    if (box.layers.length != 0) { throw("-- calling again function " + func) }
    //
    assureNonEmptyList(param, func, names)
    //
    for (const name of names) {
        //
        if (typeof name != "string") { argError(param, func, "this item is not a string: " + name) }
        //
        if (name === "") { argError(param, func, "empty string inside the list") }
        //
        if (box.elements[name]) { argError(param, func, "duplicated id: " + name) }
        //
        createLayer(box, name)
    }
}

///////////////////////////////////////////////////////////////////////////////

function orderOfLayers(box) {
    //
    const order = [ ]
    //
    for (const layer of box.layers) { order.push(layer.id) }
    //
    return order
}

/////////////////////////////////////////////////////////////////////////////////

function moveLayer(box, layer, delta) {
    //
    box.shallRepaint = true
    //
    const index = box.layers.indexOf(layer)
    //
    const newIndex = index + delta
    //
    if (newIndex < 0  ||  newIndex >= box.layers.length) { return }
    //
    const a = layer
    const b = box.layers[newIndex]
    //
    box.layers[index] = b
    box.layers[newIndex] = a
}


// [[source/loader.js]] #######################################################


///////////////////////////////////////////////////////////////////////////////

function createLoader() {
    //
    const loader = {
        //
        "loadFont": loadFont,
        "loadImage": loaderLoadImage,
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
        //
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

function loaderLoadImage(id, src) {
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
    if (dragging  &&  widget != last) { resetFocus(box) }
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
    if (widget != box.focusedWidget) { // avoiding resetting cursor position in textbox
        resetFocus(box)
        setFocus(box, widget)
    }
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


/*
 *
 *   bgColor of panel is NOT painted on it, it is painted direclty on stage;
 *   changing the bgColor of the panel has NO effet onwhat is painted on it
 *
 */

///////////////////////////////////////////////////////////////////////////////

function Panel(layer, id, left, top, width, height, bgColor) {
    //
    this.layer = layer
    //
    this.id = id
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.fontId = null
    //
    this.widgets = [ ]
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.canvas = createCanvas(width, height)
    this.context = this.canvas.getContext("2d")
}

///////////////////////////////////////////////////////////////////////////////

function createPanel(layer, name, left, top, width, height, bgColor) {
    //
    const box = layer.box
    //
    box.shallRepaint = true
    //
    const func = "layer.createPanel"
    //
    assureName("name", func, name)
    //
    const id = layer.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureColor("bgColor", func, bgColor)
    //
    const panel = new Panel(layer, id, left, top, width, height, bgColor)
    //
    Object.seal(panel)
    //
    assurePanelFitsInStage(panel)
    assurePanelDoesntClash(panel)
    //
    layer.panels.push(panel)
    //
    box.elements[id] = createPanelUserObj(panel)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createPanelUserObj(panel) {
    //
    const obj = { }
    //
    obj["hide"] = function () { panel.visible = false; panel.layer.box.shallRepaint = true }
    obj["show"] = function () { panel.visible = true; panel.layer.box.shallRepaint = true }
    //
    obj["getVisible"] = function () { return panel.visible }
    //
    obj["write"] = function (left, top, txt) { return writeOnPanel(panel, left, top, txt) }
    //
    obj["setFont"] = function (id) { setPanelFont(panel, id) }
    //
    obj["clearRect"] = function (left, top, width, height, color) {
        //
        clearRectOnPanel(panel, left, top, width, height, color)
    }
    //
    obj["paintRect"] = function (left, top, width, height, color) {
        //
        paintRectOnPanel(panel, left, top, width, height, color)
    }
    //
    obj["paintImage"] = function (img, left, top) { paintImageOnPanel(panel, img, left, top) }
    //
    obj["setBgColor"] = function (color) { setPanelBgColor(panel, color) }
    //
    obj["createButton"] = function (name, left, top, width, height, bgColor) {
        //
        return createButton(panel, name, left, top, width, height, bgColor)
    }
    //
    obj["createSurface"] = function (name, left, top, width, height, bgColor) {
        //
        return createSurface(panel, name, left, top, width, height, bgColor)
    }
    //
    obj["createSlider"] = function (name, left, top, width, height, bgColor, dark) {
        //
        return createSlider(panel, name, left, top, width, height, bgColor, dark)
    }
    //
    obj["createCheckbox"] = function (name, left, top, dimension, checked, onclick) {
        //
        return createCheckbox(panel, name, left, top, dimension, checked, onclick)
    }
    //
    obj["createTextbox"] = function (name, left, top, width, height, length, fontId, isRightStart) {
        //
        return createTextbox(panel, name, left, top, width, height, length, fontId, isRightStart)
    }
    //
    obj["log"] = function () { console.log(panel) }
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
    resetAndRepaintSomePanelWidgets(panel)
    //
    panel.layer.box.shallRepaint = true
}

function resetAndRepaintSomePanelWidgets(panel) {
    //
    for (const widget of panel.widgets) {
        //
        if (widget.kind == "slider") { setSliderImages(widget); continue }
        //
        if (widget.kind == "textbox") { paintTextbox(widget); continue }
        //
        if (widget.kind == "checkbox") { setCheckboxImages(widget); continue }
    }
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
    if (panel.left + panel.width > box.width) { throw "-- panel " + id + " passes right edge of stage" }
    //
    if (panel.top + panel.height > box.height) { throw "-- panel " + id + " passes bottom edge of stage" }
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
        throw "-- panel " + panel.id + " clashes with panel " + neighbor.id
    }
}

///////////////////////////////////////////////////////////////////////////////

function clearPanelUnderWidget(widget) {
    //
    const panel = widget.panel
    //
    panel.layer.box.shallRepaint = true
    //
    panel.context.clearRect(widget.left, widget.top, widget.width, widget.height)
}


// [[source/slider.js]] #######################################################


// height of slider is always 30

///////////////////////////////////////////////////////////////////////////////

function Slider(panel, id, left, top, width, height, value) {
    //
    this.panel = panel
    //
    this.kind = "slider"
    //
    this.id = id
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.value = value
    //
    this.visible = true
    //
    this.disabled = false
    //
    this.cursor = null
    this.baseImage = null
    this.fadeCover = null
    //
    this.onmousedown = function (x, y) { inputOnSlider(this, x, y) }
    this.onmousemove = function (x, y, dragging) { sliderOnMouseMove(this, x, y, dragging) }
    this.onchange = null
}

///////////////////////////////////////////////////////////////////////////////

function createSlider(panel, name, left, top, width, height, value) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createSlider"
    //
    assureName("name", func, name)
    //
    const id = panel.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 30)
    //
    assureThisInteger("height", func, height, 30)
    //
    assureProportion("value", func, value)
    //
    const slider = new Slider(panel, id, left, top, width, 30, value)
    //
    Object.seal(slider)
    //
    setSliderImages(slider)
    //
    assureWidgetFitsInPanel(slider)
    assureWidgetDoesntClash(slider)
    //
    panel.widgets.push(slider)
    //
    box.elements[id] = createSliderUserObj(slider)
    //
    paintSlider(slider)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createSliderUserObj(slider) {
    //
    const obj = { }
    //
    obj["hide"] = function () { slider.visible = false; paintSlider(slider) }
    obj["show"] = function () { slider.visible = true; paintSlider(slider) }
    //
    obj["getVisible"] = function () { return slider.visible }
    //
    obj["getValue"] = function () { return slider.value }
    //
    obj["reset"] = function (val) { resetSlider(slider, val) }
    //
    obj["enable"] = function () { slider.disabled = false; paintSlider(slider) }
    //
    obj["disable"] = function () { slider.disabled = true; paintSlider(slider) }
    //
    obj["getDisabled"] = function () { return slider.disabled }
    //
    obj["setOnChange"] = function (handler) { setSliderOnChange(slider, handler) }
    //
    obj["log"] = function () { console.log(slider) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function setSliderImages(slider) {
    //
    const bgColor = slider.panel.bgColor
    //
    const grey = getGreyFromString(bgColor)
    //
    const dark = grey < 160
    //
    slider.cursor = createSliderCursor(bgColor, dark)
    slider.baseImage = createSliderBar(slider.width, bgColor, dark)
    slider.fadeCover = createColorCanvas(slider.width, slider.height, fadeColor(bgColor, 0.7))
}

///////////////////////////////////////////////////////////////////////////////

function paintSlider(slider) {
    //
    clearPanelUnderWidget(slider)
    //
    if (! slider.visible) { return }
    //
    const ctx = slider.panel.context
    //
    slider.panel.layer.box.shallRepaint = true
    //
    ctx.drawImage(slider.baseImage, slider.left, slider.top)
    //
    const top = slider.top + 5
    const left = sliderCursorLeft(slider)
    //
    ctx.drawImage(slider.cursor, left, top)
    //
    if (slider.disabled) { ctx.drawImage(slider.fadeCover, slider.left, slider.top) }
}

function sliderCursorLeft(slider) {
    //
    const logicalWidth = slider.width - 20
    //
    const logicalLeft = Math.round(slider.value * logicalWidth)
    //
    return slider.left + 10 + logicalLeft - 10 // +10: visible bar displacement; -10: half cursor width
}

///////////////////////////////////////////////////////////////////////////////

function resetSlider(slider, value) {
    //
    const param = "value"
    const func = "slider.reset"
    //
    assureProportion(param, func, value)
    //
    slider.value = value
    //
    paintSlider(slider)
}

///////////////////////////////////////////////////////////////////////////////

function sliderOnMouseMove(slider, x, y, dragging) {
    //
    if (! dragging) { return }
    //
    inputOnSlider(slider, x, y)
}

function inputOnSlider(slider, x, __y) {
    //
    if (slider.disabled) { return }
    //
    const adjustedX = x - 10 // -10: visible bar displacement
    //
    const logicalWidth = slider.width - 20
    //
    slider.value = adjustedX / logicalWidth
    //
    if (slider.value < 0) { slider.value = 0 }
    if (slider.value > 1) { slider.value = 1 }
    //
    paintSlider(slider)
    //
    if (slider.onchange != null) { slider.onchange(slider) }
}

///////////////////////////////////////////////////////////////////////////////

function setSliderOnChange(slider, handler) {
    //
    assureNullOrFunction("handler", "slider.setOnChange", handler)
    //
    slider.onchange = handler
}


// [[source/slider-parts.js]] #################################################



///////////////////////////////////////////////////////////////////////////////

function createSliderCursor(bgColor, dark) {
    //
    const cnv = createCanvas(20, 20)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = dark ? bgColor : "rgb(90,90,90)"
    ctx.beginPath()
    ctx.arc(10, 10, 9, 0, 2 * Math.PI);
    ctx.fill()
    //
    ctx.fillStyle = dark ? "silver" : bgColor
    ctx.beginPath()
    ctx.arc(10, 10, 7, 0, 2 * Math.PI);
    ctx.fill()
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function createSliderBar(width, bgColor, dark) {
    //
    const cnv = createCanvas(width, 30)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, 30)
    //
    const core = createSliderBarCore(width - 20, bgColor, dark) // reserving space for cursor at ends
    ctx.drawImage(core, 10, 5)
    //
    return cnv
}

function createSliderBarCore(width, bgColor, dark) {
    //
    const cnv = createCanvas(width, 20)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = dark ? "rgb(170,170,180)" : "dimgrey"
    ctx.fillRect(0,  7, width, 2)
    ctx.fillRect(0, 11, width, 2)
    //
    ctx.drawImage(sliderLeftBeacon(bgColor, dark), 0, 7)
    ctx.drawImage(sliderRightBeacon(bgColor, dark), width-3, 7)
    //
    if (dark) { ctx.fillRect(2, 9, width-4, 2) }
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function sliderLeftBeacon(bgColor, dark) {
    //
    if (dark) {
        return sliderBeacon([0,135,138, 135,172,172, 168,172,172], bgColor, dark)
    }
    //
    return sliderBeacon([0,141,109, 141,105,105, 109,105,170], bgColor, dark)
}

function sliderRightBeacon(bgColor, dark) {
    //
    const src = sliderLeftBeacon(bgColor, dark)
    const cnv = createCanvas(src.width, src.height)
    const ctx = cnv.getContext("2d")
    //
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(src, 0, 0, src.width * -1, src.height)
    ctx.restore()
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function sliderBeacon(hints, bgColor) {
    const cnv = createCanvas(3, 6)
    const ctx = cnv.getContext("2d")
    //
    const colors = [ ]
    for (const hint of hints) { colors.push(colorFromHint(hint, bgColor)) }
    // top part
    for (let y = 0; y < 3; y ++) {
        for (let x = 0; x < 3; x ++) {
            const index = (y * 3) + x
            const color = colors[index]
            ctx.fillStyle = color
            ctx.fillRect(x, y, 1, 1)
        }
    }
    // bottom part
    for (let y = 0; y < 3; y ++) {
        for (let x = 0; x < 3; x ++) {
            const index = (y * 3) + x
            const color = colors[index]
            ctx.fillStyle = color
            ctx.fillRect(x, (5-y), 1, 1)
        }
    }
    //
    return cnv
}

function colorFromHint(hint, bgColor) {
    if (hint == 0) { return bgColor }
    //
    return "rgb(" + hint + "," + hint + "," + hint + ")"
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

function Surface(panel, id, left, top, width, height, bgColor) {
    //
    this.panel = panel
    //
    this.kind = "surface"
    //
    this.id = id
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

function createSurface(panel, name, left, top, width, height, bgColor) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createSurface"
    //
    assureName("name", func, name)
    //
    const id = panel.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureColor("bgColor", func, bgColor)
    //
    const surface = new Surface(panel, id, left, top, width, height, bgColor)
    //
    Object.seal(surface)
    //
    assureWidgetFitsInPanel(surface)
    assureWidgetDoesntClash(surface)
    //
    panel.widgets.push(surface)
    //
    box.elements[id] = createSurfaceUserObj(surface)
    //
    paintSurface(surface)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createSurfaceUserObj(surface) {
    //
    const obj = { }
    //
    obj["hide"] = function () { surface.visible = false; paintSurface(surface) }
    obj["show"] = function () { surface.visible = true; paintSurface(surface) }
    //
    obj["getVisible"] = function () { return surface.visible }
    //
    obj["setImage"] = function (img) { setSurfaceImage(surface, img) }
    //
    obj["setBgColor"] = function (color) { setSurfaceBgColor(surface, color) }
    //
    obj["setOnMouseUp"] = function (h) { setSurfaceOnMouseUp(surface, h) }
    obj["setOnMouseDown"] = function (h) { setSurfaceOnMouseDown(surface, h) }
    obj["setOnMouseMove"] = function (h) { setSurfaceOnMouseMove(surface, h) }
    obj["setOnMouseEnter"] = function (h) { setSurfaceOnMouseEnter(surface, h) }
    obj["setOnMouseLeave"] = function (h) { setSurfaceOnMouseLeave(surface, h) }
    //
    obj["log"] = function () { console.log(surface) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintSurface(surface) {
    //
    clearPanelUnderWidget(surface)
    //
    if (! surface.visible) { return }
    //
    surface.panel.context.drawImage(surface.canvas, surface.left, surface.top)
}

///////////////////////////////////////////////////////////////////////////////

function setSurfaceBgColor(surface, color) {
    //
    assureColor("color", "surface.setBgColor", color)
    //
    surface.bgColor = color
    //
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


// [[source/textbox.js]] ######################################################


// textbox action is triggered by input

///////////////////////////////////////////////////////////////////////////////

function Textbox(panel, id, left, top, width, height, length, fontId, isRightStart) {
    //
    this.panel = panel
    //
    this.kind = "textbox"
    //
    this.id = id
    //
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    //
    this.length = length // max number of characters
    this.text = ""
    this.fontId = fontId
    //
    this.visible = true
    //
    this.disabled = false
    //
    this.canvas = createCanvas(width, height)
    this.context = this.canvas.getContext("2d")
    //
    this.isRightStart = isRightStart
    //
    this.textTop = 0 // for text and cursor
    this.redCursor = null
    this.blankCursor = null
    this.sprites = null
    //
    // comes before the character (real or future) it refers; min value is zero; max value is length
    //
    this.cursorPosition = 0
    //
    this.onkeydown = function (e) { textboxOnKeyDown(this, e) }
    this.onmousedown = function (x, y) { textboxOnMouseDown(this, x, y) }
    //
    this.onchange = null
}

///////////////////////////////////////////////////////////////////////////////

function createTextbox(panel, name, left, top, width, height, length, fontId, isRightStart) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createTextbox"
    //
    assureName("name", func, name)
    //
    const id = panel.id + "." + name
    //
    assureFreeId("name", func, id, box.elements)
    //
    assureMinimumInteger("left", func, left, 0)
    //
    assureMinimumInteger("top", func, top, 0)
    //
    assureMinimumInteger("width", func, width, 10)
    //
    assureMinimumInteger("height", func, height, 10)
    //
    assureMinimumInteger("length", func, length, 1)
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureBoolean("isRightStart", func, isRightStart)
    //
    const textbox = new Textbox(panel, id, left, top, width, height, length, fontId, isRightStart)
    //
    Object.seal(textbox)
    //
    setTextTopAndCursors(textbox)
    //
    assureWidgetFitsInPanel(textbox)
    assureWidgetDoesntClash(textbox)
    //
    panel.widgets.push(textbox)
    //
    box.elements[id] = createTextboxUserObj(textbox)
    //
    paintTextbox(textbox)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createTextboxUserObj(textbox) {
    //
    const obj = { }
    //
    obj["hide"] = function () { textbox.visible = false; paintTextbox(textbox) }
    obj["show"] = function () { textbox.visible = true; paintTextbox(textbox) }
    //
    obj["getVisible"] = function () { return textbox.visible }
    //
    obj["enable"] = function () { textbox.disabled = false; paintTextbox(textbox) }
    obj["disable"] = function () { textbox.disabled = true; paintTextbox(textbox) }
    //
    obj["getDisabled"] = function () { return textbox.disabled }
    //
    obj["setText"] = function (text) { setTextboxText(textbox, text) }
    //
    obj["getText"] = function () { return textbox.text }
    //
    obj["setOnChange"] = function (onchange) { setTextboxOnChange(textbox, onchange) }
    //
    obj["log"] = function () { console.log(textbox) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function setTextTopAndCursors(textbox) {
    //
    const font = allFonts[textbox.fontId]
    //
    const height = font["."].height
    //
    textbox.blankCursor = createCanvas(3, height)
    //
    textbox.redCursor = createColorCanvas(3, height, "red")
    const ctx = textbox.redCursor.getContext("2d")
    ctx.clearRect (0, 0, 3, 4)
    ctx.clearRect (0, height - 4, 3, 4)
    //
    const innerHeight = textbox.height - 2
    const restV = innerHeight - height
    //
    textbox.textTop = Math.floor(restV / 2) + 1 // +1 for the top border (outside innerHeight)
}


// [[source/textbox-action.js]] ###############################################


///////////////////////////////////////////////////////////////////////////////

function setTextboxText(textbox, text) {
    //
    assureString("text", "textbox.setText", text)
    //
    if (text.length > textbox.length) { argError("text", "textbox.setText", "too big text: " + text) }
    //
    const font = allFonts[textbox.fontId]
    //
    for (const c of text) {
        //
        if (font[c] == undefined) {  argError("text", "textbox.setText", "font doesn't have character: " + c) }
    }
    //
    textbox.text = text
    //
    textbox.cursorPosition = textbox.isRightStart ? text.length : 0
    //
    paintTextbox(textbox)
}

///////////////////////////////////////////////////////////////////////////////

function setTextboxOnChange(textbox, handler) {
    //
    assureNullOrFunction("handler", "textbox.setOnChange", handler)
    //
    textbox.onchange = handler
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function textboxOnMouseDown(textbox, x) {
    //
    textbox.cursorPosition = textboxIndexOnMouseDown(textbox, x)
    //
    startBlinking(textbox)
}

function textboxIndexOnMouseDown(textbox, x) {
    //
    const sprites = textbox.sprites
    //
    for (const sprite of sprites) {
        //
        if (x > sprite.right) { continue }
        //
        const center = sprite.left + (0.5 * sprite.width)
        //
        if (x <= center) { return sprite.order }
        //
        return sprite.order + 1
    }
    //
    return textbox.isRightStart ? 0 : textbox.text.length
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function textboxOnKeyDown(textbox, e) {
    //
    if (e.ctrlKey) { return }
    //
    const original = textbox.text
    //
    const changed = processSpecialKeyDownOnTextbox(textbox, e)
    //
    if (changed) {
        //
        paintTextbox(textbox)
        //
        if (textbox.onchange) { textbox.onchange(original, textbox.text) }
        return
    }
    //
    //
    const font = allFonts[textbox.fontId]
    //
    if (font[e.key] == undefined) { return }
    //
    if (textbox.text.length == textbox.length) { return }
    //
    const list = textbox.text.split("")
    list.splice(textbox.cursorPosition, 0, e.key)
    textbox.text = list.join("")
    textbox.cursorPosition += 1
    //
    paintTextbox(textbox)
    //
    if (textbox.onchange) { textbox.onchange(original, textbox.text) }
}

function processSpecialKeyDownOnTextbox(textbox, e) {
    //
    const low = e.key.toLowerCase()
    //
    const minpos = 0
    const maxpos = textbox.text.length
    //
    if (low == "arrowleft") {
        //
        if (textbox.cursorPosition == minpos) { return false }
        //
        textbox.cursorPosition -= 1
        return true
    }
    //
    if (low == "arrowright") {
        //
        if (textbox.cursorPosition == maxpos) { return false }
        //
        textbox.cursorPosition += 1
        return true
    }
    //
    if (low == "home") {
        //
        if (textbox.cursorPosition == minpos) { return false }
        //
        textbox.cursorPosition = minpos
        return true
    }
    //
    if (low == "end")  {
        //
        if (textbox.cursorPosition == maxpos) { return false }
        //
        textbox.cursorPosition = maxpos
        return true
    }
    //
    if (low == "delete") {
        //
        if (textbox.cursorPosition == maxpos) { return false } // no digit ahead
        //
        const dellist = textbox.text.split("")
        dellist.splice(textbox.cursorPosition, 1)
        textbox.text = dellist.join("")
        return  true
    }
    //
    if (low == "backspace") {
        //
        if (textbox.cursorPosition == minpos) { return false } // no digit ahead
        //
        const dellist = textbox.text.split("")
        dellist.splice(textbox.cursorPosition - 1, 1)
        textbox.text = dellist.join("")
        textbox.cursorPosition -= 1
        return  true
    }
}


// [[source/textbox-paint.js]] ################################################


/////////////////////////////////////////////////////////////////////////////////

function paintTextbox(textbox) {
    //
    clearPanelUnderWidget(textbox)
    //
    if (! textbox.visible) { return }
    //
    const width = textbox.width
    //
    const height = textbox.height
    //
    const ctx = textbox.context
    //
    const grey = getGreyFromString(textbox.panel.bgColor)
    //
    const dark = grey < 60
    //
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    //
    if (textbox.isRightStart) {
        paintTextInTextboxRightStart(textbox)
    }
    else {
        paintTextInTextboxLeftStart(textbox)
    }
    //
    ctx.fillStyle = dark ? "grey" : "black"
    ctx.fillRect(0, 0, width, 1) // top
    ctx.fillRect(0, height-1, width, 1) // bottom
    ctx.fillRect(0, 0, 1, height) // left
    ctx.fillRect(width-1, 0, 1, height) // right
    //
    if (textbox.disabled) {
        //
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(1, 1, width-2, height-2)
    }
    //
    textbox.panel.context.drawImage(textbox.canvas, textbox.left, textbox.top)
}

//////////////////////////////////////////////////////////////////////////////

function paintTextInTextboxLeftStart(textbox) {
    //
    const box = textbox.panel.layer.box
    //
    const sprites = spritesForTextboxPainting(box, textbox)
    //
    while (cursorIsBeyondEnd(box, textbox, sprites)) { sprites.shift() }
    //
    let left = 5
    //
    for (const sprite of sprites) {
        //
        textbox.context.drawImage(sprite.image, left, textbox.textTop)
        //
        sprite.left = left
        sprite.right = left + sprite.width
        //
        left += sprite.width + 1 // +1 as spacer
    }
    //
    textbox.sprites = sprites
}

function cursorIsBeyondEnd(box, textbox, sprites) {
    //
    if (textbox != box.focusedWidget) { return false }
    //
    let left = 0
    //
    const max = textbox.width - 15 // two borders + blank space
    //
    for (const sprite of sprites) {
        //
        if (left > max) { break }
        //
        if (sprite.symbol == "cursor") { return false }
        //
        left += sprite.width + 1 // +1 as spacer
    }
    //
    return true
}

///////////////////////////////////////////////////////////////////////////////

function paintTextInTextboxRightStart(textbox) {
    //
    const box = textbox.panel.layer.box
    //
    const sprites = spritesForTextboxPainting(box, textbox)
    //
    while (cursorIsBeyondStart(box, textbox, sprites)) { sprites.pop() }
    //
    let left = textbox.width - 4
    //
    const max = sprites.length - 1
    //
    for (let n = max; n > -1; n--) {
        //
        const sprite = sprites[n]
        //
        left -= sprite.width + 1 // +1 as spacer
        //
        sprite.left = left
        sprite.right = left + sprite.width
        //
        textbox.context.drawImage(sprite.image, left, textbox.textTop)
    }
    //
    textbox.sprites = sprites
}

function cursorIsBeyondStart(box, textbox, sprites) {
    //
    if (textbox != box.focusedWidget) { return false }
    //
    let left = textbox.width - 15 // two borders + blank space
    //
    const max = sprites.length - 1
    //
    for (let n = max; n > -1; n--) {
        //
        const sprite = sprites[n]
        //
        left -= sprite.width + 1 // +1 as spacer
        //
        if (left < 0) { break }
        //
        if (sprite.symbol == "cursor") { return false }
    }
    //
    return true
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function TextboxSprite(order, symbol, image) {
    //
    this.order = order
    this.symbol = symbol
    this.image = image
    this.left = 0
    this.right = 0
    this.width = image.width
}

function createTextboxSprite(order, symbol, image) {
    //
    const obj = new TextboxSprite(order, symbol, image)
    Object.seal(image)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function spritesForTextboxPainting(box, textbox) {
    //
    const font = allFonts[textbox.fontId]
    //
    const symbols = textbox.text.split("")
    //
    const sprites = [ ]
    //
    for (let n = 0; n < symbols.length; n++) {
        //
        maybeInsertCursor(box, textbox, sprites, n)
        //
        const symbol = symbols[n]
        const sprite = createTextboxSprite(n, symbol, font[symbol])
        sprites.push(sprite)
    }
    //
    maybeInsertCursor(box, textbox, sprites, symbols.length)
    //
    return sprites
}

function maybeInsertCursor(box, textbox, sprites, n) {
    //
    if (textbox != box.focusedWidget) { return }
    //
    if (n != textbox.cursorPosition) { return }
    //
    const img = box.blinking ? textbox.redCursor : textbox.blankCursor
    //
    const cursor = createTextboxSprite(n, "cursor", img)
    //
    sprites.push(cursor)
}


// [[source/utils.js]] ########################################################


///////////////////////////////////////////////////////////////////////////////

function createLabelUser(fontId, bgColor, width, height, text) {
    //
    const func = "library.createLabel"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureColor("bgColor", func, bgColor)
    //
    assureMinimumInteger("width", func, width, 3)
    //
    assureMinimumInteger("height", func, height, 3)
    //
    assureString("text", func, text)
    //
    return createLabel(fontId, bgColor, width, height, text)
}

function createLabel(fontId, bgColor, width, height, text) {
    //
    const font = allFonts[fontId]
    //
    const symbol = (text == "") ? "." : text[0]
    const sample = font[symbol]
    //
    const cnv = createColorCanvas(width, height, bgColor)
    const ctx = cnv.getContext("2d")
    //
    const restH = width - calcTextLength(fontId, text)
    const left = Math.floor(restH / 2)
    //
    const restV = height - (sample.height)
    const top = 2 + Math.floor(restV / 2)
    //
    displayText(ctx, font, left, top, text)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function createPadLabelUser(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const func = "library.createPadLabel"
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
    assureString("text", func, text)
    //
    return createPadLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text)
}

function createPadLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const font = allFonts[fontId]
    //
    const symbol = (text == "") ? "." : text[0]
    const sample = font[symbol]
    //
    const width = padLeft + calcTextLength(fontId, text) + padRight
    //
    const height = padTop + sample.height + padBottom
    //
    const cnv = createColorCanvas(width, height, bgColor)
    const ctx = cnv.getContext("2d")
    //
    displayText(ctx, font, padLeft, padTop, text)
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
    const txt1 = "-- " + w.kind + " " + w.id + " passes "
    //
    const txt2 = " edge of its panel"
    //
    if (w.left + w.width > panel.width)  { throw txt1 + "right" + txt2 }
    //
    if (w.top + w.height > panel.height) { throw txt1 + "bottom" + txt2 }
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
        throw "-- " + w.kind + " " + w.id + " clashes with " + candidate.kind + " " + candidate.id
    }
}


// [[source/LIBRARY.js]] ######################################################


///////////////////////////////////////////////////////////////////////////////

function __createTheLibraryObject() {
    //
    const lib = {
        //
        "allFonts": allFonts,
        "allImages": allImages,
        "createLoader": createLoader,
        //
        "setFontsForSpecialLayers": setFontsForSpecialLayers,
        //
        "loadImage": loadImage,
        "saveImage": saveImage,
        //
        "cloneImage": cloneImageUser,
        "createCanvas": createColorCanvasUser,
        "fadeImage": fadeImageUser,
        "createCheckerboard": createCheckerboardUser,
        "negativeFromImage": negativeFromImageUser,
        "createLabel": createLabelUser,
        "createPadLabel": createPadLabelUser,
        "calcTextLength": calcTextLengthUser,
        //
        "createBox": createBox
    }
    //
    Object.freeze(lib)
    return lib
}



return __createTheLibraryObject()

}
