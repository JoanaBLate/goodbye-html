// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

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
    //
    this.layers = [ ]
    //
    this.elements = { }
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
    if (parent.appendChild == undefined) { throw "-- invalid parent for the box: missing appendChild" }
    //
    const box = new Box(width, height, parent)
    Object.seal(box)
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
    boxUser["initLayers"] = function (names) { initLayers(box, names) }
    //
    boxUser["get"] = function (id) { return getUser(box, id) }
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

