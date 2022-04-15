// # Copyright (c) 2022 Feudal Code Limitada #
"use strict"

/////////////////////////////////////////////////////////////////////////////////

function paintTextbox(textbox) { 
    //
    clearPanelUnderWidget(textbox)
    //
    if (! textbox.visible) { return }
    //
    const width = textbox.width
    //
    const height = textbox.height
    //
    const ctx = textbox.context
    //
    const grey = getGreyFromString(textbox.panel.bgColor)
    //
    const dark = grey < 60 
    //
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    //
    if (textbox.isRightStart) {
        paintTextInTextboxRightStart(textbox)
    }
    else {
        paintTextInTextboxLeftStart(textbox)    
    }
    //
    ctx.fillStyle = dark ? "grey" : "black" 
    ctx.fillRect(0, 0, width, 1) // top
    ctx.fillRect(0, height-1, width, 1) // bottom
    ctx.fillRect(0, 0, 1, height) // left
    ctx.fillRect(width-1, 0, 1, height) // right
    //
    if (textbox.disabled) {
        //
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(1, 1, width-2, height-2)
    }
    //
    textbox.panel.context.drawImage(textbox.canvas, textbox.left, textbox.top)
}

//////////////////////////////////////////////////////////////////////////////

function paintTextInTextboxLeftStart(textbox) {
    //
    const box = textbox.panel.layer.box
    //
    const sprites = spritesForTextboxPainting(box, textbox)
    //
    while (cursorIsBeyondEnd(box, textbox, sprites)) { sprites.shift() }
    //
    let left = 5
    //
    for (const sprite of sprites) { 
        //
        textbox.context.drawImage(sprite.image, left, textbox.textTop)
        //
        sprite.left = left
        sprite.right = left + sprite.width
        //
        left += sprite.width + 1 // +1 as spacer
    }
    //
    textbox.sprites = sprites
}

function cursorIsBeyondEnd(box, textbox, sprites) {
    //
    if (textbox != box.focusedWidget) { return false }
    //
    let left = 0
    //
    const max = textbox.width - 15 // two borders + blank space
    //    
    for (const sprite of sprites) {
        //
        if (left > max) { break }
        //
        if (sprite.symbol == "cursor") { return false }
        //
        left += sprite.width + 1 // +1 as spacer
    }
    //
    return true
}

///////////////////////////////////////////////////////////////////////////////
    
function paintTextInTextboxRightStart(textbox) {
    //
    const box = textbox.panel.layer.box
    //
    const sprites = spritesForTextboxPainting(box, textbox)
    //
    while (cursorIsBeyondStart(box, textbox, sprites)) { sprites.pop() }
    //
    let left = textbox.width - 4
    //
    const max = sprites.length - 1
    //
    for (let n = max; n > -1; n--) {
        //
        const sprite = sprites[n]
        //
        left -= sprite.width + 1 // +1 as spacer
        //
        sprite.left = left
        sprite.right = left + sprite.width
        //
        textbox.context.drawImage(sprite.image, left, textbox.textTop)
    }
    //
    textbox.sprites = sprites
}

function cursorIsBeyondStart(box, textbox, sprites) {
    //
    if (textbox != box.focusedWidget) { return false }
    //
    let left = textbox.width - 15 // two borders + blank space
    //
    const max = sprites.length - 1
    //
    for (let n = max; n > -1; n--) {
        //
        const sprite = sprites[n]
        //
        left -= sprite.width + 1 // +1 as spacer
        //
        if (left < 0) { break }
        //
        if (sprite.symbol == "cursor") { return false }
    }
    //
    return true
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function TextboxSprite(order, symbol, image) {
    //
    this.order = order
    this.symbol = symbol
    this.image = image
    this.left = 0
    this.right = 0
    this.width = image.width
}

function createTextboxSprite(order, symbol, image) {
    //
    const obj = new TextboxSprite(order, symbol, image)
    Object.seal(image)
    return obj
}

///////////////////////////////////////////////////////////////////////////////

function spritesForTextboxPainting(box, textbox) {
    //
    const font = allFonts[textbox.fontId]
    //
    const symbols = textbox.text.split("")
    //
    const sprites = [ ]
    //
    for (let n = 0; n < symbols.length; n++) { 
        //
        maybeInsertCursor(box, textbox, sprites, n)  
        //  
        const symbol = symbols[n]
        const sprite = createTextboxSprite(n, symbol, font[symbol])
        sprites.push(sprite)
    }
    //
    maybeInsertCursor(box, textbox, sprites, symbols.length)
    //
    return sprites
}

function maybeInsertCursor(box, textbox, sprites, n) {
    //
    if (textbox != box.focusedWidget) { return }
    //
    if (n != textbox.cursorPosition) { return }
    //
    const img = box.blinking ? textbox.redCursor : textbox.blankCursor
    //
    const cursor = createTextboxSprite(n, "cursor", img)
    //
    sprites.push(cursor)
}

