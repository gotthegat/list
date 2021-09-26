#!/usr/bin/env node

const fs = require("fs"); // include modules for file system

// process moule is always loaded, cwd = 'current working directory'
fs.readdir(process.cwd(), (err, fileNames) => {
  /*
either err === err object which means something went wrong
or err === null which means it worked
    */
  if (err) {
    // handle error
    console.log(err);
    return;
  }

  //GOOD CODE - callback solution
  //store results of lstat calls in array, log when array is full
  const allStats = Array(fileNames.length).fill(null);
  for (let fileName of fileNames) {
    const index = fileNames.indexOf(fileName); // get index of file
    fs.lstat(fileName, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      allStats[index] = stats; // put stats object into array
      // check for null values
      const ready = allStats.every((stats) => {
        return stats; // tihs either returns null or an object
      });
      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(fileNames[index], stats.isFile());
        });
      }
    });
  }

  //BAD CODE
  /*for (let fileName of fileNames) {
    fs.lstat(fileName, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(fileName, stats.isFile());
    });
  }*/
});

//to run, start powershell like this
//PS C:\Windows\System32\WindowsPowerShell\v1.0> powershell.exe -executionPolicy Unrestricted
