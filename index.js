#! /usr/bin/env node
import * as fs from "fs";
// [x] DESCRIPTION
// [x] USAGE
// [x] OPTIONS
// [x] EXAMPLES - input, description, output
// [x] Print photos in current directory when no arguments passed
// [x] Print help when -h or --help is passed
// [] -d implementation
// [] -r implementation
// [] -p implementation
if (process.argv.length === 2) {
    const contents = fs.readdirSync(".");
    console.log(contents);
}
else {
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg === "-h" || arg === "--help") {
            printHelp();
        }
        if (arg === "-p" || arg === "--path") {
            console.log("print the path");
        }
    }
}
function printHelp() {
    console.log(`photos - prints out photo files in current directory`);
    console.log(``);
    // USAGE
    console.log(`USAGE`);
    console.log(``);
    console.log(`   photos [--help] [options]`);
    console.log(``);
    // OPTIONS
    console.log(`OPTIONS`);
    console.log(``);
    console.log(`   -h --help - display detailed help`);
    console.log(``);
    console.log(`   -d --directory <file directory> - specify directory to read from (default: current directory)`);
    console.log(``);
    console.log(`   -r --recursive - search all sub-folders inside selected folder`);
    console.log(``);
    console.log(`   -p --path - include file path`);
    console.log(``);
    // EXAMPLES
    console.log(`EXAMPLE 0:`);
    console.log(``);
    console.log(`   photos`);
    console.log(`   Prints a list of photos in current directory`);
    console.log(``);
    console.log(`   cuteCat.jpg`);
    console.log(`   _DSC08736.NEF`);
    console.log(``);
    console.log(`EXAMPLE 1:`);
    console.log(``);
    console.log(`   photos -d "~/Photos"`);
    console.log(`   Prints a list of photos in input directory (in this case, Photos)`);
    console.log(``);
    console.log(`   meow.jpg`);
    console.log(`   woof.png`);
    console.log(`   _DSC08736.NEF`);
    console.log(``);
    console.log(`EXAMPLE 2:`);
    console.log(``);
    console.log(`   photos -r -p "~/Photos"`);
    console.log(`   Prints a list of photos in input directory (in this case, Photos), recursively, along with file path`);
    console.log(``);
    console.log(`   ~/Photos/meow.jpg`);
    console.log(`   ~/Photos/meh.png`);
    console.log(`   ~/Photos/_DSC08736.NEF`);
}
