// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function isDragging(e) {
    //
 // const dragging = (e.which == 1)  // good for chrome, bad for firefox (always 1)
 // const dragging = (e.button == 1) // only for pressing and releasing
    //
    return (e.buttons == 1)
}

///////////////////////////////////////////////////////////////////////////////

function findPanelUnderMouse(layers, x, y) {
    //
    const last = layers.length - 1
    //
    for (let n = last; n >= 0; n--) { 
        //
        const layer = layers[n]
        //
        if (! layer.visible) { continue }
        //
        const panel = findPanelUnderMouseInLayer(layer, x, y)
        //
        if (panel != null) { return panel }
    }
}

function findPanelUnderMouseInLayer(layer, x, y) {
    //
    for (const panel of layer.panels) {
        //
        if (! panel.visible) { continue }
        //
        if (panel.left > x) { continue }
        if (panel.left + panel.width < x) { continue }
        //
        if (panel.top > y) { continue }
        if (panel.top + panel.height < y) { continue }
        //
        return panel    
    }
    //
    return null
}

///////////////////////////////////////////////////////////////////////////////

function findWidgetUnderMouse(panel, x, y) {
    //
    for (const widget of panel.widgets) {
        //
        if (widget.left > x) { continue }
        if (widget.left + widget.width < x) { continue }
        //
        if (widget.top > y) { continue }
        if (widget.top + widget.height < y) { continue }
        //
        return widget    
    }
    //
    return null
}
    
///////////////////////////////////////////////////////////////////////////////
    
function tryOnMouseLeave(widget) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseleave) { widget.onmouseleave() }
}
    
///////////////////////////////////////////////////////////////////////////////
    
function tryOnMouseEnter(widget, x, y, dragging, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseenter) { widget.onmouseenter(x, y, dragging, shiftKey, ctrlKey) }
}

///////////////////////////////////////////////////////////////////////////////
    
function tryOnMouseMove(widget, x, y, dragging, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmousemove) { widget.onmousemove(x, y, dragging, shiftKey, ctrlKey) }
}
  
///////////////////////////////////////////////////////////////////////////////
    
function tryOnMouseDown(widget, x, y, shiftKey, ctrlKey) {
    //
    if (widget == null) { return }
    //
    if (widget.onmousedown) { widget.onmousedown(x, y, shiftKey, ctrlKey) }
}
    
///////////////////////////////////////////////////////////////////////////////
    
function tryOnMouseUp(widget, x, y) {
    //
    if (widget == null) { return }
    //
    if (widget.onmouseup) { widget.onmouseup(x, y) }
}

