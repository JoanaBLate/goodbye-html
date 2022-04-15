// # Copyright (c) 2022 Feudal Code Limitada #
"use strict"

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

