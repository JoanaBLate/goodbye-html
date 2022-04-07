// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function setButtonText(__button, fontId, text) {
    //
    const func = "button.setText"
    //
    assureGoodId("fontId", func, fontId, allFonts)
    //
    assureString("text", func, text)
}

