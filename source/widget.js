// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function assureWidgetFitsInPanel(w) { // minimum left & top checked
    //
    const panel = w.panel
    //
    const txt1 = "-- " + w.kind + " " + w.id + " passes "
    //
    const txt2 = " edge of its panel"
    //
    if (w.left + w.width > panel.width)  { throw txt1 + "right" + txt2 }
    //
    if (w.top + w.height > panel.height) { throw txt1 + "bottom" + txt2 }
}
  
///////////////////////////////////////////////////////////////////////////////

function assureWidgetDoesntClash(w) {
    //
    for (const candidate of w.panel.widgets) {
        //
        if (candidate.left + candidate.width <= w.left) { continue } // candidate at left
        //
        if (w.left + w.width <= candidate.left) { continue } // candidate at right
        //
        if (candidate.top + candidate.height <= w.top) { continue } // candidate is above
        //
        if (w.top + w.height <= candidate.top) { continue } // candidate is below
        //
        throw "-- " + w.kind + " " + w.id + " clashes with " + candidate.kind + " " + candidate.id
    }
}

