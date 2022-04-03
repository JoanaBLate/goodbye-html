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

