// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////
  
function setStageHandlers(box) {
    //
    box.stage.onmouseleave = function () { stageOnMouseLeave(box) }
    //
    box.stage.onmousemove = function (e) { stageOnMouseMove(box, e) }
    //
    box.stage.onmousedown = function (e) { stageOnMouseDown(box, e) }
    //
    box.stage.onmouseup = function (e) { stageOnMouseUp(box, e) }
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseLeave(box) {
    //
    tryOnMouseLeave(box.lastWidgetUnderMouse)
    box.lastWidgetUnderMouse = null    
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseMove(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    const dragging = isDragging(e)
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) { 
        //
        tryOnMouseLeave(box.lastWidgetUnderMouse)
        box.lastWidgetUnderMouse = null    
        return 
    }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    const last = box.lastWidgetUnderMouse
    //
    box.lastWidgetUnderMouse = widget
    //
    //
    if (dragging  &&  widget != last) { box.focusedWidget = null }
    //
    //
    if (widget == null  &&  last == null) { return }
    //
    if (widget == null  &&  last != null) { tryOnMouseLeave(last); return }
    //
    if (widget != null  &&  last == null) { 
        //
        tryOnMouseEnter(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
        //
        tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
        //
        return
    }
    //
    if (widget == last) { tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey); return }
    //
    // both not null and not the same
    //
    tryOnMouseLeave(last)
    //
    tryOnMouseEnter(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
    tryOnMouseMove(widget, x-widget.left, y-widget.top, dragging, e.shiftKey, e.ctrlKey)
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseDown(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) { return }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    box.lastWidgetUnderMouse = widget 
    //    
    box.focusedWidget = widget
    //
    if (widget == null) { return }
    //
    tryOnMouseDown(widget, x-widget.left, y-widget.top, e.shiftKey, e.ctrlKey)
}

///////////////////////////////////////////////////////////////////////////////

function stageOnMouseUp(box, e) {
    //
    const stageX = e.offsetX
    const stageY = e.offsetY
    //
    const panel = findPanelUnderMouse(box.layers, stageX, stageY)
    //
    if (panel == null) { return }
    //
    const x = stageX - panel.left
    const y = stageY - panel.top
    //
    const widget = findWidgetUnderMouse(panel, x, y)
    //
    box.lastWidgetUnderMouse = widget
    //
    if (widget == null) { return }
    //
    tryOnMouseUp(widget, x-widget.left, y-widget.top) 
}

