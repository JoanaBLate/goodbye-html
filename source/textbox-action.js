// # Copyright (c) 2022 Feudal Code Limitada #
"use strict"

///////////////////////////////////////////////////////////////////////////////

function setTextboxText(textbox, text) { 
    //
    assureString("text", "textbox.setText", text)
    //
    if (text.length > textbox.length) { argError("text", "textbox.setText", "too big text: " + text) }
    //
    const font = allFonts[textbox.fontId]
    //
    for (const c of text) {
        //
        if (font[c] == undefined) {  argError("text", "textbox.setText", "font doesn't have character: " + c) }
    }
    //
    textbox.text = text
    //
    textbox.cursorPosition = textbox.isRightStart ? text.length : 0
    //
    paintTextbox(textbox)
}

///////////////////////////////////////////////////////////////////////////////

function setTextboxOnChange(textbox, handler) {
    //
    assureNullOrFunction("handler", "textbox.setOnChange", handler)
    //
    textbox.onchange = handler
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function textboxOnMouseDown(textbox, x) {
    //
    textbox.cursorPosition = textboxIndexOnMouseDown(textbox, x)
    //
    startBlinking(textbox) 
}

function textboxIndexOnMouseDown(textbox, x) {
    //
    const sprites = textbox.sprites
    //
    for (const sprite of sprites) { 
        //
        if (x > sprite.right) { continue }
        //
        const center = sprite.left + (0.5 * sprite.width)
        //
        if (x <= center) { return sprite.order }
        //
        return sprite.order + 1
    }
    //
    return textbox.isRightStart ? 0 : textbox.text.length 
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function textboxOnKeyDown(textbox, e) {
    //
    if (e.ctrlKey) { return }
    //
    const original = textbox.text
    //
    const changed = processSpecialKeyDownOnTextbox(textbox, e)
    //
    if (changed) { 
        //
        paintTextbox(textbox)
        //
        if (textbox.onchange) { textbox.onchange(original, textbox.text) }
        return 
    }
    //
    //
    const font = allFonts[textbox.fontId]
    //
    if (font[e.key] == undefined) { return }
    //
    if (textbox.text.length == textbox.length) { return }
    //
    const list = textbox.text.split("")
    list.splice(textbox.cursorPosition, 0, e.key)
    textbox.text = list.join("")
    textbox.cursorPosition += 1
    //
    paintTextbox(textbox)
    //
    if (textbox.onchange) { textbox.onchange(original, textbox.text) }
}

function processSpecialKeyDownOnTextbox(textbox, e) {
    // 
    const low = e.key.toLowerCase()
    //
    const minpos = 0
    const maxpos = textbox.text.length
    //
    if (low == "arrowleft") {
        //
        if (textbox.cursorPosition == minpos) { return false }
        //
        textbox.cursorPosition -= 1
        return true
    }
    //
    if (low == "arrowright") {
        //
        if (textbox.cursorPosition == maxpos) { return false }
        //
        textbox.cursorPosition += 1
        return true
    }
    //
    if (low == "home") { 
        //
        if (textbox.cursorPosition == minpos) { return false }
        //
        textbox.cursorPosition = minpos
        return true
    }
    //
    if (low == "end")  {  
        //
        if (textbox.cursorPosition == maxpos) { return false }
        //
        textbox.cursorPosition = maxpos
        return true
    }
    //
    if (low == "delete") { 
        //
        if (textbox.cursorPosition == maxpos) { return false } // no digit ahead
        //
        const dellist = textbox.text.split("")
        dellist.splice(textbox.cursorPosition, 1)
        textbox.text = dellist.join("")
        return  true
    }
    //
    if (low == "backspace") { 
        //
        if (textbox.cursorPosition == minpos) { return false } // no digit ahead
        //
        const dellist = textbox.text.split("")
        dellist.splice(textbox.cursorPosition - 1, 1)
        textbox.text = dellist.join("")
        textbox.cursorPosition -= 1
        return  true
    }
}

