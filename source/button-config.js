// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function setButtonText(button, fontId, text) {
    //
    const func = "button.setText"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    setButtonTextCore(button, fontId, text) 
}

///////////////////////////////////////////////////////////////////////////////

function configButton(button, fontId, text, onclick) {
    //
    const func = "button.config"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    assureNullOrFunction("onclick", func, onclick)
    //
    button.onclick = onclick
    //
    setButtonTextCore(button, fontId, text) 
}

///////////////////////////////////////////////////////////////////////////////

function setButtonTextCore(button, fontId, text) {
    //
    button.text = text
    //
    const img = createLabel(fontId, "transparent", button.width, button.height, button.text)
    //
    const grey = getGreyFromString(button.bgColor)
    //
    const dark = grey < 160
    //
    button.imageNormal = makeButtonTextNormal(button, img, dark)
    button.imageDisabled = makeButtonTextDisabled(button)
    button.imagePressed = makeButtonImagePressed(button, dark)
   //
   paintButton(button)
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonTextNormal(button, img, dark) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = button.bgColor 
    ctx.fillRect(0, 0, width, height)
    //
    ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
    //
    ctx.fillRect(2, 0, button.width - 4, 2) // top border without corners
    ctx.fillRect(2, button.height - 2, button.width - 4, 2) // bottom border without corners
    //
    ctx.fillRect(0, 0, 2, button.height) // full left border
    ctx.fillRect(button.width - 2, 0, 2, button.height) // full right border
    //
    ctx.drawImage(img, 0, 0)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonTextDisabled(button) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = "black"
    //
    ctx.fillRect(0, 0, width, height)
    //
    ctx.globalAlpha = 0.5
    ctx.drawImage(button.imageNormal, 0, 0)    
    ctx.globalAlpha = 1
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function makeButtonImagePressed(button, dark) {
    //
    const width = button.width
    const height = button.height
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = button.bgColor 
    ctx.fillRect(0, 0, width, height)
    //
    ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
    //
    ctx.fillRect(2, 0, button.width - 4, 2) // top border without corners
    ctx.fillRect(2, button.height - 2, button.width - 4, 2) // bottom border without corners
    //
    ctx.fillRect(0, 0, 2, button.height) // full left border
    ctx.fillRect(button.width - 2, 0, 2, button.height) // full right border
    //
    return cnv
}

