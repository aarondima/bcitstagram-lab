const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: 15/02/2024
 * Author: Aaron Dimatulac
 *
 */

const IOhandler = require("./IOhandler");
const { pipeline } = require("stream");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const process = require("process");
const { Worker } = require("worker_threads");

const filter = process.argv[2]
// IOhandler.unzip(zipFilePath,pathUnzipped)

IOhandler.readDir(pathUnzipped)
.then(
    files => {
    files.forEach(file => {
        // const worker = new Worker("./worker_threads.js");

        IOhandler.grayScale(file,pathProcessed,filter)
    });
})