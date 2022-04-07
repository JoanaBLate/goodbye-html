// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function Button(panel, id, left, top, width, height, bgColor) { 
    //
    this.panel = panel
    //
    this.kind = "button"
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
    this.text = null
    this.fontId = null
    //
    this.imageNormal = createColorCanvas(width, height, bgColor)
    this.imageActive = createColorCanvas(width, height, bgColor)
    this.imagePressed = createColorCanvas(width, height, solidReversedColor(bgColor))
    this.imageDisabled = createColorCanvas(width, height, bgColor)
    //
    this.pressed = false
    this.state = "normal" // active, disabled
    //
    this.onmouseup = function () { buttonOnMouseUp(this) }
    this.onmousedown = function () { buttonOnMouseDown(this) }
    this.onmouseleave = function () { buttonOnMouseLeave(this) }
    this.onclick = null 
}

///////////////////////////////////////////////////////////////////////////////

function createButton(panel, name, left, top, width, height, bgColor) {
    //
    const box = panel.layer.box
    //
    box.shallRepaint = true
    //
    const func = "panel.createButton"
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
    if (bgColor === null) { bgColor = "transparent" }
    //
    assureColor("bgColor", func, bgColor)
    //
    const button = new Button(panel, id, left, top, width, height, bgColor) 
    //
    Object.seal(button)
    //
    assureWidgetFitsInPanel(button)
    assureWidgetDoesntClash(button)
    //
    panel.widgets.push(button)
    //
    box.elements[id] = createButtonUserObj(button)
    //
    paintButton(button)
    //
    return box.elements[id]
}

///////////////////////////////////////////////////////////////////////////////

function createButtonUserObj(button) {
    //
    const obj = { }
    //
    obj["hide"] = function () { hideButton(button) }
    obj["show"] = function () { showButton(button) }
    //
    obj["setImageNormal"] = function (img) { setButtonImageNormal(button, img) } 
    obj["setImageActive"] = function (img) { setButtonImageActive(button, img) } 
    obj["setImagePressed"] = function (img) { setButtonImagePressed(button, img) } 
    obj["setImageDisabled"] = function (img) { setButtonImageDisabled(button, img) } 
    //
    obj["disable"] = function () { button.state = "disabled"; paintButton(button); button.pressed = false }
    obj["activate"] = function () { button.state = "active"; paintButton(button);  button.pressed = false }
    obj["normalize"] = function () { button.state = "normal"; paintButton(button); button.pressed = false }
    //
    obj["setBgColor"] = function (color) { setButtonBgColor(button, color) }
    //
    obj["setOnClick"] = function (handler) { setButtonOnClick(button, handler) }
    //
    obj["setButtonText"] = function (fontId, text) { setButtonText(button, fontId, text) }
    //
    obj["visible"] = function () { return button.visible }
    //
    obj["log"] = function () { console.log(button) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintButton(button) {
    //
    if (! button.visible) { paintPanelUnderWidget(button, null); return }
    //
    paintPanelUnderWidget(button, button.bgColor)
    //
    const img = getButtonImage(button)
    //
    button.panel.context.drawImage(img, button.left, button.top)
}
    
///////////////////////////////////////////////////////////////////////////////

function setButtonBgColor(button, color) { 
    //
    if (color === null) { color = "transparent" }
    //
    assureColor("color", "button.setBgColor", color)
    //
    button.bgColor = color
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function hideButton(button) {
    //
    button.visible = false
    paintButton(button)
}

function showButton(button) {
    //
    button.visible = true
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function getButtonImage(button) {  
    //
    if (button.pressed) { return button.imagePressed }
    //
    if (button.state == "normal") { return button.imageNormal }
    if (button.state == "active") { return button.imageActive }
    if (button.state == "disabled") { return button.imageDisabled }
}

///////////////////////////////////////////////////////////////////////////////

function setButtonImageNormal(button, img) {
    //
    assureImage("img", "button.setImageNormal", img)
    //
    button.imageNormal = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImageActive(button, img) {
    //
    assureImage("img", "button.setImageActive", img)
    //
    button.imageActive = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImagePressed(button, img) {
    //
    assureImage("img", "button.setImagePressed", img)
    //
    button.imagePressed = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

function setButtonImageDisabled(button, img) {
    //
    assureImage("img", "button.setImageDisabled", img)
    //
    button.imageDisabled = adjustedImage(img, button.width, button.height)
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function setButtonOnClick(button, handler) {
    //
    assureNullOrFunction("handler", "button.setOnClick", handler)
    //
    button.onclick = handler
}

///////////////////////////////////////////////////////////////////////////////

function buttonOnMouseDown(button) {
    //
    if (button.state == "disabled") { return }
    //
    button.pressed = true
    paintButton(button)
}

function buttonOnMouseLeave(button) {
    //
    if (button.pressed) { 
        //
        button.pressed = false
        paintButton(button)    
    }
}

function buttonOnMouseUp(button) {
    //
    if (button.pressed) { 
        //
        button.pressed = false
        paintButton(button)    
        //
        if (button.onclick) { button.onclick() }
    }
}

