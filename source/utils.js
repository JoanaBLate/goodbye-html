// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function createLabelUser(fontId, bgColor, width, height, text) {
    //
    const func = "library.createLabel"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureColor("bgColor", func, bgColor) 
    //    
    assureMinimumInteger("width", func, width, 3)
    //    
    assureMinimumInteger("height", func, height, 3)
    //
    assureString("text", func, text)
    //
    return createLabel(fontId, bgColor, width, height, text)
}

function createLabel(fontId, bgColor, width, height, text) {
    //
    const font = allFonts[fontId]
    //
    const symbol = (text == "") ? "." : text[0]
    const sample = font[symbol]
    //
    const cnv = createColorCanvas(width, height, bgColor)
    const ctx = cnv.getContext("2d")
    //
    const restH = width - calcTextLength(fontId, text)
    const left = Math.floor(restH / 2)
    //
    const restV = height - (sample.height)
    const top = 2 + Math.floor(restV / 2)
    //
    displayText(ctx, font, left, top, text)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function createPadLabelUser(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const func = "library.createPadLabel"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureColor("bgColor", func, bgColor) 
    //    
    assureMinimumInteger("padLeft", func, padLeft, 0)
    //    
    assureMinimumInteger("padRight", func, padRight, 0)
    //    
    assureMinimumInteger("padTop", func, padTop, 0)
    //    
    assureMinimumInteger("padBottom", func, padBottom, 0)
    //
    assureString("text", func, text)
    //
    return createPadLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text)
}

function createPadLabel(fontId, bgColor, padLeft, padRight, padTop, padBottom, text) {
    //
    const font = allFonts[fontId]
    //
    const symbol = (text == "") ? "." : text[0]
    const sample = font[symbol]
    //
    const width = padLeft + calcTextLength(fontId, text) + padRight
    //
    const height = padTop + sample.height + padBottom
    //
    const cnv = createColorCanvas(width, height, bgColor)
    const ctx = cnv.getContext("2d")
    //
    displayText(ctx, font, padLeft, padTop, text)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function calcTextLengthUser(fontId, text) {
    //
    const func = "library.calcTextLength"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
    //
    return calcTextLength(fontId, text)
}

function calcTextLength(fontId, text) {
    //
    const font = allFonts[fontId]
    //
    let len = 0
    //
    for (const symbol of text) { len += font[symbol].width }
    //
    return len
}

///////////////////////////////////////////////////////////////////////////////

function negativeFromImageUser(img) {
    //
    assureImage("img", "library.negativeFromImage", img) 
    //
    return negativeFromImage(img)
}

function negativeFromImage(img) {
    //
    const cnv = cloneImage(img)
    const ctx = cnv.getContext("2d")
    //
    const imgdata = ctx.getImageData(0, 0, cnv.width, cnv.height)
    const data = imgdata.data
    //
    let index = data.length - 1
    //
    while (index >= 0) {
        //
        // skipping alpha
        data[index - 1] = 255 - data[index - 1] // blue
        data[index - 2] = 255 - data[index - 2] // green
        data[index - 3] = 255 - data[index - 3] // red
        //
        index -= 4    
    }
    //
    ctx.putImageData(imgdata, 0, 0)
    return cnv
}

//////////////////////////////////////////////////////////////////////////////

function fadeImageUser(img, color, opacity) {
    //
    const func = "library.fadeImage"
    //
    assureImage("img", func, img)
    //
    assureSolidColor("color", func, color) 
    //
    assureProportion("opacity", func, opacity)
    //
    return fadeImage(img, color, opacity)
}

function fadeImage(img, color, opacity) {
    //
    const cnv = createColorCanvas(img.width, img.height, color)
    const ctx = cnv.getContext("2d")
    //
    ctx.globalAlpha = opacity
    ctx.drawImage(img, 0, 0)
    ctx.globalAlpha = 1
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function createCheckerboardUser(width, height, w, h, colorA, colorB) {
    //
    const func = "createCheckerboard"    
    //
    assureMinimumInteger("width", func, width, 3)
    //
    assureMinimumInteger("height", func, height, 3)
    //
    assureMinimumInteger("w", func, w, 1)
    //
    assureMinimumInteger("h", func, h, 1)
    //
    assureColor("colorA", func, colorA)
    //
    assureColor("colorB", func, colorB)    
    //
    return createCheckerboard(width, height, w, h, colorA, colorB)
}

function createCheckerboard(width, height, w, h, colorA, colorB) {
    //
    const base = createColorCanvas(width, height, colorA)
    const ctx = base.getContext("2d")
    //
    const a = null
    const b = createColorCanvas(w, h, colorB)
    //
    //
    let left = 0
    let top = 0
    let imgs = [a, b]
    let start = [a, b]
    //
    while (true) {
        //
        const img = imgs[0]
        if (img) { ctx.drawImage(img, left, top) }
        //
        imgs.push(imgs.shift())
        left += 50
        if (left < 800) { continue }
        //
        left = 0
        top += 50
        start.push(start.shift())
        imgs = start.slice(0)     
        //
        if (top == 450) { break }
    }
    //
    return base
}

