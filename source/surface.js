// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

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

