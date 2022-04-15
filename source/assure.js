// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

///////////////////////////////////////////////////////////////////////////////

function argError(param, func, txt) {
    //
    let msg = "-- wrong argument " + param + " for function " + func
    //
    if (txt) { msg += ": " + txt}
    //
    throw(msg)
}

///////////////////////////////////////////////////////////////////////////////

function assureBoolean(param, func, val) {
    //
    if (val === true  ||  val === false) { return }
    //
    argError(param, func, "expecting boolean, got: " + val) 
}

///////////////////////////////////////////////////////////////////////////////

function __assureNumber(param, func, val) {
    //
    const msg = "expecting number, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureInteger(param, func, val) {
    //
    const msg = "expecting integer, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureThisInteger(param, func, val, ref) {
    //
    const msg = "expecting integer == " + ref + ", got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
    //
    if (val != ref) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureMinimumInteger(param, func, val, min) {
    //
    const msg = "expecting integer >= " + min + ", got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (Math.floor(val) !== val) { argError(param, func, msg) }
    //
    if (val < min) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureProportion(param, func, val) {
    //
    const msg = "expecting number >= 0 and <= 1, got: " + val
    //
    if (isNaN(val)) { argError(param, func, msg) }
    //
    if (typeof(val) == "string") { argError(param, func, msg.replace("got:", "got string:")) }
    //
    if (typeof(val) != "number") { argError(param, func, msg) }
    //
    if (val < 0) { argError(param, func, msg) }
    if (val > 1) { argError(param, func, msg) }
}

///////////////////////////////////////////////////////////////////////////////

function assureString(param, func, val) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
}

function assureNonEmptyString(param, func, val) {
    //
    assureString(param, func, val)
    //
    if (val == "") { argError(param, func, "got empty string") }
}

///////////////////////////////////////////////////////////////////////////////

function assureList(param, func, val) {
    //
    if (! Array.isArray(val)) { argError(param, func, "expecting list, got: " + val) }
}

function assureNonEmptyList(param, func, val) {
    //
    assureList(param, func, val)
    //
    if (val.length == 0) { argError(param, func, "got empty list") }
}

///////////////////////////////////////////////////////////////////////////////

function assureNullOrFunction(param, func, val) {
    //
    if (val === null) { return }
    if (typeof val == "function") { return }
    //
    argError(param, func, "expecting null or function, got: " + val)
}

///////////////////////////////////////////////////////////////////////////////

function assureImage(param, func, val) {
    //
    if (val == "") { argError(param, func, "expecting image, got empty string") }
    //
    if (typeof val != "object") { argError(param, func, "expecting image, got: " + val) }
    //
    if (val.src) { return } // image
    //
    if (val.getContext) { return } // canvas
    //
    argError(param, func, "expecting image, got: " + val)
}

///////////////////////////////////////////////////////////////////////////////

function assureColor(param, func, val) { 
    //
    if (! isColor(val)) { argError(param, func, "invalid color: " + val) }
}

function assureSolidColor(param, func, val) { 
    //
    assureColor(param, func, val)
    //
    if (! isSolidColor(val)) { argError(param, func, "not a solid color: " + val) }
}

///////////////////////////////////////////////////////////////////////////////

function assureName(param, func, val) {
    //
    if (typeof val != "string") { argError(param, func, "expecting name, got: " + val) }
    //
    if (val == "") { argError(param, func, "expecting name, got empty string") }
    //
    if (val != val.toLowerCase()) {
        //
        argError(param, func, "upper case letter(s) in name: " + val) 
    }
    //
    if (val[0] < "a" || val[0] > "z") { 
        //
        argError(param, func, "name not starting with letter: " + val) 
    }
    //
    for (const c of val) {
        //
        if (c >= "a"  &&  c <= "z") { continue }
        if (c >= "0"  &&  c <= "9") { continue }
        if (c != "-") {
            //
            argError(param, func, "invalid character '" + c + "' in name: " + val) 
        }    
    }
    //
    return val
}

///////////////////////////////////////////////////////////////////////////////

function assureGoodId(param, func, val, dict) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
    //
    if (val == "") { argError(param, func, "got empty string") }
    //
    if (dict[val] == undefined) { argError(param, func, "unknown: " + val) }
}

///////////////////////////////////////////////////////////////////////////////

function assureFreeId(param, func, val, dict) {
    //
    if (typeof val != "string") { argError(param, func, "expecting string, got: " + val) }
    //
    if (val == "") { argError(param, func, "got empty string") }
    //
    if (dict[val] != undefined) { argError(param, func, "already used id: " + val) }
}

