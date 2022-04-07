// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

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
    obj["visible"] = function () { return layer.visible }
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

