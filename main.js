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

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const process = require("process");
const { Worker } = require("worker_threads");


// Filter option entered in process arguments: grayscale, sepia, nothing for default
const filter = process.argv[2];

const run = async () => {
    await IOhandler.unzip(zipFilePath,pathUnzipped);
    await IOhandler.readDir(pathUnzipped)
        .then(
            files => {
                files.forEach((file, index) => {
                    const img = file;
                    const worker = new Worker("./worker_thread.js");
                    worker.postMessage({ img, pathProcessed, filter});
                    worker.on("message", () => {
                        console.log(`Worker ${index} completed`)
                    });
                });
            });
};

run()
