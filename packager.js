// # Copyright (c) 2022 Feudal Code Limitada #
// MIT License
"use strict"

/*
 *
 *  This file is supposed to be run with Deno.
 *  
 *
 *  WARNING: THIS WRITES IN YOUR CURRENT WORKING DIRECTORY
 *  
 *  
 *  It packages the source files of the GoodbyeHtml library into a 
 *  
 *  single file called goodbye.js in your current working directory.
 *
 *
*/


var consolidation = ""

var title = "Goodbye Library packager"

var sourcePaths = [ ]

var pathForHtmlFile = "source.html"

var pathForPackaged = "goodbye.js"

// main ///////////////////////////////////////////////////////////////////////

function main() {
    // 
    console.log("\u001Bc") // *clears console perfectly* //
    //
    console.log("running " + title)
    console.log("   -- no available options\n")
    //
    fillSourcePaths()
    //
    applyHead()
    applyBody()
    applyFoot()
    // 
    Deno.writeTextFileSync(pathForPackaged, consolidation)
}

///////////////////////////////////////////////////////////////////////////////

function fillSourcePaths() {
    //
    const html = loadFile(pathForHtmlFile)
    const lines = html.split("\n")
    //
    for (const line of lines) {
        //
        const trim = line.trim()
        if (! trim.startsWith("<script src=")) { continue }
        //
        const path = trim.replace("<script src=\"", "").replace("\"></script>", "")
        sourcePaths.push(path)
    }
}

///////////////////////////////////////////////////////////////////////////////

function applyHead() {
    //
    consolidation  = Deno.readTextFileSync("source/README.js")
    //
    consolidation +=  "\n\n\"use strict\""
    consolidation +=  "\n\nfunction createGoodbyeHtmlLibrary() {\n\n\n"
}

function applyBody() {
    //
    for (const path of sourcePaths) { consolidateSourceFile(path) }
} 

function applyFoot() {
    //
    consolidation += "\n\n\n\nreturn __createTheLibraryObject()"
    //
    consolidation += "\n\n}\n"
}

///////////////////////////////////////////////////////////////////////////////

function consolidateSourceFile(path) {
    //
    let txt = "\n\n\n// [[" + path + "]] "
    txt += "#".repeat(82 - txt.length) + "\n"
    //
    const jslines = loadTrimmedJsLines(path)
    //
    for (const line of jslines) { 
        //
        if (line == "// # Copyright (c) 2022 Feudal Code Limitada #") { continue }
        if (line == "// MIT License") { continue }
        if (line == '"use strict"') { continue }
        //    
        txt += "\n" + line  
    }
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

