#!/usr/bin/env node

const fs = require("fs"); // include modules for file system
const util = require("util"); // includes utilities module for promisify

// Method #2: promisify the lstat function
//const lstat = util.promisify(fs.lstat);

// Method #3: use fs.promises
const lstat = fs.promises.lstat;

// process moule is always loaded, cwd = 'current working directory'
fs.readdir(process.cwd(), async (err, fileNames) => {
  /*
either err === err object which means something went wrong
or err === null which means it worked
    */
  if (err) {
    // handle error
    console.log(err);
    return;
  }

  //GOOD CODE - promise solution
  for (let fileName of fileNames) {
    try {
      const stats = await lstat(fileName);
      console.log(fileName, stats.isFile());
    } catch (err) {
      console.log(err);
    }
  }
});

// Method #1: create our own promise
// const lstat = (fileName) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(fileName, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };

//to run, start powershell like this
//PS C:\Windows\System32\WindowsPowerShell\v1.0> powershell.exe -executionPolicy Unrestricted
