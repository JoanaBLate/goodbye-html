///////////////////////////////////////////////////////////////////////////////

function paintImageOnPanel(panel, left, top, img) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.paintImage"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureImage("img", func, img) 
    //
    panel.context.drawImage(img, left, top)
}

///////////////////////////////////////////////////////////////////////////////

function clearRectOnPanel(panel, left, top, width, height) { 
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.clearRect"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    panel.context.clearRect(left, top, width, height)
}

///////////////////////////////////////////////////////////////////////////////

function paintRectOnPanel(panel, left, top, width, height, color) { 
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.paintRect"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureMinimumInteger("width", func, width, 1)
    //
    assureMinimumInteger("height", func, height, 1)
    //
    assureColor("color", func, color)
    //
    panel.context.clearRect(left, top, width, height)
    //
    panel.context.fillStyle = color
    //
    panel.context.fillRect(left, top, width, height)
}

///////////////////////////////////////////////////////////////////////////////

function writeOnPanel(panel, left, top, text) {
    //
    panel.layer.box.shallRepaint = true
    //
    const func = "panel.write"
    //
    assureInteger("left", func, left)
    //
    assureInteger("top", func, top)
    //
    assureString("txt", func, text)
    //
    if (panel.fontId == null) { 
        //
        throw("-- cannot write on panel " + panel.id + " of layer " + panel.layer.id + "; its font was not defined") 
    }
    // 
    const font = allFonts[panel.fontId]
    //
    return displayText(panel.context, left, top, font, text)
}

function displayText(ctx, left, top, font, text) {
    //
    for (const character of text) {
        //
        const sprite = font[character] 
        ctx.drawImage(sprite, left, top)
        left += sprite.width    
    }
    //
    return left
}

