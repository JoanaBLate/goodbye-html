// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function createCanvas(width, height) {
    //
    const cnv = document.createElement("canvas")
    cnv.width  = width
    cnv.height = height
    return cnv
}

function createColorCanvas(width, height, color) {
    //
    const cnv = createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
    return cnv
}

function createColorCanvasUser(width, height, color) {
    //
    const func = "createCanvas"
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    if (color) {
        assureColor("color", func, color) 
        //
        return createColorCanvas(width, height, color)
    }
    //
    return createCanvas(width, height)
}

///////////////////////////////////////////////////////////////////////////////

function cloneImage(img) {
    //
    const cnv = createCanvas(img.width, img.height)
    const ctx = cnv.getContext("2d")
    ctx.drawImage(img, 0, 0)
    return cnv
}

function cloneImageUser(img) {
    //
    assureImage("img", "cloneImage", img)
    //
    return cloneImage(img)
}

///////////////////////////////////////////////////////////////////////////////

function adjustedImage(img, width, height) {
    //
    const cnv = createCanvas(width, height)
    cnv.getContext("2d").drawImage(img, 0, 0)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function isColor(val) {
    //
    if (typeof val != "string") { return false }
    //
    if (val == "") { return false }
    //
    if (val.toLowerCase() == "transparent") { return true }
    //
    const s = new Option().style
    s.color = val
    return s.color !== ""
}

function isSolidColor(color) { 
    //
    const cnv = createCanvas(1, 1)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    //
    const data = ctx.getImageData(0, 0, 1, 1).data
    //
    return (data[3] == 255)
}

function solidReversedColor(color) {
    //
    const cnv = createCanvas(1, 1)
    const ctx = cnv.getContext("2d")
    //
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    //
    const data = ctx.getImageData(0, 0, 1, 1).data
    //
    const r = 255 - data[0]
    const g = 255 - data[1]
    const b = 255 - data[2]
    //
    return "rgb(" + r + "," + g + "," + b + ")"
}

