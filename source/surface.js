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

