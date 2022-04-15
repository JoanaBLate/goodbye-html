// # Copyright (c) 2022 Feudal Code Limitada #
"use strict"

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

