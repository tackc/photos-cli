#! /usr/bin/env node
import * as fs from "fs";
import * as path from "path";

interface IArgs {
  help: boolean;
  directory: string;
  path: boolean;
  recursive: boolean;
}

let directoryCount = 0;
const args: IArgs = {
  help: false,
  directory: ".",
  path: false,
  recursive: false,
};

if (process.argv.length === 2) {
} else {
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === "-h" || arg === "--help") {
      args.help = true;
    }
    if (arg === "-p" || arg === "--path") {
      args.path = true;
    }
    if (arg === "-d" || arg === "-directory") {
      args.directory = process.argv[i + 1];
    }
    if (arg === "-r" || arg === "-recursive") {
      args.recursive = true;
    }
  }
}
console.log(args);
if (args.help) {
  printHelp();
} else {
  if (args.recursive) {
    printDirectoryRecursively(args.directory);
    console.log(directoryCount);
  } else {
    const contents = fs.readdirSync(args.directory, { withFileTypes: true });
    contents.forEach((content) => {
      const fullPath = path.resolve(path.join(args.directory, content.name));
      args.path
        ? console.log(fullPath + "\n")
        : console.log(content.name + "\n");
    });
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
  console.log(
    `   -d --directory <file directory> - specify directory to read from (default: current directory)`
  );
  console.log(``);
  console.log(
    `   -r --recursive - search all sub-folders inside selected folder`
  );
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
  console.log(
    `   Prints a list of photos in input directory (in this case, Photos)`
  );
  console.log(``);
  console.log(`   meow.jpg`);
  console.log(`   woof.png`);
  console.log(`   _DSC08736.NEF`);
  console.log(``);

  console.log(`EXAMPLE 2:`);
  console.log(``);
  console.log(`   photos -r -p "~/Photos"`);
  console.log(
    `   Prints a list of photos in input directory (in this case, Photos), recursively, along with file path`
  );
  console.log(``);
  console.log(`   ~/Photos/meow.jpg`);
  console.log(`   ~/Photos/meh.png`);
  console.log(`   ~/Photos/_DSC08736.NEF`);
}

function printDirectoryRecursively(dir: string) {
  try {
    const contents = fs.readdirSync(dir, {
      withFileTypes: true,
    });
    contents.forEach((content) => {
      const fullPath = path.join(dir, content.name);
      if (content.isDirectory()) {
        directoryCount++;
        args.path
          ? console.log(fullPath + "\n")
          : console.log(content.name + "\n");
        printDirectoryRecursively(fullPath);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
