
// # Copyright (c) 2022 Feudal Code Limitada #

/*   
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/ 


/*

    This file is supposed to be run with Deno.

    WARNING: THIS WRITES FILE ON YOUR CURRENT WORKING DIRECTORY
    
    It packages the source files of the GoodbyeHtml library into a 
    
    single file called goodbye.js in your current working directory.


*/



"use strict"


var consolidation = ""

var title = "Goodbye Library packager"

var sourceFiles = [
    //
    "source/assure.js", 
    "source/box.js", 
    "source/button.js", 
    "source/button-text.js", 
    "source/decoration.js",  
    "source/helper.js",
    "source/layer.js",
    "source/loader.js", 
    "source/mouse-handler.js", 
    "source/mouse-helper.js",  
    "source/panel.js", 
    "source/stage.js",  
    "source/surface.js", 
    "source/utils.js",
    "source/widget.js" 
]

var pathForPackaged = "goodbye.js"

var slashes = "/".repeat(80) + "\n"

// main ///////////////////////////////////////////////////////////////////////

function main() {
    // 
 // console.log("\u001Bc") // *clears console perfectly* //
    //
    console.log("running " + title)
    console.log("   -- no available options\n")
    //
    applyHead()
    applyBody()
    applyFoot()
    // 
    Deno.writeTextFileSync(pathForPackaged, consolidation)
}

///////////////////////////////////////////////////////////////////////////////

function applyHead() {
    //
    consolidation  = "// # Copyright (c) 2022 Feudal Code Limitada #\n\n"
    //
    consolidation += Deno.readTextFileSync("source/README.js")
    //
    consolidation +=  Deno.readTextFileSync("source/LIBRARY.js")
}

function applyBody() {
    //
    for (const file of sourceFiles) { consolidateSourceFile(file) }
} 

function applyFoot() {
    //
    consolidation += "\n\n} // end of library \n"
}

///////////////////////////////////////////////////////////////////////////////

function consolidateSourceFile(path) {
    //
    let txt = "\n\n\n// [[" + path + "]] "
    txt += "#".repeat(82 - txt.length) + "\n"
    //
    const jslines = loadTrimmedJsLines(path)
    //
    for (const line of jslines) { txt += "\n" + line  }
    //
    consolidation += txt
}

///////////////////////////////////////////////////////////////////////////////

function loadTrimmedJsLines(path) {
    //
    const text = loadFile(path).trimRight()
    //
    const lines = text.split("\n")    
    //
    for (let n = 0; n < lines.length; n++) {
        //
        lines[n] = lines[n].trimRight()
    }
    return lines
}

function loadFile(path) {
    try {
        return Deno.readTextFileSync(path)
    }
    catch (e) {
        console.log("ERROR: could not read: " + path) 
        Deno.exit(1)       
    }
}

// boot ///////////////////////////////////////////////////////////////////////

main()

