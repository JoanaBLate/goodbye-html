// # Copyright (c) 2014-2022 Feudal Code Limitada #
"use strict"

function keyDownHandler(box, e) {
    //
    const low = e.key.toLowerCase()
 // console.log(low)
    //
    if (low == "f5")  { return true }
    if (low == "f11") { return true }
    if (low == "f12") { return true }
    if (low == "tab") { return true }
    // 
    if (low == "-"  &&  e.ctrlKey) { return true }
    if (low == "+"  &&  e.ctrlKey) { return true }
    if (low == "="  &&  e.ctrlKey) { return true }
    if (low == "j"  &&  e.ctrlKey  &&  e.shiftKey) { return true }
    if (low == "u"  &&  e.ctrlKey) { return true }
    // 
    if (box.focusedWidget != null) { 
        //
        if (box.focusedWidget.onkeydown) { box.focusedWidget.onkeydown(e) }
    }
    //
    e.preventDefault()
    e.stopPropagation()
    //
    return false // should not happen
}

