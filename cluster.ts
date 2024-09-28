const os = require("node:os");
const cluster = require("node:cluster")

const runPrimaryProcess = () => {
    const processCount = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    console.log(`Forking Server with ${processCount} process`);

    for (let index = 0; index < processCount; index++) cluster.fork();

    cluster.on("exit", (worker: any, code: any, signal: any) => {
        if (code !== 0 && !worker.exitAfterDisconnect) {
            console.log(`worker ${worker.process.pid} morreu`);
            cluster.fork();
        }
    })
}

const runWorkerProcess = async () => {
    await import('./src/main');
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()