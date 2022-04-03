"use strict"    

///////////////////////////////////////////////////////////////////////////////

function createGoodbyeHtmlLibrary() {
    //
    let resourcesToLoad = 0
    //
    const allImages = { }
    //
    const allFonts = { }
    //
    //
    const lib = {
        //
        "allFonts": allFonts,
        "allImages": allImages,
        "createLoader": createLoader,
        //        
        "cloneImage": cloneImageUser,
        "createCanvas": createColorCanvasUser,
        "fadeImage": fadeImageUser,
        "createCheckerboard": createCheckerboardUser,
        "negativeFromImage": negativeFromImageUser,
        "createLabel": createLabelUser,
        "calcTextLength": calcTextLengthUser,
        //
        "createBox": createBox
    }
    //
    Object.freeze(lib)
    return lib

// ############################################################################
// ############################################################################
// ############################################################################
