// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

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

