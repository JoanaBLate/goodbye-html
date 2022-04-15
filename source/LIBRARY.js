// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function __createTheLibraryObject() {
    //
    const lib = {
        //
        "allFonts": allFonts,
        "allImages": allImages,
        "createLoader": createLoader,
        //
        "setFontsForSpecialLayers": setFontsForSpecialLayers,
        //
        "loadImage": loadImage,
        "saveImage": saveImage,
        //        
        "cloneImage": cloneImageUser,
        "createCanvas": createColorCanvasUser,
        "fadeImage": fadeImageUser,
        "createCheckerboard": createCheckerboardUser,
        "negativeFromImage": negativeFromImageUser,
        "createLabel": createLabelUser,
        "createPadLabel": createPadLabelUser,
        "calcTextLength": calcTextLengthUser,
        //
        "createBox": createBox
    }
    //
    Object.freeze(lib)
    return lib
}

