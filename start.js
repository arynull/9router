// Run the 9router CLI headless on the platform-assigned port, with its
// data directory kept inside the app workspace.
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

const env = {
  ...process.env,
  PORT: process.env.PORT || "20128",
  HOSTNAME: "0.0.0.0",
  DATA_DIR: dataDir,
};

// --skip-update + non-TTY stdin makes the CLI run headless (tray mode);
// without it, it waits forever on an interactive interface menu.
const child = spawn(process.execPath, [path.join(__dirname, "node_modules", "9router", "cli.js"),
  "--skip-update", "--no-browser", "--port", String(env.PORT), "--host", "0.0.0.0"], {
  env,
  stdio: ["ignore", "inherit", "inherit"],
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
