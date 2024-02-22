const  { parentPort, workerData } = require("worker_threads")
const IOhandler = require("./IOhandler")

parentPort.on("message",(workerData) =>{
    const { img, pathProcessed, filter } = workerData;
    IOhandler.grayScale(img,pathProcessed,filter);
    parentPort.postMessage("done");
    parentPort.close();
});