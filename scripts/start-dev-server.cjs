const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const cwd = path.resolve(__dirname, "..");
const out = fs.openSync(path.join(cwd, "dev-server.log"), "a");
const err = fs.openSync(path.join(cwd, "dev-server.err.log"), "a");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const child = spawn(
  npmCommand,
  ["run", "dev", "--", "--host", "127.0.0.1", "--port", "5173"],
  {
    cwd,
    detached: true,
    stdio: ["ignore", out, err],
    windowsHide: true,
  },
);

child.unref();
console.log(child.pid);
