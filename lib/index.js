const createRouter = require("./createRouter");
const execa = require("execa");
const process = require("process");
const runServe = async () => {
  createRouter();

  const subprocess = execa("npm", ["run", "serve"], { cwd: `./` });
  subprocess.stdout.pipe(process.stdout);
  subprocess.on('close', (code, signal) => {
    console.log(
      `child process terminated due to receipt of signal ${signal}`);
  });
  process.on("SIGINT", function () {
    console.log("主进程退出了");
    subprocess.kill("SIGKILL");
    process.exit();
  });
  const { stdout } = await subprocess;
  console.log("child output:", stdout);
};
runServe();
