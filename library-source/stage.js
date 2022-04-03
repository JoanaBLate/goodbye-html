///////////////////////////////////////////////////////////////////////////////

function createStage(box) { 
    //
    box.stage = createCanvas(box.width, box.height)
    box.stageCtx = box.stage.getContext("2d")
    //
    box.stage.display = "inline-block"
    box.stage.style.margin = "0px"
    box.stage.style.padding = "0px"
    box.stage.style.top = "0px"
    box.stage.style.left = "0px"
    box.stage.style.backgroundColor = box.bgColor
    //
    box.parent.appendChild(box.stage)
    //
    setStageHandlers(box)
    //
    mainLoop(box)
}

///////////////////////////////////////////////////////////////////////////////

function setStageBgColor(box, color) {
    //
    if (color === null) { color = "transparent" }
    //
    assureColor("color", "box.setBgColor", color)
    //
    box.stage.style.backgroundColor = color
}

///////////////////////////////////////////////////////////////////////////////

function paintStage(box) {
    //
    box.stageCtx.clearRect(0, 0, box.width, box.height)
    //
    for (const layer of box.layers) { paintLayer(layer) }
}

function paintLayer(layer) {
    //
    if (! layer.visible) { return }
    //
    for (const panel of layer.panels) {
        //
        if (! panel.visible) { continue }
        //
        paintPanelBgOnStage(panel)
        paintPanelCanvasOnStage(panel)
    }
}

