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
    this.text = null
    this.fontId = null
    //
    this.visible = true
    //
    this.bgColor = bgColor
    //
    this.pressed = false
    this.disabled = false
    this.active = false
    //
    this.imageNormal = createColorCanvas(width, height, bgColor)
    this.imageActive = createColorCanvas(width, height, bgColor)
    this.imagePressed = createColorCanvas(width, height, solidReversedColor(bgColor))
    this.imageDisabled = createColorCanvas(width, height, bgColor)
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
    assureSolidColor("bgColor", func, bgColor)
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
    obj["hide"] = function () { button.visible = false; paintButton(button) }
    obj["show"] = function () {button.visible = true; paintButton(button) }
    //
    obj["getVisible"] = function () { return button.visible }
    //
    obj["setImageNormal"] = function (img) { setButtonImageNormal(button, img) } 
    obj["setImageActive"] = function (img) { setButtonImageActive(button, img) } 
    obj["setImagePressed"] = function (img) { setButtonImagePressed(button, img) } 
    obj["setImageDisabled"] = function (img) { setButtonImageDisabled(button, img) } 
    //
    obj["enable"] = function () { button.disabled = false; button.pressed = false; paintButton(button) }
    obj["disable"] = function () { button.disabled = true; button.pressed = false; paintButton(button) }
    //
    obj["getDisabled"] = function () { return button.disabled }
    //
    obj["activate"] = function () { button.disabled = false; button.pressed = false; button.active = true; paintButton(button) }
    obj["deactivate"] = function () { button.disabled = false; button.pressed = false; button.active = false; paintButton(button) }
    //
    obj["getActive"] = function () { return button.active }
    //
    obj["setBgColor"] = function (color) { setButtonBgColor(button, color) }
    //
    obj["setText"] = function (fontId, text) { setButtonText(button, fontId, text) }
    //
    obj["setOnClick"] = function (handler) { setButtonOnClick(button, handler) }
    //
    obj["config"] = function (fontId, text, onclick) { configButton(button, fontId, text, onclick) }
    //
    obj["log"] = function () { console.log(button) }
    //
    Object.freeze(obj)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function paintButton(button) {
    //
    clearPanelUnderWidget(button)
    //
    if (! button.visible) { return }
    //
    const img = getButtonImage(button)
    //
    button.panel.context.drawImage(img, button.left, button.top)
}
    
///////////////////////////////////////////////////////////////////////////////

function setButtonBgColor(button, color) { 
    //
    assureSolidColor("color", "button.setBgColor", color)
    //
    button.bgColor = color
    //
    paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function getButtonImage(button) {  
    //
    if (button.pressed) { return button.imagePressed }
    //
    if (button.disabled) { return button.imageDisabled }
    //
    if (button.active) { return button.imageActive }
    //
    return button.imageNormal 
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
    if (button.disabled) { return }
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

