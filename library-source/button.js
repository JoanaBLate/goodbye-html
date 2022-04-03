///////////////////////////////////////////////////////////////////////////////

function Button(panel, left, top, width, height, bgColor) { // , fontId, text) {
    //
    this.id = panel.widgets.length + 1
    //
    this.kind = "button"
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

function createButton(panel, left, top, width, height, bgColor) { // , fontId, text) {
    //
    const func = "panel.createButton"
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
    /*/
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    /*/
    const button = new Button(panel, left, top, width, height, bgColor) // , fontId, text)
    //
    Object.seal(button)
    //
    assureWidgetFitsInPanel(button)
    assureWidgetDoesntClash(button)
    //
    panel.widgets.push(button)
    //
    paintButton(button)
    //
    return createButtonUser(button)
}

///////////////////////////////////////////////////////////////////////////////

function createButtonUser(button) {
    //
    const obj = {
        //
        "hide": function () { hideButton(button) },
        "show": function () { showButton(button) },
        //
        "setImageNormal": function (img) { setButtonImageNormal(button, img) }, 
        "setImageActive": function (img) { setButtonImageActive(button, img) }, 
        "setImagePressed": function (img) { setButtonImagePressed(button, img) }, 
        "setImageDisabled": function (img) { setButtonImageDisabled(button, img) }, 
        //
        "disable": function () { button.state = "disabled"; paintButton(button); button.pressed = false },
        "activate": function () { button.state = "active"; paintButton(button);  button.pressed = false },
        "normalize": function () { button.state = "normal"; paintButton(button); button.pressed = false },
        //
        "setBgColor": function (color) { setButtonBgColor(button, color) },
        //
        "setOnClick": function (handler) { setButtonOnClick(button, handler) },
        //
        "setButtonText": function (fontId, text) { setButtonText(button, fontId, text) },
        //
        "visible": function () { return button.visible },
        //
        "log": function () { console.log(button) }
    }
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

