// # Copyright (c) 2022 Feudal Code Limitada #
"use strict"

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

