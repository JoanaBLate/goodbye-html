// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

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

