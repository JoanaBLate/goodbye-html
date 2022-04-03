///////////////////////////////////////////////////////////////////////////////

function createLayer(id, box) {
    //
    const layer = { "id": id, "box": box, "visible": true, "panels": [ ] }
    //
    Object.seal(layer)
    //
    return layer
}

///////////////////////////////////////////////////////////////////////////////

function getLayer(box, id) {
    //
    for (const layer of box.layers) { 
        //
        if (layer.id == id) { return layer }
    }
    return null    
}

function getLayerOrClash(box, id, func) {
    //
    const layer = getLayer(box, id)
    //
    if (layer != null) { return layer }
    //
    argError("id", func, "unknown layer: " + id)
}

/////////////////////////////////////////////////////////////////////////////////

function getLayerUser(box, id) {
    //
    const layer = getLayerOrClash(box, id, "box.getLayer")
    //
    const obj = {
        //
        "id": layer.id,
        //   
        "createPanel": function (left, top, width, height, bgColor) { return createPanel(layer, left, top, width, height, bgColor) },
        //
        "show": function () { layer.visible = true; box.shallRepaint = true },
        //
        "hide": function () { layer.visible = false; box.shallRepaint = true },
        //
        "visible": function () { return layer.visible },
        //
        "log": function () { console.log(layer) }
    }
    //
    Object.freeze(obj)
    return obj
}

/////////////////////////////////////////////////////////////////////////////////

function initLayers(box, ids) {
    //
    const param = "ids"
    const func = "box.createLayers"
    //
    if (box.layers.length != 0) { throw("-- calling again function " + func) }
    //
    assureNonEmptyList(param, func, ids)
    //
    for (const id of ids) {
        //
        if (typeof id != "string") { argError(param, func, "this item is not a string: " + id) }
        //
        if (id === "") { argError(param, func, "empty string inside the list") } 
        //
        if (getLayer(box, id) != null) { argError(param, func, "duplicated id: " + id) }
        //
        const layer = createLayer(id, box)        
        //
        box.layers.push(layer)
    }
}

///////////////////////////////////////////////////////////////////////////////

function exchangeLayers(box, ids) { 
    //
    box.shallRepaint = true
    //
    const param = "ids"
    const func = "box.exchangeLayers"
    //
    assureList(param, func, ids)
    //
    if (ids.length != box.layers.length) { 
        //
        argError(param, func, "expecting list with " + box.layers.length + " items, got: " + ids.length + " items")
    }
    //
    const doneIds = [ ]
    const layers = [ ]
    //
    for (const id of ids) {
        //
        if (typeof id != "string") { argError(param, func, "this item is not a string: " + id) }
        //
        if (id === "") { argError(param, func, "empty string inside the list") } 
        //
        if (doneIds.includes(id)) { argError(param, func, "duplicated item: " + id) }
        //
        const layer = getLayer(box, id) 
        //
        if (layer == null) { argError(param, func, "unknown virtual layer: " + id) }
        //
        doneIds.push(id)
        layers.push(layer)
    }
    //
    box.layers = layers
}

