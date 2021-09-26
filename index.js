#!/usr/bin/env node

const fs = require("fs"); // include modules for file system
const util = require("util"); // includes utilities module for promisify
const chalk = require("chalk");
const path = require("path");

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    console.log(err);
    return;
  }

  //GOOD CODE - promise.all solution
  //create an array like [lstat(fileName1),lstat(fileName2),lstat(fileName3),lstat(fileName4)]
  const statPromises = fileNames.map((fileName) => {
    return lstat(path.join(targetDir, fileName));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log(fileNames[index]);
    } else {
      console.log(chalk.green.bold(fileNames[index]));
    }
  }
});

//to run, start powershell like this
//PS C:\Windows\System32\WindowsPowerShell\v1.0> powershell.exe -executionPolicy Unrestricted
